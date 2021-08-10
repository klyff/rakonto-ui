import styled from 'styled-components'
import { Dropdown } from 'semantic-ui-react'

export const UploadButtonArea = styled.div`
  display: flex;
  justify-content: flex-start;
  margin-bottom: 12px;
  @media only screen and (max-width: 1024px) {
    flex-flow: row-reverse;
  }
`

export const ProgressBox = styled.div`
  flex: 1;
  margin: 0 10px;
`

export const GridImages = styled.div`
  display: flex;
  flex-flow: wrap;
  padding-bottom: 30px !important;
  padding-right: 8px !important;

  @media only screen and (max-width: 1024px) {
    height: unset;
    padding-bottom: unset;
    padding-right: unset;
  }

  & > .ui.segment.item {
    padding: 12px;
  }
`
export const GridItem = styled.div`
  cursor: pointer;
  width: 250px;
  height: 285px;
  padding: 8px;
  position: relative;
`

export const ImageBox = styled.div`
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.85);
  display: flex;
  justify-content: center;
  & > .ui.image {
    object-fit: contain;
    width: unset;
    height: unset;
  }
`
export const Actions = styled(Dropdown)`
  position: absolute;
  background: #e0e1e2 none;
  z-index: 1;
  border-radius: 10em;
  padding: 0.78571429em 0.78571429em 0.78571429em;
  &.ui.dropdown {
    position: absolute;
    top: 20px;
    right: 20px;
    i.icon {
      margin: unset;
      width: 1.358em;
    }
  }
`
