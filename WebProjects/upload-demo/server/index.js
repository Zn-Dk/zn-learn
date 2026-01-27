import express from 'express';
import multer from 'multer';
import fs from 'fs';
import Redis from 'ioredis';

const TEMP_DIR = './server/temp';
const UPLOAD_DIR = './server/uploads';
// production 建议
// 文件本体	   OSS/S3/MinIO	  专业对象存储，支持分片、CDN、高可用
// 上传状态	   Redis	        高性能，支持过期，适合临时状态
// 文件元数据	 MySQL + Redis	 MySQL 持久化，Redis 加速查询
// 临时分片	   本地磁盘/Redis	  合并后立即删除，不需要持久化

// cleanup
fs.rmSync(TEMP_DIR, { recursive: true, force: true });
fs.rmSync(UPLOAD_DIR, { recursive: true, force: true });
fs.mkdirSync(TEMP_DIR);
fs.mkdirSync(UPLOAD_DIR);

// #region ---------------------------- redis 配置 ----------------------------
const app = express();

const redis = new Redis({
  host: process.env.REDIS_HOST || '127.0.0.1',
  port: process.env.REDIS_PORT || 6379,
  password: process.env.REDIS_PASSWORD || 'RedisPassword123!',
});
const REDIS_PREFIX = 'upload';
const REDIS_EXPIRE = 60 * 60 * 24; // expire: 24h

redis.on('connect', () => {
  console.log('Redis connected');
});

redis.on('error', (err) => {
  console.error('Redis error:', err);
});


const getRedisChunkKey = (hash) => `${REDIS_PREFIX}:chunk:${hash}`;

const getRedisMetaKey = (hash) => `${REDIS_PREFIX}:meta:${hash}`;

// 记录分片(redis) -- upload 接口完成上传后
const recordChunk = async ({ hash, chunkIndex, totalChunks, filename }) => {
  const chunkKey = getRedisChunkKey(hash);
  const metaKey = getRedisMetaKey(hash);
  console.log('------recordChunk', chunkKey, metaKey);
  // // 记录当前已上传的分片index(set) 并设置过期时间
  // const res = await redis.sadd(chunkKey, chunkIndex);
  // if (res === 0) throw new Error('chunk already exists');
  // await redis.expire(chunkKey, REDIS_EXPIRE);

  // // 首次上传时保存文件元数据 (hashmap)
  // const existMeta = await redis.exists(metaKey);
  // if (!existMeta) {
  //   await redis.hset(metaKey, {
  //     filename,
  //     totalChunks,
  //     createAt: Date.now(),
  //     updatedAt: Date.now(),
  //   });
  // }
  // // 每个分片上传后, 更新 updatedAt 和过期时间
  // await redis.hset(metaKey, 'updatedAt', Date.now());
  // await redis.expire(metaKey, REDIS_EXPIRE);


  // 生成环境效率优化--参考
  const pipeline = redis.pipeline();
  pipeline.sadd(chunkKey, chunkIndex);
  pipeline.expire(chunkKey, REDIS_EXPIRE);
  pipeline.hset(metaKey, {
    filename,
    totalChunks,
    createAt: Date.now(),
    updatedAt: Date.now(),
  });
  pipeline.expire(metaKey, REDIS_EXPIRE);
  const res = await pipeline.exec();
  const saddRes = res[0];
  // [err, res]
  if (saddRes[1]) throw new Error('chunk already exists');
}

// #endregion ---------------------------- redis 配置 ----------------------------
// #region ---------------------------- multer配置 ----------------------------
const storage = multer.diskStorage({
  // 上传文件的临时目录,
  // 生产环境中应该有过期时间统一清理临时文件的逻辑,
  // 合并成功后, 文件迁移到 ./uploads
  destination: TEMP_DIR,
  // 上传文件的名称(分片索引)
  filename: (req, file, cb) => {
    const index = req.body.chunkIndex || 0;
    const hash = req.body.hash || '';
    const filename = req.body.filename || file.originalname;
    console.log('upload--file-->', `${hash}-${filename}-${index}`);
    cb(null, `${hash}-${filename}-${index}`);
  },
});
const upload = multer({ storage });
// #endregion ---------------------------- multer配置 ----------------------------
// #region ---------------------------- express app ----------------------------
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  res.setHeader('Access-Control-Allow-Credentials', true);

  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  next();
});
app.use(express.json());
app.use(express.static('public'));

// 0.检查接口
app.post('/api/check', async (req, res) => {
  const { hash, totalChunks } = req.body;
  if (!hash) {
    res.status(400).send({ code: -1, msg: 'hash is required' });
    return;
  }

  try {
    // 秒传功能
    const existFile = await checkFileExists(hash);
    if (existFile) {
      return res.status(200).json({
        code: 0,
        msg: 'existing file, instant upload',
        data: {
          exists: true,
          file: existFile,
        },
      });
    }

    // 获取已上传的分片
    const uploadedChunks = await getUploadedChunks(hash);
    console.log(uploadedChunks, 'check result -- uploadedChunks');
    res.status(200).json({
      code: 0,
      msg: 'success',
      data: {
        exists: false,
        uploadedChunks,
        totalChunks: Number(totalChunks) || 0,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ code: -1, msg: 'check failed' });
  }
});

// 1.分片上传接口 (upload.single 单个文件, single(fieldName <- formdata的文件key))
app.post('/api/upload', (req, res, next) => {
  console.log('before multer'); // 看这个是否打印
  upload.single('chunk')(req, res, (err) => {
    if (err) {
      console.error('Multer error:', err);
      return res.status(400).json({ code: -1, msg: err.message });
    }
    console.log('after multer, req.file:', req.file); // 看文件是否解析成功
    next();
  });
}, async (req, res) => {
  console.log('upload------------->');
  // 上传的文件 会经过 multer 的自动处理, 故不需要再存
  // fs.writeFileSync(`./temp/${req.file.filename}-${req.file.chunkIndex}`, req.file.buffer);
  // multer 拿到的文件可以通过 req.file 获取
  const { filename, chunkIndex, totalChunks, hash } = req.body;
  const uploadMeta = {
    hash,
    chunkIndex: Number(chunkIndex) || 0,
    totalChunks: Number(totalChunks) || 0,
    filename,
  }

  try {
    // redis 记录分片
    await recordChunk(uploadMeta);

    res.status(200).json({
      code: 0,
      msg: 'success',
      data: uploadMeta,
    });
  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({ code: -1, msg: 'Upload failed' });
  }
});

// 2.合并接口 (前端上传分片后, 用 Promise.all 等所有分片上传完成后再调用合并接口)
app.post('/api/merge', async (req, res) => {
  const { filename, hash } = req.body;
  if (!filename) {
    res.status(400).send({ code: -1, msg: 'filename is required' });
    return;
  }
  if (!hash) {
    res.status(400).send({ code: -1, msg: 'hash is required' });
    return;
  }

  try {
    // 读取temp目录下的所有文件获取分片 (用hash匹配)
    const matchFiles = fs.readdirSync(TEMP_DIR).filter(file => file.startsWith(hash));
    console.log(matchFiles, 'matchFiles');

    if (!matchFiles.length) {
      res.status(404).send({ code: -1, msg: 'no files' });
      return;
    }

    const files = matchFiles
      // 根据分片索引排序
      .toSorted((a, b) => {
        const aIndex = a.split('-')[2];
        const bIndex = b.split('-')[2];
        return aIndex - bIndex;
      })
      .map(file => fs.readFileSync(`${TEMP_DIR}/${file}`))
    // console.log(files, 'files');

    // --------- 基础合并代码 ---------
    // 性能问题
    // ⚠️ 如果上传一个 1GB 的文件，会一次性加载 1GB 到内存
    // ⚠️ Buffer.concat 和 writeFileSync 都是同步操作，会阻塞整个 Node.js 事件循环
    // ⚠️ 其他用户的请求会被卡住，直到合并完成

    // const mergedFile = Buffer.concat(files);
    // fs.writeFileSync(`${UPLOAD_DIR}/${filename}`, mergedFile);
    // // 视觉效果模拟延迟删除临时文件(生产应移除)
    // setTimeout(() => {
    //   matchFiles.forEach(file => {
    //     fs.unlinkSync(`${TEMP_DIR}/${file}`);
    //   });
    // }, 2000);
    // res.status(200).json({ code: 0, msg: '合并成功' });

    // 使用流式合并(推荐)
    const target = `${UPLOAD_DIR}/${filename}`;
    const wStream = fs.createWriteStream(target);

    // 逐个读取到 blob
    for (const filename of matchFiles) {
      const chunkTmpPath = `${TEMP_DIR}/${filename}`
      await new Promise((resolve, reject) => {
        // 创建读取流
        const readStream = fs.createReadStream(chunkTmpPath);
        // 读取文件二进制 -> 经过管道, (end false 不关闭写入流, 以便读取)
        readStream.pipe(wStream, { end: false })
        readStream.on('end', resolve)
        readStream.on('error', reject)
      })

      // 视觉效果模拟延迟删除临时文件(生产应移除)
      setTimeout(() => {
        fs.unlinkSync(chunkTmpPath);
      }, 2000);
    }

    wStream.end()
    wStream.on('finish', () => {
      res.status(200).json({ code: 0, msg: '合并成功' });
    })
    wStream.on('error', (err) => {
      throw new Error(err);
    })

  } catch (error) {
    console.error(error);
    res.status(500).json({ code: -1, msg: '合并失败' });
  }
});

app.listen(3001, () => {
  console.log('Server is running on port 3001');
});

// #endregion ---------------------------- express app ----------------------------
