import styled from 'styled-components'
import { ContentArea as SContentArea } from '../style'
import { Item, Menu as SMenu } from 'semantic-ui-react'

export const Menu = styled(SMenu)`
  margin: unset !important;
  @media only screen and (max-width: 767px) {
    margin: 1em !important;
  }
`

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
  min-height: 65vh;
  @media only screen and (max-width: 1024px) {
    flex-flow: column;
  }
`

export const VideosArea = styled.div`
  background-color: #f8f8f8;
  flex-flow: row;
  min-width: 650px;
  padding: 24px 16px;
  @media only screen and (max-width: 1024px) {
    flex: 1;
    width: unset;
  }
`

export const Content = styled.div`
  padding: 24px 16px;
  width: auto;
  flex: 1;
`

export const ContentArea = styled(SContentArea)`
  overflow: auto;
`

export const StoryItem = styled(Item)`
  &.item {
    border: 1px solid #e0e1e2 !important;
    max-height: 200px;
    min-width: 700px;
  }
  &.item > .content {
    padding: 16px 0px 16px 14px !important;
    background-color: white !important;
    & > .description {
      max-width: fit-content;
      -webkit-line-clamp: 5;
      -webkit-box-orient: vertical;
      display: -webkit-box;
      overflow: hidden;
      margin-right: 24px;
      height: 100px;
    }
    & > .description {
    }
    & > .meta {
      display: flex;
      align-items: center;
    }
  }
  &.item > .lazyImage {
    background-color: #000000;
    height: 200px;
    width: 352px;
    & > .ui.image img {
      margin-left: auto;
      margin-right: auto;
      max-width: inherit;
      height: inherit;
    }
  }

  @media only screen and (max-width: 1024px) {
    &.item {
      height: unset;
      min-width: unset;
    }
  }

  @media only screen and (max-width: 767px) {
    &.item > .lazyImage {
      height: unset;
      width: unset;
    }
  }
`
