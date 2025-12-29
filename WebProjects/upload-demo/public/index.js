const initUploader = () => {
  const DEFAULT_CHUNK_SIZE = 1024 * 1000;
  const DEFAULT_OPTIONS = {
    fileInput: 'input',
    previewContainer: '.preview-container',
    uploadBtn: '.btn-upload',
    chunkSize: DEFAULT_CHUNK_SIZE,
    serverBaseUrl: 'http://localhost:3000',
  };

  class FileUploader {
    constructor(
      options = { ...DEFAULT_OPTIONS }
    ) {
      this.options = { ...DEFAULT_OPTIONS, ...options };

      this.preViewImgEle = null;
      this.currentFile = null;
      this.currentFileChunks = null;
      this.initDom();
      this.evtHandlers();
      // TODO 多文件同时控制进度
      this.uploadProgress = 0;
    }

    get chunkSize() {
      return this.options.chunkSize;
    }

    get serverBaseUrl() {
      return this.options.serverBaseUrl;
    }

    initDom() {

      /** @type {HTMLInputElement} */
      this.fileInput = document.querySelector(this.options.fileInput);
      this.previewContainer = document.querySelector(this.options.previewContainer);
      this.preViewImgEle = this.findOrCreateElement('img', 'img', this.previewContainer);
      this.uploadBtn = document.querySelector(this.options.uploadBtn);

      this.infoWrap = this.findOrCreateElement('.info-wrap', 'div', document.body);

      this.uploadToolbar = this.findOrCreateElement('.upload-toolbar', 'div', document.body);
      this.uploadFileInfo = this.findOrCreateElement('.file-info', 'div', this.uploadToolbar);
      this.uploadProgressbar = this.findOrCreateElement('.progress-bar', 'div', this.uploadToolbar);
    }

    findOrCreateElement(selector, type, attach) {
      let ele = document.querySelector(selector);
      if (attach) {
        ele = attach.querySelector(selector);
      }
      if (!ele) {
        ele = document.createElement(type);
        attach.appendChild(ele);
      }
      return ele;
    }

    evtHandlers() {
      this.fileInput.addEventListener('change', this.fileChangeHandler.bind(this));
      this.uploadBtn.addEventListener('click', this.uploadHandlers.bind(this));

      const mergeBtn = this.findOrCreateElement('.btn-merge', 'button', document.body);
      mergeBtn.addEventListener('click', this.mergeUploaded.bind(this));
    }

    fileChangeHandler() {
      this.currentFile = this.fileInput.files[0];
      console.log("🚀 ~ FileUploader ~ fileChangeHandler ~ currentFile:", this.currentFile);
      // size - 大小Bytes type - 类型  name - 文件名
      this.currentFileChunks = this.createFileChunks(this.currentFile);
      console.log("🚀 ~ FileUploader ~ fileChangeHandler ~ currentFileChunks:", this.currentFileChunks);

      const reader = new FileReader();
      reader.readAsDataURL(this.currentFile);

      // input 上传事件
      reader.onload = () => {
        this.previewContainer.classList.add('show');
        // 显示图片预览
        this.preViewImgEle.src = '';
        if (/image/.test(this.currentFile.type)) {
          this.preViewImgEle.src = reader.result;
        }
        this.infoWrap.innerHTML = `
        <p>文件大小: ${this.currentFile.size / 1024} KB</p>
        <p>文件名: ${this.currentFile.name}</p>
        <p>分块大小: ${this.chunkSize / 1024} KB</p>
        <p>分块数量: ${this.currentFileChunks.length}</p>
        `;

        const removeBtn = document.createElement('button');
        removeBtn.innerHTML = '删除';
        removeBtn.className = 'btn btn-remove';
        removeBtn.addEventListener('click', this.removeFile.bind(this));
        this.infoWrap.appendChild(removeBtn);
      };
    }

    removeFile() {
      this.currentFile = null;
      this.currentFileChunks = null;
      this.fileInput.value = '';
      this.previewContainer.classList.remove('show');
      this.infoWrap.innerHTML = '';
    }

    // 模拟文件hash值, 用于合并时的唯一标识
    // TODO -> 使用 md5
    mockHash() {
      return Math.random().toString(36).substring(2);
    }

    async uploadChunk(data, cb) {
      try {
        const res = await fetch(`${this.serverBaseUrl}/api/upload`, {
          method: 'POST',
          body: data,
        });
        const resData = await res.json();
        if (resData.code !== 0) {
          throw new Error(resData.msg);
        }

        cb && cb(resData);
        return resData.data;
      } catch (error) {
        console.log(error);
        throw error;
      }
    }

    getChunksUploadPromises(hash, progressCb) {
      return this.currentFileChunks.map((chunk, index) => {
        const formData = new FormData();

        formData.append('chunkIndex', index);  // 分片索引
        formData.append('totalChunks', this.currentFileChunks.length); // 总分片数
        formData.append('filename', this.currentFile.name); // 文件名
        formData.append('hash', hash); // 文件唯一标识

        // 这里有一个坑, 文件二进制必须在最后, 否则会把前面的参数都清空
        formData.append('chunk', chunk);

        console.log(`正在上传 ${index + 1} 个分片, 大小 ${chunk.size}`);
        return this.uploadChunk(formData, progressCb);
      });
    }

    /**
     * 文件上传成功后, 通知后台合并
     * info. -> { filename hash }
     */
    mergeUploaded(info) {
      return fetch(`${this.serverBaseUrl}/api/merge`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          hash: info.hash,
          filename: info.filename || this.currentFile?.name,
        }),
      })
    }

    async uploadHandlers() {
      const hash = this.mockHash();

      // TODO1: 秒传功能: 生产环境hash 一般为 md5, 检查服务端是否存在同样的 md5, 如果有则直接返回
      // const checkRes = await fetch(`${this.serverBaseUrl}/api/check?hash=${hash}`);
      // const checkData = await checkRes.json();
      // if (checkData.exists) {
      //   console.log('秒传成功');
      //   return;
      // }

      const chunksLength = this.currentFileChunks.length;

      let finished = 0;
      const progressCb = (data) => {
        finished += 1;
        this.uploadProgress = finished / chunksLength;
        const progressPercent = `${(this.uploadProgress * 100).toFixed(2)}%`;
        this.uploadProgressbar.innerHTML = progressPercent;
        this.uploadProgressbar.style.width = progressPercent;
      }
      const chunksPromises = this.getChunksUploadPromises(hash, progressCb);

      try {
        // 显示上传进度
        this.uploadFileInfo.innerHTML = this.currentFile.name;
        this.uploadToolbar.classList.add('show');

        // TODO: 加入重试机制, 如果失败则重试
        const res = await Promise.all(chunksPromises)

        const firstChunkRsp = res[0];
        const fileHash = firstChunkRsp.hash;
        console.log('全部上传成功');
        console.log('文件hash值', fileHash);
        await this.mergeUploaded({
          hash: fileHash,
          filename: firstChunkRsp.filename,
        })
        console.log('全部合并成功');

        // 收起上传进度
        setTimeout(() => {
          this.uploadToolbar.classList.remove('show');
          this.removeFile();
        }, 3000);
      } catch (error) {
        console.error('上传失败:', error);
      }
    }

    /**
     * 文件分割
     * @param {File} file
     */
    createFileChunks(file) {
      if (file.size < this.chunkSize) {
        return [file];
      }

      const chunks = [];
      let current = 0;

      while (current < file.size) {
        chunks.push(file.slice(current, current + this.chunkSize));
        current += this.chunkSize;
      }

      return chunks;
    }
  }



  window.FileUploader = FileUploader;
  new FileUploader({
    fileInput: '#file-input',
    previewContainer: '.preview-container',
    uploadBtn: '.btn-upload',
    chunkSize: 1024 * 1000 * 2, // chunk size
  });
};

window.onload = () => {
  initUploader();
};
