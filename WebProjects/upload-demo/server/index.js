import express from 'express';
import multer from 'multer';
import fs from 'fs';

const TEMP_DIR = './server/temp';
const UPLOAD_DIR = './server/uploads';
// cleanup
fs.rmSync(TEMP_DIR, { recursive: true, force: true });
fs.rmSync(UPLOAD_DIR, { recursive: true, force: true });
fs.mkdirSync(TEMP_DIR);
fs.mkdirSync(UPLOAD_DIR);

const app = express();

// multer 配置
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



// 1.分片上传接口 (upload.single 单个文件, single(fieldName <- formdata的文件key))
app.post('/api/upload', upload.single('chunk'), (req, res) => {
  // 上传的文件 会经过 multer 的自动处理, 故不需要再存
  // fs.writeFileSync(`./temp/${req.file.filename}-${req.file.chunkIndex}`, req.file.buffer);
  // multer 拿到的文件可以通过 req.file 获取
  res.status(200).json({
    code: 0,
    msg: 'success',
    data: {
      filename: req.body.filename,
      chunkIndex: req.body.chunkIndex,
      hash: req.body.hash,
    }
  });
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

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});

