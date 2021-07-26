import React, { MouseEvent, ReactElement } from 'react'
import { MentionData, MentionPluginTheme } from '@draft-js-plugins/mention'
import Avatar from '@root/components/suport/Avatar'

export interface EntryComponentProps {
  className?: string
  onMouseDown(event: MouseEvent): void
  onMouseUp(event: MouseEvent): void
  onMouseEnter(event: MouseEvent): void
  role: string
  id: string
  theme?: MentionPluginTheme
  mention: MentionData
  isFocused: boolean
  searchValue?: string
}

const Entry: React.FC<EntryComponentProps> = ({ mention, theme, ...parentProps }) => {
  return (
    <div {...parentProps}>
      <div className={theme?.mentionSuggestionsEntryContainer}>
        <div className={theme?.mentionSuggestionsEntryContainerLeft}>
          <Avatar picture={mention.avatar} name={mention.name} />
        </div>
        <div className={theme?.mentionSuggestionsEntryContainerRight}>
          <div className={theme?.mentionSuggestionsEntryText}>{mention.name}</div>
        </div>
      </div>
    </div>
  )
}

export default Entry
