import React, { useCallback, useMemo, useState } from 'react'
import createMentionPlugin, { defaultSuggestionsFilter, MentionData } from '@draft-js-plugins/mention'
import mentionsStyles from './MentionsStyles.module.css'
import Entry from './Entry'
import Editor from '@draft-js-plugins/editor'
import { EditorState } from 'draft-js'

interface iMention {
  mentions?: MentionData[]
  state: EditorState
  onChange: (state: EditorState) => void
  readOnly?: boolean
  ref?: React.ForwardedRef<Editor>
}

const EditorWithMentions: React.FC<iMention> = React.forwardRef<Editor, iMention>(
  ({ mentions, state, onChange, readOnly }, ref) => {
    const [open, setOpen] = useState(false)
    const [suggestions, setSuggestions] = useState(mentions || [])
    const { MentionSuggestions, plugins } = useMemo(() => {
      const mentionPlugin = createMentionPlugin({
        entityMutability: 'IMMUTABLE',
        theme: mentionsStyles,
        mentionPrefix: '@',
        supportWhitespace: true
      })

      const { MentionSuggestions } = mentionPlugin
      const plugins = [mentionPlugin]
      return { plugins, MentionSuggestions }
    }, [])

    const onOpenChange = useCallback((_open: boolean) => {
      setOpen(_open)
    }, [])
    const onSearchChange = useCallback(({ value }: { value: string }) => {
      setSuggestions(defaultSuggestionsFilter(value, mentions || []))
    }, [])

    const MentionComponent = (
      <MentionSuggestions
        open={open}
        onOpenChange={onOpenChange}
        suggestions={suggestions}
        onSearchChange={onSearchChange}
        entryComponent={Entry}
        popoverContainer={({ children }) => <div>{children}</div>}
      />
    )

    return (
      <>
        <Editor
          readOnly={readOnly}
          editorKey={'editor'}
          editorState={state}
          onChange={onChange}
          plugins={plugins}
          ref={ref}
        />
        {MentionComponent}
      </>
    )
  }
)

export default EditorWithMentions
