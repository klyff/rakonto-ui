import styled from 'styled-components'

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
