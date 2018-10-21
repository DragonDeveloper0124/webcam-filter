import React, { Component } from "react"
import styled from "styled-components"

const Wrapper = styled.div`
  height: 100%;
  max-width: 8rem;
  color: white;
  padding: 2rem;
  background-color: #202020;
`

class UI extends Component {
  render() {
    return <Wrapper id="ui" />
  }
}

export default UI
