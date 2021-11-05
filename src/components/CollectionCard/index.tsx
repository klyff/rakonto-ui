import React from 'react'
import { CollectionType } from '../../lib/types'
import Box from '@mui/material/Box'
import Card from '../Card'
import { useHistory } from 'react-router-dom'

const CollectionCard: React.FC<{ collection: CollectionType }> = ({ collection }) => {
  const history = useHistory()
  return (
    <Box
      key={collection.id}
      onClick={() => history.push(`/a/collections/${collection.id}?storyId=${collection.stories[0]?.id || ''}`)}
      sx={{
        cursor: 'pointer',
        marginBottom: 2
      }}
    >
      <Card
        loading={false}
        type={'COLLECTION'}
        title={collection.title}
        subTitle={`${collection.stories.length} stories`}
        owner={collection.owner}
        thumbnail={collection.thumbnailUrl}
      />
    </Box>
  )
}

export default CollectionCard
