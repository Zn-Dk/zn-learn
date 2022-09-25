type base = {
  base64: string
  blobURL: string
}
export default function (el: string): Promise<base> | false {
  let img: HTMLImageElement | null = document.querySelector(el)
  if (!img) return false

  return new Promise(resolve => {
    img.onload = () => {
      let blobURL
      const cvs = document.createElement('canvas')
      const iW = img.width
      const iH = img.height
      cvs.width = iW
      cvs.height = iH
      cvs.getContext('2d').drawImage(img, 0, 0, iW, iH)

      const base64 = cvs.toDataURL('image/png')

      cvs.toBlob(blob => {
        blobURL = URL.createObjectURL(blob)
        resolve({
          base64,
          blobURL,
        })
      })
    }
  })
}
