import React, { Component } from "react"
import PropTypes from "prop-types"
import Filter from "./Filter"
import Media from "./Media"
import ColorMap from "./ColorMap"
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
      streakLength: 0.85,
      frame: -1
    }

    this.time = null
  }

  componentWillUnmount() {
    cancelAnimationFrame(this.update)
  }

  render() {
    const { outputRef } = this.props
    const { instance, streakLength } = this.state

    return (
      <div>
        <ColorMap
          id="wireframe"
          label="Wireframe"
          colors={["#00ffff", "#ff00ff"]}
        />
        <ColorMap id="plane" label="Plane" colors={["black", "black"]} />
        <Filter
          instanceRef={this.setInstanceRef}
          id="video"
          name="Webcam Stream"
        >
          <Media onPlaying={this.startStream} />
        </Filter>
        <Filter
          behaviour={streak(1 - streakLength)}
          outputRef={outputRef}
          id="diff"
          name="Difference Map"
        >
          <Filter behaviour={blendFrames("difference")}>
            {instance ? <FilterInstance media={instance} /> : null}
            <Filter behaviour={delayFrame()}>
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
  outputRef: PropTypes.func
}

export default MediaProcessor
