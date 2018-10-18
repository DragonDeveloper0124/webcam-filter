import React, { Component } from "react"
import PropTypes from "prop-types"
import Canvas from "./Canvas"

class Filter extends Component {
  constructor(props) {
    super(props)
    this.childFilters = []
    this.inputs = []
    this.setCanvasRef = el => {
      this.canvas = el
      this.ctx = el.getContext("2d")
    }
    this.setInputRef = input => {
      this.inputs.push(input)
    }
    this.setChildFilterRef = filter => {
      this.childFilters.push(filter)
    }
    this.crop = { x: 0, y: 0 }
    this.inputSize = 1
  }

  componentDidMount() {
    const { outputRef, instanceRef, size, blendMode } = this.props
    if (outputRef) outputRef(this.canvas)
    if (instanceRef) instanceRef(this.canvas)
    this.ctx.globalCompositeOperation = blendMode
    this.inputSize = size
  }

  init() {
    for (let i = 0; i < this.childFilters.length; i++) {
      const f = this.childFilters[i]
      if (f.init) f.init()
    }
  }

  render() {
    const { id, size } = this.props
    return (
      <React.Fragment>
        <Canvas id={id} innerRef={this.setCanvasRef} size={size} />
        {this.renderChildren()}
      </React.Fragment>
    )
  }

  renderChildren() {
    const { children } = this.props
    return React.Children.map(children, child => {
      return React.cloneElement(child, {
        ref: this.setChildFilterRef,
        outputRef: this.setInputRef,
        onResize: this.handleInputResize
      })
    })
  }

  update = () => {
    const { size, onUpdate } = this.props
    const { ctx, inputs, crop, inputSize, nextUpdate } = this

    if (onUpdate) onUpdate({ ctx, size, inputs, crop, inputSize, nextUpdate })
    else {
      nextUpdate()
      const input = inputs[0]
      ctx.drawImage(
        input,
        crop.x,
        crop.y,
        inputSize,
        inputSize,
        0,
        0,
        size,
        size
      )
    }
  }

  nextUpdate = () => {
    for (let i = 0; i < this.childFilters.length; i++) {
      const f = this.childFilters[i]
      if (f.update) f.update()
    }
  }

  handleInputResize = ({ width, height }) => {
    const { round, max, min } = Math
    const aspect = width / height
    this.crop = {
      x: round((max(0, aspect - 1) * height) / 2),
      y: round((-min(0, aspect - 1) * height) / 2)
    }
    this.inputSize = width > height ? height : width
  }
}

Filter.propTypes = {
  id: PropTypes.string,
  outputRef: PropTypes.func,
  size: PropTypes.number,
  onUpdate: PropTypes.func,
  blendMode: PropTypes.string,
  instanceRef: PropTypes.func
}

Filter.defaultProps = {
  blendMode: "source-over"
}

export default Filter
