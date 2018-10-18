import React, { Component } from "react"
import styled from "styled-components"
import PropTypes from "prop-types"

const Video = styled.video`
  opacity: 0;
  position: absolute;
`

class Media extends Component {
  constructor(props) {
    super(props)
    this.setMediaRef = el => {
      this.media = el
    }
  }

  componentDidMount() {
    navigator.getUserMedia =
      navigator.getUserMedia ||
      navigator.webkitGetUserMedia ||
      navigator.mozGetUserMedia

    const { outputRef, onPlaying } = this.props
    if (outputRef) outputRef(this.media)

    this.media.addEventListener("playing", this.handleMediaResize)
    if (onPlaying) this.media.addEventListener("playing", onPlaying)
    navigator.mediaDevices.getUserMedia({ video: true }).then(this.handleStream)
  }

  componentWillUnmount() {
    const { onPlaying } = this.props
    this.media.removeEventListener("playing", this.handleMediaResize)
    if (onPlaying) this.media.removeEventListener("playing", onPlaying)
  }

  render() {
    return <Video innerRef={this.setMediaRef} autoPlay playsInline />
  }

  handleStream = stream => {
    const { media } = this
    media.srcObject = stream
  }

  handleMediaResize = () => {
    const { onResize, media } = this.props
    if (onResize)
      onResize({
        width: this.media.clientWidth,
        height: this.media.clientHeight
      })
  }
}

Media.propTypes = {
  outputRef: PropTypes.func,
  onPlaying: PropTypes.func
}

export default Media
