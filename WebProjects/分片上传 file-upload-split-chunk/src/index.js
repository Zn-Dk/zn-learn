const handlerUpload = () => {
  class FileUploader {
    constructor(
      options = {
        fileInput: 'input',
        previewContainer: '.preview-container',
        uploadBtn: '.btn-upload',
        chunkSize: 102400,
        serverBaseUrl: 'https://file.io/',
      }
    ) {
      this.fileInput = document.querySelector(options.fileInput);
      this.previewContainer = document.querySelector(options.previewContainer);
      this.uploadBtn = document.querySelector(options.uploadBtn);
      this.imgEle = null;
      this.currentFile = null;
      this.currentFileChunks = null;
      this.chunkSize = options.chunkSize;
      this.serverBaseUrl = options.serverBaseUrl;
      this.init();
      this.evtHandlers();
    }

    init() {
      this.imgEle = this.findOrCreateElement('img', 'img', this.previewContainer);
      this.infoWrap = this.findOrCreateElement('.info-wrap', 'div', document.body);
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
      this.uploadBtn.addEventListener('click', this.uploadHandler.bind(this));
    }

    fileChangeHandler() {
      console.log(this.fileInput.files);
      this.currentFile = this.fileInput.files[0];
      // size - 大小Bytes type - 类型  name - 文件名
      this.currentFileChunks = this.chunkSplitter(this.currentFile);
      console.log(this.currentFileChunks);

      const reader = new FileReader();
      reader.readAsDataURL(this.currentFile);

      // input 上传事件
      reader.onload = () => {
        console.log(reader);
        this.imgEle.src = '';
        if (/image/.test(this.currentFile.type)) {
          this.imgEle.src = reader.result;
        }
        this.infoWrap.innerHTML = `
        <p>文件大小: ${this.currentFile.size / 1024} KB</p>
        <p>文件名: ${this.currentFile.name}</p>
        <p>分块大小: ${this.chunkSize / 1024} KB</p>
        <p>分块数量: ${this.currentFileChunks.length}</p>
        `;
      };
    }

    uploadHandler() {
      this.currentFileChunks.forEach((chunk, index) => {
        const formData = new FormData();
        formData.append('filename', `${this.currentFile.name}-${index}`);
        formData.append('chunkSize', chunk.size);
        // 这里有一个坑 file 必须在最后, 否则会把前面的参数都清空
        formData.append('file', chunk);
        console.log(`正在上传 ${index + 1} 个分片, 大小 ${chunk.size}`);
        this.postData(formData);
      });
    }

    async postData(data) {
      try {
        const res = await fetch(this.serverBaseUrl, {
          method: 'POST',
          body: data,
        });
        const resData = await res.json();
        this.infoWrap.innerHTML += `
        <div class="upload-result-item">
          <p>文件 - 上传成功</p>
          <p>上传时间: ${new Date(resData.created).toLocaleString()}</p>
          <p>过期时间: ${new Date(resData.expires).toLocaleString()}</p>
          <p>id: ${resData.id}</p>
          <p>url: ${resData.link}</p>
        </div>
        `;
      } catch (error) {
        console.log(error);
      }
    }

    /**
     * 文件分割上传
     * @param {File} file
     */
    chunkSplitter(file) {
      const chunks = [];
      const chunksNum = Math.ceil(file.size / this.chunkSize);

      for (let i = 0; i < chunksNum; i++) {
        const start = i * this.chunkSize;
        // 比较 (当前起始字节+分块大小) 是否大于文件大小 否则取文件大小
        const end = Math.min(start + this.chunkSize, file.size);
        // File 对象继承 Blob 对象, 因此使用 slice 切割
        const chunk = file.slice(start, end);
        console.log(start, end, chunk);
        chunks.push(chunk);
      }

      return chunks;
    }
  }

  window.FileUploader = FileUploader;
};

window.onload = () => {
  handlerUpload();
  new FileUploader({
    fileInput: '#file-input',
    previewContainer: '.preview-container',
    uploadBtn: '.btn-upload',
    chunkSize: 1024 * 1000, // 1MB chunk
    serverBaseUrl: 'https://file.io/',
  });
};
