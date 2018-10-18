import React, { Component } from "react"
import { Provider } from "react-redux"
import { store } from "../_helpers"
import styled from "styled-components"
import Viewport from "../Viewport"

const Wrapper = styled.div`
  position: relative;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  min-height: 100vh;
`

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Wrapper>
          <Viewport />
        </Wrapper>
      </Provider>
    )
  }
}

export default App
