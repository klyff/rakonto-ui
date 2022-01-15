import { styled } from '@mui/material/styles'

const CommentBox = styled('div')(({ theme }) => ({
  backgroundColor: theme.palette.grey[800],
  boxSizing: 'border-box',
  border: '1px solid',
  borderColor: 'rgba(255, 255, 255, 0.23)',
  '&:hover': {
    borderColor: 'rgba(255, 255, 255)'
  },
  '&:focused': {
    border: '2px',
    borderColor: theme.palette.primary.main
  },
  cursor: 'text',
  padding: '16px',
  borderRadius: '40px',
  marginBottom: '1em',
  boxShadow: theme.shadows[3]
}))

export default CommentBox
