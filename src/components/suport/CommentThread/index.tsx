import React from 'react'
import { Comment as SComment, Form } from 'semantic-ui-react'
import { CommentType, WatcherType } from '@root/types'
import CommentEditor from './CommentEditor'
import Comment from './Comment'
import { useCommentApi } from './useCommentApi'

interface iCommentThread {
  comments: CommentType[]
  watchers: WatcherType[]
  id: string
}

const CommentThread: React.FC<iCommentThread> = ({ id, comments: initialComments, watchers }) => {
  const { createComment, deleteComment, editComment, comments } = useCommentApi(id, initialComments)

  const mentions = watchers
    ?.filter(w => w.user != null)
    .map(w => {
      return {
        id: w.user.id,
        name: `${w.user.firstName} ${w.user.lastName}`,
        avatar: w.user.picture?.thumbnail
      }
    })

  return (
    <SComment.Group threaded>
      {comments.map(comment => (
        <Comment
          key={comment.id}
          comment={comment}
          mentions={mentions}
          id={id}
          deleteComment={deleteComment}
          editComment={editComment}
        />
      ))}

      <Form reply>
        <CommentEditor mentions={mentions} createAction={createComment} id={id} />
      </Form>
    </SComment.Group>
  )
}

export default CommentThread
