import React, { MouseEvent } from 'react'
import { MentionData, MentionPluginTheme } from '@draft-js-plugins/mention'
import Avatar from '@mui/material/Avatar'
import initials from 'initials'

export interface EntryComponentProps {
  className?: string
  onMouseDown(event: MouseEvent): void
  onMouseUp(event: MouseEvent): void
  onMouseEnter(event: MouseEvent): void
  role: string
  id: string
  mention: MentionData
  theme?: MentionPluginTheme
  isFocused: boolean
  searchValue?: string
}

const Entry: React.FC<EntryComponentProps> = ({ mention, theme, ...parentProps }) => {
  return (
    <div {...parentProps}>
      <div className={theme?.mentionSuggestionsEntryContainer}>
        <div className={theme?.mentionSuggestionsEntryContainerLeft}>
          <Avatar
            sx={{
              width: 24,
              height: 24,
              fontSize: '0.7em'
            }}
            src={mention.avatar}
          >
            {initials(mention.name)}
          </Avatar>
        </div>
        <div className={theme?.mentionSuggestionsEntryContainerRight}>
          <div className={theme?.mentionSuggestionsEntryText}>{mention.name}</div>
        </div>
      </div>
    </div>
  )
}

export default Entry
