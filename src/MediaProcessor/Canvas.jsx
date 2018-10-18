import React from "react"
import styled from "styled-components"
import PropTypes from "prop-types"

const CanvasEl = styled.canvas`
  display: none;
`

const Canvas = ({ id, size, innerRef }) => {
  const cssSize = `${size}px`
  return (
    <CanvasEl
      id={id}
      width={size}
      height={size}
      style={{ width: cssSize, height: cssSize }}
      innerRef={innerRef}
    />
  )
}

Canvas.propTypes = {
  size: PropTypes.number,
  innerRef: PropTypes.func
}

export default Canvas
