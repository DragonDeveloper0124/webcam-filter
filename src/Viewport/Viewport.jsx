import React, { Component } from "react"
import styled from "styled-components"
import Renderer from "./Renderer"
import MediaProcessor from "../MediaProcessor"

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
  align-items: center;
  background-color: black;
`

class Viewport extends Component {
  constructor(props) {
    super(props)
    this.setMediaRef = el => {
      this.media = el
    }
    this.setRendererRef = comp => {
      this.renderer = comp
    }
    this.state = {
      gridSize: 64
    }
  }

  componentDidMount() {
    this.renderer.init(this.media)
    this.draw()
  }

  draw = () => {
    this.renderer.draw()
    requestAnimationFrame(this.draw)
  }

  render() {
    const { gridSize } = this.state
    return (
      <Wrapper>
        <MediaProcessor size={gridSize} outputRef={this.setMediaRef} />
        <Renderer gridSize={gridSize} ref={this.setRendererRef} />
      </Wrapper>
    )
  }
}

export default Viewport
