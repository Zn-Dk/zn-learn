export type ListItem = {
  id: number
  text: string
  hasImage: boolean
  imageHeight: number
}

const LOREM =
  'Lorem ipsum dolor sit amet consectetur adipisicing elit. Est incidunt optio laborum minima blanditiis sunt deleniti ex laudantium recusandae ipsam officiis aperiam mollitia, eos asperiores. Veritatis suscipit aperiam voluptatem dolorum.'
const getRandomText = () => {
  // 随机取80-200个字符
  const randomLen = Math.floor(Math.random() * 120 + 80)
  return LOREM.slice(0, randomLen)
}

export const getRandomList = (len: number) => {
  return Array.from({ length: len }, (_, i) => ({
    id: i,
    text: getRandomText(),
    // 预留不定高demo (随机有无图片, 图片高度随机)
    hasImage: Math.random() > 0.5,
    imageHeight: Math.floor(Math.random() * 100 + 100),
  }))
}
