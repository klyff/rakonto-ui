import { MouseEvent, ReactElement, useCallback, useMemo, useRef, useState } from 'react'
import { EditorState } from 'draft-js'
import Editor from '@draft-js-plugins/editor'
import createMentionPlugin, {
  defaultSuggestionsFilter,
  MentionData,
  MentionPluginTheme
} from '@draft-js-plugins/mention'
import editorStyles from './CustomMentionEditor.module.css'
import mentionsStyles from './MentionsStyles.module.css'
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

function Entry(props: EntryComponentProps): ReactElement {
  const { mention, theme, ...parentProps } = props

  return (
    <div {...parentProps}>
      <div className={theme?.mentionSuggestionsEntryContainer}>
        <div className={theme?.mentionSuggestionsEntryContainerLeft}>
          <Avatar src={mention.avatar} name={mention.name} />
        </div>
        <div className={theme?.mentionSuggestionsEntryContainerRight}>
          <div className={theme?.mentionSuggestionsEntryText}>{mention.name}</div>
        </div>
      </div>
    </div>
  )
}

interface iCustomMentionEditor {
  mentions?: MentionData[]
}

const CustomMentionEditor: React.FC<iCustomMentionEditor> = ({ mentions }) => {
  const ref = useRef<Editor>(null)
  const [editorState, setEditorState] = useState(() => EditorState.createEmpty())
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

  const onChange = useCallback((_editorState: EditorState) => {
    setEditorState(_editorState)
  }, [])
  const onOpenChange = useCallback((_open: boolean) => {
    setOpen(_open)
  }, [])
  const onSearchChange = useCallback(({ value }: { value: string }) => {
    setSuggestions(defaultSuggestionsFilter(value, mentions || []))
  }, [])

  return (
    <div
      className={editorStyles.editor}
      onClick={() => {
        ref.current?.focus()
      }}
    >
      <Editor editorKey={'editor'} editorState={editorState} onChange={onChange} plugins={plugins} ref={ref} />
      <MentionSuggestions
        open={open}
        onOpenChange={onOpenChange}
        suggestions={suggestions}
        onSearchChange={onSearchChange}
        entryComponent={Entry}
        popoverContainer={({ children }) => <div>{children}</div>}
      />
    </div>
  )
}

export default CustomMentionEditor
