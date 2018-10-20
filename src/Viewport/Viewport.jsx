import React, { Component } from "react"
import { connect } from "react-redux"
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

    this.setMediaRef = media => {
      this.setState({ media })
    }

    this.state = { media: null }
  }

  render() {
    const { gridSize } = this.props
    const { media } = this.state
    return (
      <Wrapper>
        <MediaProcessor size={gridSize} outputRef={this.setMediaRef} />
        {media ? <Renderer media={media} /> : null}
      </Wrapper>
    )
  }
}

const mapStateToProps = state => ({
  gridSize: state.main.resolution
})

export default connect(mapStateToProps)(Viewport)
