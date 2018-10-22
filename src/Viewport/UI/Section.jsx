import React from "react"
import styled from "styled-components"
import { darken } from "polished"

const Wrapper = styled.div`
  width: 100%;
  &:not(:last-child) {
    padding-bottom: 2rem;
  }
`

const Title = styled.div`
  width: 100%;
  font-size: 1em;
  color: ${({ theme }) => theme.fontColor};
  border-bottom: 1px solid ${({ theme }) => darken(0.6, theme.fontColor)};
  padding-bottom: 0.5rem;
  margin-bottom: 1rem;
`

const Section = ({ title, children }) => (
  <Wrapper>
    <Title>{title}</Title>
    {children}
  </Wrapper>
)

export default Section
