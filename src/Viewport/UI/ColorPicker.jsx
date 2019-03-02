import React, { Component } from "react"
import styled from "styled-components"
import { ChromePicker } from "react-color"

const Wrapper = styled.div`
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  align-items: center;
`

const PopOver = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  z-index: 2;
`

const Cover = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
`

const Button = styled.button`
  border: 2px solid ${({ theme }) => theme.fontColor};
  border-radius: 0.25rem;
  width: 1.5rem;
  height: 1.5rem;
  outline: none !important;
  cursor: pointer;
`

class ColorPicker extends Component {
  constructor(props) {
    super(props)
    this.state = { open: false }
  }

  render() {
    const { open } = this.state
    const { color } = this.props
    return (
      <Wrapper>
        <Button onClick={this.togglePicker} style={{ background: color }} />
        {open && (
          <PopOver>
            <Cover onClick={this.togglePicker} />
            <ChromePicker
              disableAlpha
              color={color}
              onChange={this.handleColorChange}
            />
          </PopOver>
        )}
      </Wrapper>
    )
  }

  togglePicker = () => {
    this.setState(({ open }) => ({ open: !open }))
  }

  handleColorChange = ({ hex }) => {
    const { onChange } = this.props
    if (onChange) onChange(hex)
  }
}

ColorPicker.defaultProps = { color: "white" }

export default ColorPicker
