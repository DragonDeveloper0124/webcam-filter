import React, { Component } from "react"
import { connect } from "react-redux"
import PropTypes from "prop-types"
import Canvas from "./Canvas"
import { defaultBehaviour } from "./FilterBehaviours"
import { mainActions } from "../_actions"

class Filter extends Component {
  constructor(props) {
    super(props)
    this.childFilters = []
    this.inputs = []

    this.setCanvasRef = el => {
      this.canvas = el
      this.setState({ ctx: el.getContext("2d") })
    }

    this.setInputRef = input => {
      this.setState(({ inputs }) => ({
        inputs: [...inputs, { media: input, crop: { x: 0, y: 0 } }]
      }))
    }

    this.state = {
      ctx: null,
      inputs: []
    }
    this.crop = { x: 0, y: 0 }
    this.inputSize = 1
  }

  componentDidMount() {
    const { outputRef, instanceRef, size, dispatch, id, name } = this.props

    if (id) dispatch(mainActions.registerMap(id, name, this.canvas))
    if (outputRef) outputRef(this.canvas)
    if (instanceRef) instanceRef(this.canvas)
    this.inputSize = size
  }

  render() {
    const { id, size, behaviour } = this.props
    const { ctx, inputs } = this.state

    if (behaviour && ctx && inputs.length) {
      const { earlyUpdate } = behaviour
      if (earlyUpdate) earlyUpdate({ ctx, size, inputs })
    }

    return (
      <React.Fragment>
        <Canvas id={id} innerRef={this.setCanvasRef} size={size} />
        {this.renderChildren()}
      </React.Fragment>
    )
  }

  componentDidUpdate() {
    const { ctx, inputs } = this.state
    if (ctx && inputs.length) {
      const { size, behaviour } = this.props
      const { update } = behaviour ? behaviour : defaultBehaviour
      if (update) update({ ctx, size, inputs })
    }
  }

  renderChildren() {
    const { children } = this.props
    return React.Children.map(children, child => {
      if (!child) return
      return React.cloneElement(child, {
        outputRef: this.setInputRef,
        onResize: this.handleInputResize
      })
    })
  }

  handleInputResize = ({ width, height, media }) => {
    const input = this.state.inputs.find(input => input.media === media)

    const { round, max, min } = Math
    const aspect = width / height
    input.crop = {
      x: round((max(0, aspect - 1) * height) / 2),
      y: round((-min(0, aspect - 1) * height) / 2)
    }
    input.size = width > height ? height : width
  }
}

Filter.propTypes = {
  id: PropTypes.string,
  outputRef: PropTypes.func,
  size: PropTypes.number,
  onUpdate: PropTypes.func,
  instanceRef: PropTypes.func,
  FilterComp: PropTypes.func
}

const mapStateToProps = state => ({
  size: state.main.resolution
})

export default connect(mapStateToProps)(Filter)
