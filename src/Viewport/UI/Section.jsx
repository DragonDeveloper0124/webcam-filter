import React from "react"
import styled from "styled-components"

const Wrapper = styled.div`
  width: 100%;
  &:not(:last-child) {
    padding-bottom: 1rem;
  }
`

const Title = styled.div`
  width: 100%;
  font-size: 1em;
  color: #f0f0f0;
  border-bottom: 1px solid #f0f0f0;
  padding-bottom: 0.5rem;
  margin-bottom: 0.5rem;
`

const Section = ({ title, children }) => (
  <Wrapper>
    <Title>{title}</Title>
    {children}
  </Wrapper>
)

export default Section
