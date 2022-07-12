import React, { useEffect, useState } from 'react'
import { CollectionType } from '../../lib/types'
import Box from '@mui/material/Box'
import Card from '../Card'
import { useHistory } from 'react-router-dom'
import api from '../../lib/api'

const CollectionCard: React.FC<{ id: string }> = ({ id }) => {
  const history = useHistory()
  const [collection, setCollection] = useState(null as CollectionType | null)
  useEffect(() => {
    api.getCollection(id).then(setCollection)
  }, [id])

  if (collection === null) {
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
      key={id}
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
