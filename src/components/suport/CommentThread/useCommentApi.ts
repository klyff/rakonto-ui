import { useState } from 'react'
import { api } from '@root/api'
import { CommentFormType, CommentType } from '@root/types'

export const useCommentApi = (
  storyId: string,
  comments: CommentType[]
): {
  comments: CommentType[]
  isLoading: boolean
  createComment: (comment: CommentFormType) => Promise<void>
  deleteComment: (id: string) => Promise<void>
  editComment: (commentId: string, data: CommentFormType) => Promise<void>
} => {
  const [localComments, setLocalComments] = useState<CommentType[]>(comments)
  const [isLoading, setIsLoading] = useState<boolean>(true)

  const createComment = async (comment: CommentFormType) => {
    const newComment = await api.createComment(comment)
    setLocalComments([newComment, ...localComments])
  }

  const deleteComment = async (id: string): Promise<void> => {
    await api.deleteComment(id)
    setLocalComments(localComments.filter(comment => comment.id !== id))
  }

  const editComment = async (id: string, data: CommentFormType): Promise<void> => {
    const newComment = await api.editComment(id, data)
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
