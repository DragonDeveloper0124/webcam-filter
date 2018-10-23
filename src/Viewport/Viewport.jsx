import React, { Component } from "react"
import { connect } from "react-redux"
import styled from "styled-components"
import Renderer from "./Renderer"
import MediaProcessor from "../MediaProcessor"
import UI from "./UI"

const Wrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  align-items: center;
  background-color: black;
`

class Viewport extends Component {
  render() {
    const { textureMaps } = this.props
    return (
      <Wrapper id="viewport">
        <MediaProcessor />
        {textureMaps.length && <Renderer maps={textureMaps} />}
        <UI />
      </Wrapper>
    )
  }
}

const mapStateToProps = state => ({
  textureMaps: state.main.textureMaps
})

export default connect(mapStateToProps)(Viewport)
