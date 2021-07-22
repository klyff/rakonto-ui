import React from 'react'
import { StoryType } from '@root/types'
import CommentThread from '@root/components/suport/CommentThread'

interface iInfo {
  story: Partial<StoryType>
}

const Info: React.FC<iInfo> = ({ story }) => {
  return <CommentThread story={story} />
}

export default Info
