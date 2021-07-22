import CustomMentionEditor from '@root/components/suport/CustomMentionEditor'
import React from 'react'
import { StoryType } from '@root/types'

interface iInfo {
  story: Partial<StoryType>
}

const Info: React.FC<iInfo> = ({ story }) => {
  const mentions = story.watchers
    ?.filter(w => w.user)
    .map(w => {
      return {
        name: w.user.firstName + ' ' + w.user.lastName,
        avatar: w.user.picture?.thumbnail
      }
    })
  return (
    <div>
      <CustomMentionEditor mentions={mentions} />
    </div>
  )
}

export default Info
