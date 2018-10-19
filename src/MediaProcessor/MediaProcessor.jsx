import React, { Component } from "react"
import PropTypes from "prop-types"
import Filter from "./Filter"
import Media from "./Media"
import FilterInstance from "./FilterInstance"
import { delayFrame, blendFrames, streak } from "./FilterBehaviours"

class MediaProcessor extends Component {
  constructor(props) {
    super(props)

    this.setInstanceRef = el => {
      this.setState({
        instance: el
      })
    }

    this.setRootFilterRef = filter => {
      this.rootFilter = filter
    }

    this.state = {
      fps: 30,
      instance: null,
      fadeFactor: 0.2,
      frame: -1,
      streaming: false
    }

    this.time = null
  }

  componentWillUnmount() {
    cancelAnimationFrame(this.update)
  }

  render() {
    const { size, outputRef } = this.props
    const { instance } = this.state

    return (
      <div>
        <Filter size={size} instanceRef={this.setInstanceRef} id="base">
          <Media onPlaying={this.startStream} />
        </Filter>
        <Filter outputRef={outputRef} size={size} behaviour={streak(0.2)}>
          <Filter size={size} behaviour={blendFrames("difference")}>
            {instance ? <FilterInstance media={instance} /> : null}
            <Filter size={size} behaviour={delayFrame()}>
              {instance ? <FilterInstance media={instance} /> : null}
            </Filter>
          </Filter>
        </Filter>
      </div>
    )
  }

  startStream = () => {
    this.setState({ streaming: true }, this.update)
  }

  update = timestamp => {
    requestAnimationFrame(this.update)

    if (this.time === null) this.time = timestamp
    if (timestamp - this.time < 1000 / this.state.fps) return
    this.time = timestamp

    this.setState(({ frame, fps }) => ({ frame: (frame + 1) % fps }))
  }
}

MediaProcessor.propTypes = {
  size: PropTypes.number,
  outputRef: PropTypes.func
}

export default MediaProcessor
