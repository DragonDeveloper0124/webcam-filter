import React, { Component } from "react"
import styled from "styled-components"
import { darken } from "polished"
import Section from "./Section"
import ResolutionSetting from "./ResolutionSetting"

const Wrapper = styled.div`
  max-width: 16rem;
  height: 100%;
  color: ${({ theme }) => theme.fontColor};
  padding: 1rem 1.6rem;
  background: linear-gradient(
    to right,
    ${({ theme }) => theme.bgColor} 0%,
    ${({ theme }) => darken(0.08, theme.bgColor)} 100%
  );
  line-height: normal;
  transition: 0.2s ease transform;
  position: absolute;
  transform: ${({ closed }) => (closed ? "translate(16rem)" : "translate(0)")};
  right: 0;
`

class UI extends Component {
  constructor(props) {
    super(props)

    this.state = {
      closed: false
    }
  }

  render() {
    const { closed } = this.state

    return (
      <Wrapper id="ui" closed={closed}>
        <Section title="Resolution">
          <ResolutionSetting />
        </Section>
      </Wrapper>
    )
  }
}

export default UI
