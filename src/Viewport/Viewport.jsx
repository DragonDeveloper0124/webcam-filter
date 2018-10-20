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
  render() {
    const { maps } = this.props
    return (
      <Wrapper>
        <MediaProcessor />
        {maps.length ? <Renderer maps={maps} /> : null}
      </Wrapper>
    )
  }
}

const mapStateToProps = state => ({
  maps: state.main.maps
})

export default connect(mapStateToProps)(Viewport)
