import styled from 'styled-components'

export const Title = styled.div`
  font-size: 20px;
  font-style: normal;
  font-weight: 700;
  line-height: 24px;
  letter-spacing: 0em;
  text-align: left;
  margin-bottom: 24px;
`

export const SecondTitle = styled.div`
  font-size: 16px;
`

export const Author = styled.div`
  display: flex;
  flex-flow: row;
  align-items: center;
  & > span {
    margin-left: 16px;
  }
`

export const Description = styled.div`
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 20px;
  letter-spacing: 0em;
  text-align: left;
`
