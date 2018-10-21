import React, { Component } from "react"
import { Provider } from "react-redux"
import { store } from "../_helpers"
import styled, { ThemeProvider, injectGlobal } from "styled-components"
import { theme } from "../style"
import Viewport from "../Viewport"

injectGlobal`
  @import url('https://fonts.googleapis.com/css?family=Roboto:300,300i,400,400i,500,500i,700,700i');
  body { background: black; }
`

const Wrapper = styled.div`
  font-family: "Roboto", sans-serif;
  font-weight: 400;
  font-size: 1em;
  letter-spacing: 0.06em;

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
        <ThemeProvider theme={theme}>
          <Wrapper>
            <Viewport />
          </Wrapper>
        </ThemeProvider>
      </Provider>
    )
  }
}

export default App
