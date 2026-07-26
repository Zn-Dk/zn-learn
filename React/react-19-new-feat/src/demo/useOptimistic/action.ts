export const updateLikeApi = (
  { currentLike }: { currentLike: number }
) => new Promise<{ like: number }>((resolve, reject) => {
  setTimeout(() => {
    if (Math.random() > 0.7) {
      reject('点赞失败')
      return
    }
    resolve({ like: currentLike + 1 })
  }, 1000)
})