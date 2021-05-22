import styled from 'styled-components'
import { Grid } from 'semantic-ui-react'
import BackGroundImage from './sideLogin.png'

export const GridImage = styled(Grid.Column)`
  position: relative;
  display: flex;
  height: 100vh;
  background-image: url(${BackGroundImage});
  background-size: cover;
`

export const TextBox = styled.div`
  position: absolute;
  background: rgba(0, 0, 0, 0.5);
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 1rem;
`

export const PrimaryText = styled.div`
  font-size: 56px;
  font-weight: bold;
  line-height: 67px;
  letter-spacing: 0.04em;
  color: white;
  max-width: 560px;
  margin-bottom: 64px;
`

export const SecondaryText = styled.div`
  font-size: 32px;
  letter-spacing: 0.04em;
  font-weight: normal;
  line-height: 38px;
  color: white;
  max-width: 684px;
`

export const GridLogin = styled(Grid.Column)`
  height: 100vh;
`

export const FormBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100%;
  & > div {
    width: 100%;
    align-self: center;
  }
`
