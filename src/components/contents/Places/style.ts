import styled from 'styled-components'
import { List as SList } from 'semantic-ui-react'

export const TitleArea = styled.div`
  display: flex;
  margin-bottom: 1em;
`

export const List = styled(SList)`
  padding-bottom: 30px !important;
  padding-right: 8px !important;

  @media only screen and (max-width: 1024px) {
    height: unset;
    padding-bottom: unset;
    padding-right: unset;
  }
`

export const Item = styled.div`
  position: relative;
  min-width: 500px;
  & > div {
    padding: 8px 16px;
  }
  & > div:last-child {
    height: 260px;
  }

  @media only screen and (max-width: 1024px) {
    min-width: unset;
  }
`
