import React from 'react'
import { StoryType } from '../../lib/types'
import Box from '@mui/material/Box'
import Card from '../Card'
import { useHistory } from 'react-router-dom'

const StoryCard: React.FC<{ story: StoryType }> = ({ story }) => {
  const history = useHistory()
  return (
    <Box
      key={story.id}
      onClick={() => history.push(`/a/stories/${story.id}`)}
      sx={{
        cursor: 'pointer',
        marginBottom: 2
      }}
    >
      <Card
        preview={story.type === 'VIDEO' ? story.video.gifUrl : ''}
        loading={false}
        type={story.type}
        title={story.title}
        subTitle={story.collections[0]?.title}
        owner={story.owner}
        thumbnail={story.thumbnailUrl}
      />
    </Box>
  )
}

export default StoryCard
