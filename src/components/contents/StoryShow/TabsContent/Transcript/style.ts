import styled from 'styled-components'
import { Button as SButton } from 'semantic-ui-react'

export const SaveButton = styled(SButton)`
  &.ui.button {
    margin-top: 12px;
    margin-bottom: 12px;
  }
`

export const EditorWrapper = styled.div`
  & > .transcript-wrapper {
    > .transcript-editor {
      overflow: auto;
    }
  }
`
