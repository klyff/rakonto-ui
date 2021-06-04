import styled from 'styled-components'

export const PreviewBox = styled.div`
  margin-top: 20px;
  width: 100%;
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
  & > button {
    @media only screen and (max-width: 767px) {
      flex: 1;
    }
  }
`
