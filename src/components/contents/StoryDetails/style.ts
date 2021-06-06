import styled from 'styled-components'
import { Form as FForm } from 'formik-semantic-ui-react'

export const PreviewBox = styled.div`
  margin-top: 20px;
  width: 100%;
  min-width: 426px;
  min-height: 240px;
  position: relative;
`
export const Footer = styled.div`
  border-top: 1px solid rgba(34, 36, 38, 0.15);
  width: 100%;
  position: absolute;
  left: 0;
  bottom: 0;
  padding: 10px 33px 14px;
  display: flex;
  justify-content: flex-end;
  background-color: white;
  & > div.ui.buttons {
    @media only screen and (max-width: 1024px) {
      width: 100%;
    }
  }
`
