import React, { useEffect, useState } from 'react'
import { StoryType } from '../../lib/types'
import Box from '@mui/material/Box'
import Card from '../Card'
import { useHistory } from 'react-router-dom'
import api from '../../lib/api'

const StoryCard: React.FC<{ id: string }> = ({ id }) => {
  const history = useHistory()
  const [story, setStory] = useState(null as StoryType | null)
  useEffect(() => {
    api.getStory(id).then(setStory)
  }, [id])

  if (story === null) {
    return (
      <Box
        key={id}
        sx={{
          cursor: 'pointer',
          marginBottom: 2
        }}
      >
        <Card loading={true} title={''} subTitle={''} thumbnail={''} preview={''} />
      </Box>
    )
  }

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
        title={`${story.title}${story.submission ? ` by ${story.submission.name}` : ''}`}
        subTitle={story.collections[0]?.title}
        owner={story.owner}
        thumbnail={story.thumbnailUrl}
      />
    </Box>
  )
}

export default StoryCard
