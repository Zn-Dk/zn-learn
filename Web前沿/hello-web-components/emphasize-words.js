(function () {
  // const target_template = document.createElement('template');
  // target_template.setAttribute('id', 'emphasizeWordsTemplate');

  // //引号内填写的 HTML 代码
  // target_template.innerHTML = `
  //     <style>

  //     </style>

  //     <span id="words"></span>
  // `;
  // document.body.append(target_template);

  // 将父组件传来的纯文本变成带样式（将关键词标红）的 html
  class EmphasizeWords extends HTMLElement {
    constructor() {
      super();
      var shadow = this.attachShadow({ mode: 'closed' });
      var templateElem = document.getElementById('emphasizeWordsTemplate');
      var content = templateElem.content.cloneNode(true);
      // 文本
      let text = this.getAttribute('text');
      // 关键词
      let keyWords = String(this.getAttribute('key-words')).split(',');
      // 标记颜色
      let color = this.getAttribute('mark-color');
      // 将文本中关键词替换
      for (let i = 0; i < keyWords.length; i++) {
        let r = new RegExp(keyWords[i], 'ig');
        if (r.test(text)) {
          text = text.replace(r, `<font color="${color}">${keyWords[i]}</font>`);
        }
      }
      content.getElementById('words').innerHTML = text;
      shadow.appendChild(content);
    }
  }
  window.customElements.define('emphasize-words', EmphasizeWords);
})();
