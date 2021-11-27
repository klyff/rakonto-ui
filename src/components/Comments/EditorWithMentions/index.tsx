import React, { useCallback, useMemo, useRef, useState } from 'react'
import createMentionPlugin, { defaultSuggestionsFilter, MentionData } from '@draft-js-plugins/mention'
import Entry from './Entry'
import Editor from '@draft-js-plugins/editor'
import { EditorState } from 'draft-js'

interface iMention {
  mentions?: MentionData[]
  state: EditorState
  onChange: (state: EditorState) => void
  readOnly?: boolean
}

const EditorWithMentions: React.FC<iMention> = React.forwardRef<Editor, iMention>(
  ({ mentions, state, onChange, readOnly }) => {
    const ref = useRef<Editor>(null)
    const [open, setOpen] = useState(false)
    const [suggestions, setSuggestions] = useState(mentions || [])
    const { MentionSuggestions, plugins } = useMemo(() => {
      const mentionPlugin = createMentionPlugin({
        entityMutability: 'IMMUTABLE',
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
      if (value.trim().length > 3) {
        setSuggestions(defaultSuggestionsFilter(value, mentions || []))
      }
    }, [])

    const mentionComponent = (
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
        <div
          onClick={() => {
            ref?.current?.focus()
          }}
        >
          <Editor
            readOnly={readOnly}
            editorKey="editor"
            editorState={state}
            onChange={onChange}
            plugins={plugins}
            ref={ref}
          />
          {mentionComponent}
        </div>
      </>
    )
  }
)

export default EditorWithMentions
