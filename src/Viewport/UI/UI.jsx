import React, { Component } from "react"
import styled from "styled-components"
import Section from "./Section"
import ResolutionSetting from "./ResolutionSetting"

const Wrapper = styled.div`
  height: 100%;
  color: white;
  padding: 1rem 1.5rem;
  background-color: #202020;
  line-height: normal;
`

class UI extends Component {
  render() {
    return (
      <Wrapper id="ui">
        <Section title="Resolution">
          <ResolutionSetting />
        </Section>
      </Wrapper>
    )
  }
}

export default UI
