import { useState, useEffect, useContext } from 'react'
import { ApiContext } from '../../lib/api'
import { CommentFormType, CommentType, CommentTypes } from '../../lib/types'

export const useCommentApi = (
  commentId: string,
  type: CommentTypes
): {
  comments: CommentType[]
  isLoading: boolean
  createComment: (comment: CommentFormType) => Promise<void>
  deleteComment: (id: string) => Promise<void>
  editComment: (id: string, data: CommentFormType) => Promise<void>
} => {
  const { api } = useContext(ApiContext)
  const [localComments, setLocalComments] = useState<CommentType[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(true)

  useEffect(() => {
    setIsLoading(true)
    const fetch = async () => {
      const comments = await api().getComments(commentId, type)
      setLocalComments(comments.content)
      setIsLoading(false)
    }
    fetch()
  }, [])

  const createComment = async (comment: CommentFormType) => {
    const newComment = await api().createComment(comment)
    setLocalComments([newComment, ...localComments])
  }

  const deleteComment = async (id: string): Promise<void> => {
    await api().deleteComment(id)
    setLocalComments(localComments.filter(comment => comment.id !== id))
  }

  const editComment = async (id: string, data: CommentFormType): Promise<void> => {
    const newComment = await api().editComment(id, data)
    setLocalComments(
      localComments.map(comment => {
        if (comment.id === newComment.id) {
          return newComment
        }
        return comment
      })
    )
  }

  return { comments: localComments, isLoading, createComment, deleteComment, editComment }
}
