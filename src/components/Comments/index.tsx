import React from 'react'
import { AssetTypes, Watcher } from '../../lib/types'
import Box from '@mui/material/Box'
import List from '@mui/material/List'
import Typography from '@mui/material/Typography'
import Comment from './Comment'
import { useCommentApi } from './useCommentApi'
import CommentEditor from './CommentEditor'
import Divider from '@mui/material/Divider'
import { LinearProgress } from '@mui/material'

interface iComments {
  id: string
  type: AssetTypes
  watchers: Watcher[]
}

const Comments: React.FC<iComments> = ({ id, watchers, type }) => {
  const { createComment, deleteComment, editComment, comments, isLoading } = useCommentApi(id, type)

  const mentions = watchers
    ?.filter(w => w.user != null)
    .map(w => {
      return {
        id: w.user.id,
        name: `${w.user.firstName} ${w.user.lastName}`,
        avatar: w.user.picture?.url
      }
    })

  return (
    <Box
      sx={{
        width: '100%',
        padding: 3,
        height: '100%'
      }}
    >
      <Box component={Typography} sx={{ paddingBottom: 1 }}>
        Join the conversation
      </Box>
      <CommentEditor mentions={mentions} createAction={createComment} type={type} id={id} />
      <Divider sx={{ margin: '16px 0px' }} />
      <Typography>Comments</Typography>
      {isLoading && <LinearProgress />}
      <List>
        {comments.map(comment => (
          <Comment
            type={type}
            deleteComment={deleteComment}
            editComment={editComment}
            id={comment.id}
            mentions={mentions}
            key={comment.id}
            comment={comment}
          />
        ))}
      </List>
    </Box>
  )
}

export default Comments
