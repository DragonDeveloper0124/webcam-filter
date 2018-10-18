import React, { Component } from "react"
import PropTypes from "prop-types"
import Filter from "./Filter"
import Media from "./Media"
import FilterInstance from "./FilterInstance"

class MediaProcessor extends Component {
  constructor(props) {
    super(props)

    this.setInstanceRef = el => {
      this.instance = el
      this.setState({
        instance: el
      })
    }

    this.setRootFilterRef = filter => {
      this.rootFilter = filter
    }

    this.state = {
      delay: 1000 / 30,
      crop: { x: 0, y: 0 },
      instance: null,
      fadeFactor: 0.2
    }

    this.time = null
  }

  componentWillUnmount() {
    cancelAnimationFrame(this.draw)
  }

  render() {
    const { size, outputRef } = this.props
    const { instance, fadeFactor } = this.state
    return (
      <React.Fragment>
        <Filter
          ref={this.setRootFilterRef}
          outputRef={outputRef}
          size={size}
          onUpdate={pileFrames(fadeFactor)}
        >
          <Filter size={size} onUpdate={differenceBlend} blendMode="difference">
            <Filter size={size} onUpdate={prevFrame}>
              <FilterInstance media={instance} />
            </Filter>
            <Filter size={size} instanceRef={this.setInstanceRef}>
              <Media onPlaying={this.startStream} />
            </Filter>
          </Filter>
        </Filter>
      </React.Fragment>
    )
  }

  startStream = () => {
    this.rootFilter.init()
    this.draw()
  }

  draw = timestamp => {
    requestAnimationFrame(this.draw)

    if (this.time === null) this.time = timestamp
    if (timestamp - this.time < this.state.delay) return
    this.time = timestamp

    this.rootFilter.update()
  }
}

const prevFrame = ({ ctx, inputs, size, crop, inputSize, nextUpdate }) => {
  ctx.clearRect(0, 0, size, size)
  drawImage(ctx, inputs[0], crop, inputSize, size)
  nextUpdate()
}

const differenceBlend = ({
  ctx,
  inputs,
  size,
  crop,
  inputSize,
  nextUpdate
}) => {
  nextUpdate()
  ctx.clearRect(0, 0, size, size)
  drawImage(ctx, inputs[0], crop, inputSize, size)
  drawImage(ctx, inputs[1], crop, inputSize, size)
}

const pileFrames = fadeFactor => ({
  ctx,
  inputs,
  size,
  crop,
  inputSize,
  nextUpdate
}) => {
  nextUpdate()
  ctx.globalCompositeOperation = "screen"
  drawImage(ctx, inputs[0], crop, inputSize, size)
  ctx.fillStyle = `rgba(0,0,0,${fadeFactor})`
  ctx.globalCompositeOperation = "source-over"
  ctx.fillRect(0, 0, size, size)
}

const drawImage = (ctx, img, crop, inputSize, size, nextUpdate) => {
  ctx.drawImage(img, crop.x, crop.y, inputSize, inputSize, 0, 0, size, size)
}

MediaProcessor.propTypes = {
  size: PropTypes.number,
  outputRef: PropTypes.func
}

export default MediaProcessor
