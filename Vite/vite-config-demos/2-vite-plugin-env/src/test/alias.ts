import image from '@assets/image.png?url' // 测试自动生成的alias
import useTest from '@hooks/useTest'

console.log('========= alias =========');
const imgEl = document.createElement('img')
imgEl.src = image
document.body.appendChild(imgEl)

useTest()

console.log('========= alias =========');
