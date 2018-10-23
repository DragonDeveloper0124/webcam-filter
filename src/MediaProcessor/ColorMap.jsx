import React, { Component } from "react"
import { connect } from "react-redux"
import PropTypes from "prop-types"
import Canvas from "./Canvas"
import { mainActions } from "../_actions"

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
    const { dispatch, id } = this.props
    dispatch(mainActions.registerMap(id, "Color Gradient", this.canvas))
    dispatch(mainActions.registerGradient(id, "Wireframe", ["white", "white"]))
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
    const { id, gradients } = this.props

    const gradient = gradients.find(gradient => gradient.id === id)

    if (!gradient || !gradient.colors) return

    const { colors } = gradient

    const grad = ctx.createLinearGradient(0, 0, size, size)
    colors.forEach((hex, i) => {
      grad.addColorStop(i / (colors.length - 1), hex)
    })
    ctx.fillStyle = grad
    ctx.fillRect(0, 0, size, size)
  }
}

ColorMap.propTypes = {
  gradients: PropTypes.array
}

ColorMap.defaultProps = { gradients: [] }

const mapStateToProps = ({ main }, { id }) => {
  const { gradients } = main
  return { gradients }
}

export default connect(mapStateToProps)(ColorMap)
