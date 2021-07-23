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

export const ContentBox = styled.div`
  display: flex;
  flex-flow: row;
  @media only screen and (max-width: 1024px) {
    flex-flow: column;
  }
`

export const VideosArea = styled.div`
  background-color: #f8f8f8;
  flex-flow: row;
  min-width: 50%;
  padding: 24px 16px;
  @media only screen and (max-width: 1024px) {
    flex: 1;
    width: unset;
  }
`

export const Content = styled.div`
  padding: 24px 16px;
  min-width: 50%;
`

export const ContentArea = styled(SContentArea)`
  overflow: auto;
`
