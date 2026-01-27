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

// Redis client (default: localhost:6379)
const redis = new Redis({
  host: process.env.REDIS_HOST || 'localhost',
  port: process.env.REDIS_PORT || 6379,
  // password: process.env.REDIS_PASSWORD,
});

redis.on('connect', () => {
  console.log('Redis connected');
});

redis.on('error', (err) => {
  console.error('Redis error:', err);
});

// Redis key prefix
const REDIS_PREFIX = 'upload';
const REDIS_EXPIRE = 60 * 60 * 24; // 24 hours

/**
 * Get Redis key for upload chunks
 * @param {string} hash - File hash
 * @returns {string} Redis key
 */
const getChunkKey = (hash) => `${REDIS_PREFIX}:chunks:${hash}`;

/**
 * Get Redis key for file metadata
 * @param {string} hash - File hash
 * @returns {string} Redis key
 */
const getMetaKey = (hash) => `${REDIS_PREFIX}:meta:${hash}`;

/**
 * Record uploaded chunk to Redis
 * @param {string} hash - File hash
 * @param {number} chunkIndex - Chunk index
 * @param {number} totalChunks - Total chunks count
 * @param {string} filename - Original filename
 */
const recordChunk = async (hash, chunkIndex, totalChunks, filename) => {
  const chunkKey = getChunkKey(hash);
  const metaKey = getMetaKey(hash);

  // Add chunk index to set
  await redis.sadd(chunkKey, chunkIndex);
  await redis.expire(chunkKey, REDIS_EXPIRE);

  // Store file metadata
  await redis.hset(metaKey, {
    filename,
    totalChunks,
    updatedAt: Date.now(),
  });
  await redis.expire(metaKey, REDIS_EXPIRE);
};

/**
 * Get uploaded chunks from Redis
 * @param {string} hash - File hash
 * @returns {Promise<number[]>} Uploaded chunk indices
 */
const getUploadedChunks = async (hash) => {
  const chunkKey = getChunkKey(hash);
  const chunks = await redis.smembers(chunkKey);
  return chunks.map(Number).sort((a, b) => a - b);
};

/**
 * Check if all chunks are uploaded
 * @param {string} hash - File hash
 * @param {number} totalChunks - Total chunks count
 * @returns {Promise<boolean>}
 */
const isUploadComplete = async (hash, totalChunks) => {
  const chunkKey = getChunkKey(hash);
  const uploadedCount = await redis.scard(chunkKey);
  return uploadedCount === totalChunks;
};

/**
 * Clean up Redis keys for a completed upload
 * @param {string} hash - File hash
 */
const cleanupRedisKeys = async (hash) => {
  const chunkKey = getChunkKey(hash);
  const metaKey = getMetaKey(hash);
  await redis.del(chunkKey, metaKey);
};

/**
 * Check if file already exists (for instant upload)
 * @param {string} hash - File hash
 * @returns {Promise<string|null>} File path if exists
 */
const checkFileExists = async (hash) => {
  // Check in upload directory for files with this hash
  const files = fs.readdirSync(UPLOAD_DIR);
  for (const file of files) {
    // In production, you should store hash -> filepath mapping in Redis/DB
    // Here we just do a simple check
    const hashKey = `${REDIS_PREFIX}:file:${hash}`;
    const filePath = await redis.get(hashKey);
    if (filePath && fs.existsSync(filePath)) {
      return filePath;
    }
  }
  return null;
};

/**
 * Record completed file to Redis
 * @param {string} hash - File hash
 * @param {string} filePath - File storage path
 */
const recordCompletedFile = async (hash, filePath) => {
  const hashKey = `${REDIS_PREFIX}:file:${hash}`;
  // Store for 7 days for instant upload feature
  await redis.set(hashKey, filePath, 'EX', 60 * 60 * 24 * 7);
};

// ... existing code ...

// multer 配置
const storage = multer.diskStorage({
  // ... existing code ...
});
const upload = multer({ storage });

// ... existing code ...

app.use((req, res, next) => {
  // ... existing code ...
});
app.use(express.json());
app.use(express.static('public'));


// 0. Check upload status (for resumable upload & instant upload)
app.get('/api/check', async (req, res) => {
  const { hash, totalChunks } = req.query;

  if (!hash) {
    return res.status(400).json({ code: -1, msg: 'hash is required' });
  }

  try {
    // Check if file already exists (instant upload)
    const existingFile = await checkFileExists(hash);
    if (existingFile) {
      return res.status(200).json({
        code: 0,
        msg: 'File already exists',
        data: {
          exists: true,
          filePath: existingFile,
        },
      });
    }

    // Get uploaded chunks for resumable upload
    const uploadedChunks = await getUploadedChunks(hash);

    res.status(200).json({
      code: 0,
      msg: 'success',
      data: {
        exists: false,
        uploadedChunks,
        uploadedCount: uploadedChunks.length,
        totalChunks: Number(totalChunks) || 0,
      },
    });
  } catch (error) {
    console.error('Check error:', error);
    res.status(500).json({ code: -1, msg: 'Check failed' });
  }
});


// 1.分片上传接口 (upload.single 单个文件, single(fieldName <- formdata的文件key))
app.post('/api/upload', upload.single('chunk'), async (req, res) => {
  const { filename, chunkIndex, totalChunks, hash } = req.body;

  try {
    // Record chunk to Redis
    await recordChunk(hash, Number(chunkIndex), Number(totalChunks), filename);

    res.status(200).json({
      code: 0,
      msg: 'success',
      data: {
        filename,
        chunkIndex,
        hash,
      },
    });
  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({ code: -1, msg: 'Upload failed' });
  }
});


// 2.合并接口 (前端上传分片后, 用 Promise.all 等所有分片上传完成后再调用合并接口)
app.post('/api/merge', async (req, res) => {
  const { filename, hash } = req.body;
  // ... existing code ...

  try {
    // 读取temp目录下的所有文件获取分片 (用hash匹配)
    const matchFiles = fs.readdirSync(TEMP_DIR).filter(file => file.startsWith(hash));
    // ... existing code ...

    // 使用流式合并(推荐)
    const target = `${UPLOAD_DIR}/${filename}`;
    const wStream = fs.createWriteStream(target);

    // 逐个读取到 blob
    for (const filename of matchFiles) {
      // ... existing code ...
    }

    wStream.end();
    wStream.on('finish', async () => {
      // Record completed file for instant upload
      await recordCompletedFile(hash, target);
      // Clean up Redis keys
      await cleanupRedisKeys(hash);

      res.status(200).json({ code: 0, msg: '合并成功' });
    });
    wStream.on('error', (err) => {
      throw new Error(err);
    });

  } catch (error) {
    // ... existing code ...
  }
});

// ... existing code ...
