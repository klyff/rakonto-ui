import styled from 'styled-components'
import { Comment as SComment } from 'semantic-ui-react'

export const EditorBox = styled.div`
  box-sizing: border-box;
  border: 1px solid #ddd;
  cursor: text;
  padding: 16px;
  border-radius: 2px;
  margin-bottom: 2em;
  box-shadow: inset 0px 1px 8px -3px #ababab;
  background: #fefefe;
  &:global(.public-DraftEditor-content) {
    min-height: 140px;
  }
`

export const CommentWrapper = styled(SComment)`
  background-color: red;
  & > div.avatar {
    height: 36px !important;
    span {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100%;
      height: 100%;
    }
  }
  & > * div.avatar {
    height: 36px !important;
    span {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100%;
      height: 100%;
    }
  }
`
