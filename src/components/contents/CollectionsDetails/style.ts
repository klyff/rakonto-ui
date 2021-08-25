import styled from 'styled-components'
import { Item } from 'semantic-ui-react'

export const Title = styled.div`
  margin-bottom: 32px;
`

export const Layout = styled.div`
  display: flex;
  height: 100%;
  position: relative;
  padding: 24px;
  @media only screen and (max-width: 1024px) {
    flex-direction: column;
    align-items: center;
    flex-flow: column;
    overflow-x: hidden;
  }
`

export const FormArea = styled.div`
  &:before {
    content: ' ';
    background-color: #f8f8f8;
    position: absolute;
    left: -23px;
    top: -22px;
    bottom: -18px;
    width: 508px;
    z-index: -1;
  }
  & > * > .ui.button {
    margin-top: 48px;
  }
  @media only screen and (max-width: 1024px) {
    width: 100%;
    &:before {
      display: none;
    }
  }
`

export const StoriesArea = styled.div`
  margin-top: 48px;
  left: 508px;
  right: 22px;
  position: absolute;
  @media only screen and (max-width: 1024px) {
    width: 100%;
    position: relative;
    left: unset;
    right: unset;
  }
`

export const StoryItem = styled(Item)`
  &.item {
    border: 1px solid #e0e1e2 !important;
    height: 200px;
    min-width: 600px;
    max-width: 800px;
  }
  &.item > .content {
    padding: 16px 0px 16px 14px !important;
    & > .description {
      max-width: fit-content;
      -webkit-line-clamp: 7;
      -webkit-box-orient: vertical;
      display: -webkit-box;
      overflow: hidden;
      margin-right: 24px;
    }
  }
  &.item > .lazyImage {
    height: 200px;
    width: 352px;
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
