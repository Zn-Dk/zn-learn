import React, { useCallback, useOptimistic, useState, useTransition, type FC } from "react";
import { updateLikeApi } from "./action";

// 使用乐观更新(无需等待服务器响应, 期望更新成功, 失败时还可以自动回滚)
const PostView: FC<{
  post: Post
  onUpdateLike: (postId: string, currentLike: number) => Promise<void>
}> = React.memo(({ post, onUpdateLike }) => {
  // useOptimistic 的正确模式是：
  // 真实状态用 useState(或者上级组件状态) 管理，乐观状态基于真实状态派生。整个异步操作应该包裹在 action/transition 中。
  
  const [isPending, startTransition] = useTransition();
  const [optimisticLike, addOptimisticLike] = useOptimistic(
    // 传入真实状态, transition 结束后乐观值会自动回退到此值
    post.like,
    // 更新函数
    (currentLike, increment: number) => currentLike + increment
  )
  const [isError, setIsError] = useState(false)

  const handleUpdate = () => {
    setIsError(false)
    // 乐观更新必须在 transition 或 action 中触发，否则乐观值会立即被真实状态覆盖，看不到乐观效果。
    startTransition(async () => {
      addOptimisticLike(1) // 乐观更新, 期望点赞数 + 1
      try {
        await onUpdateLike(post.postId, post.like)
      } catch (error) {
        console.log("点赞失败, 自动回滚", error);
        setIsError(true)
      }
    })
  }

  return (
    <div className="border p-4 rounded-md text-start">
      <h3>Post: {post.data.title}</h3>
      <p>{post.data.content}</p>
      <div className="flex items-center gap-2">
        <div>like: {optimisticLike}</div>
        <div>loading: {isPending.toString()}</div>
        <button onClick={handleUpdate} disabled={isPending}>👍</button>
        <div className="text-red-500">{ isError && '点赞失败'}</div>
      </div>
    </div>
  )
})

type Post = {
  postId: string;
  data: {
    id: string;
    title: string;
    content: string;
  };
  like: number;
}

const INIT_POSTS: Post[] = [
  {
    postId: '1',
    data: {
      id: '1',
      title: 'Post 1',
      content: 'Post 1 Content',
    },
    like: 0,
  },
  {
    postId: '2',
    data: {
      id: '2',
      title: 'Post 2',
      content: 'Post 2 Content',
    },
    like: 0,
  },
]

const UseOptimistic = () => {
  const [posts, setPosts] = useState(INIT_POSTS)
  const onUpdateLike = useCallback(async (postId: string, currentLike: number) => {
    const { like: newLike } = await updateLikeApi({ currentLike })
    setPosts(prev => prev.map((p) => p.postId === postId ? { ...p, like: newLike } : p))
  }, [])

  return (
    <div>
      UseOptimistic Demo
      <div className="grid grid-cols-3 gap-4">
        { posts.map((post) => (
          <PostView
            key={post.postId}
            post={post}
            onUpdateLike={onUpdateLike}
           ></PostView>
        ))}
      </div>
    </div>
  )
}

export default UseOptimistic