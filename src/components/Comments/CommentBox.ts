import { styled } from '@mui/material/styles'

const CommentBox = styled('div')(({ theme }) => ({
  backgroundColor: theme.palette.background.default,
  boxSizing: 'border-box',
  border: '1px solid',
  borderColor: theme.palette.grey[900],
  cursor: 'text',
  padding: '16px',
  borderRadius: '4px',
  marginBottom: '1em',
  boxShadow: theme.shadows[3]
}))

export default CommentBox
