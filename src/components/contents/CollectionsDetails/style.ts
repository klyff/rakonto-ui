import styled from 'styled-components'

export const Title = styled.div`
  margin-bottom: 32px;
`

export const Layout = styled.div`
  display: flex;
  height: 100%;
  position: relative;
  @media only screen and (max-width: 1024px) {
    flex-direction: column;
    align-items: center;
    flex-flow: column;
    overflow-x: hidden;
  }

  @media only screen and (max-width: 767px) {
    height: calc(100% - 140px);
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
    width: 484px;
    z-index: -1;
  }
  & > * > .ui.button {
    margin-top: 48px;
  }
  @media only screen and (max-width: 1024px) {
    &:before {
      display: none;
    }
  }
`

export const StoriesArea = styled.div`
  margin-top: 48px;
  margin-left: 32px;
`
