import React from 'react'
import { StoryType } from '../../lib/types'
import { useStoryPreview } from '../hooks/useStoryPreview'
import Box from '@mui/material/Box'
import Card from '../Card'
import { useHistory } from 'react-router-dom'

const StoryCard: React.FC<{ story: StoryType }> = ({ story }) => {
  const { preview } = useStoryPreview({ video: story?.video })
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
        preview={preview || ''}
        loading={false}
        type={story.type}
        title={story.title}
        subTitle={story.collections[0]?.title}
        owner={story.owner}
        thumbnail={story.thumbnail}
      />
    </Box>
  )
}

export default StoryCard
