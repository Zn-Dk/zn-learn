import React, { useCallback, useState, useTransition, type FC } from "react";
import { updateLikeApi } from "./action";


// 未使用乐观更新(需要等待服务器响应)
const useSlowLike = () => {
  const [loading, setLoading] = useState(false)
  const [isError, setIsError] = useState(false)

  const handleLike = async (currentLike: number) => {
    setLoading(true)
    setIsError(false)

    try {
      const { like: newLike } = await updateLikeApi({ currentLike })
      return newLike
    } catch (error) {
      console.log("🚀 ~ handleLike ~ error:", error);
      setIsError(true)
      return currentLike
    } finally {
      setLoading(false)
    }
  }

  return {
    loading,
    isError,
    handleLike,
  }
}

const PostView: FC<{
  post: Post
  onUpdateLike: (postId: string, like: number) => void
}> = React.memo(({ post, onUpdateLike }) => {
  // const { loading, isError, handleLike } = useSlowLike()
  
  // 用 useTransition 优化点赞操作
  const [isError, setIsError] = useState(false)
  const [isPending, startTransition] = useTransition()
  const handleUpdate = () => {
    setIsError(false)
    startTransition(async () => { // React19 新特性: 允许异步startTransiton cb
      try {
        const {like: newLike} = await updateLikeApi({ currentLike: post.like })
        onUpdateLike(post.postId, newLike)
      } catch (error) {
        setIsError(true)
      }
    })
  }

  return (
    <div className="border p-4 rounded-md text-start">
      <h3>Post: {post.data.title}</h3>
      <p>{post.data.content}</p>
      <div className="flex items-center gap-2">
        <div>like: {post.like}</div>
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
const NotUseOptimistic = () => {
  const [posts, setPosts] = useState(INIT_POSTS)
  const onUpdateLike = useCallback((postId: string, like: number) => {
    setPosts(prev => prev.map((post) => post.postId === postId ? { ...post, like } : post))
  }, [])

  return (
    <div>
      No useOptimistic Demo
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

export default NotUseOptimistic