import React, { Component } from "react"
import { connect } from "react-redux"
import Canvas from "./Canvas"
import { mainActions } from "../_actions"

class ColorMap extends Component {
  constructor(props) {
    super(props)
    this.setCanvasRef = el => {
      this.canvas = el
      this.ctx = el.getContext("2d")
    }
  }

  componentDidMount() {
    const { ctx } = this
    const { size, dispatch } = this.props
    const gradient = ctx.createLinearGradient(0, 0, size, size)
    gradient.addColorStop(0, "#ff00ff")
    gradient.addColorStop(1, "#00ffff")
    ctx.fillStyle = gradient
    ctx.fillRect(0, 0, size, size)
    dispatch(mainActions.registerMap("gradient", "Color Gradient", this.canvas))
  }

  render() {
    return <Canvas size={this.props.size} innerRef={this.setCanvasRef} />
  }
}

const mapStateToProps = state => ({
  size: state.main.resolution
})

export default connect(mapStateToProps)(ColorMap)
