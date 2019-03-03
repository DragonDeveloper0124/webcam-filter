import React, { Component } from "react"
import { connect } from "react-redux"
import PropTypes from "prop-types"
import Canvas from "./Canvas"

class ColorMap extends Component {
  constructor(props) {
    super(props)

    this.setCanvasRef = el => {
      this.canvas = el
      this.ctx = el.getContext("2d")
    }

    this.state = { size: 64 }
  }

  componentDidMount() {
    const { onMapReady } = this.props
    onMapReady(this.canvas)
    this.draw()
  }

  render() {
    return <Canvas size={this.state.size} innerRef={this.setCanvasRef} />
  }

  componentDidUpdate() {
    this.draw()
  }

  draw() {
    const { ctx } = this
    const { size } = this.state
    const { colors } = this.props

    const grad = ctx.createLinearGradient(0, 0, size, size)
    colors.forEach((hex, i) => {
      grad.addColorStop(i / (colors.length - 1), hex)
    })
    ctx.fillStyle = grad
    ctx.fillRect(0, 0, size, size)
  }
}

ColorMap.propTypes = {
  onMapReady: PropTypes.func,
}

ColorMap.defaultProps = { gradients: [] }

export default connect(({ maps }) => ({ colors: maps.gradientColors }))(ColorMap)
