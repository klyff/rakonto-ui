import styled from 'styled-components'
import { ContentArea as SContentArea } from '../style'

export const PreviewBox = styled.div`
  background-color: black;
  & > div {
    max-height: 720px;
    max-width: 1280px;
    margin-left: auto;
    margin-right: auto;
  }
`

export const ContentArea = styled(SContentArea)`
  overflow: auto;
`
