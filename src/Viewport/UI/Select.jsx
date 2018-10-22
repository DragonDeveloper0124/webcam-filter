import React, { Component } from "react"
import styled from "styled-components"
import Button from "./Button"

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-flow: row nowrap;
`

class Select extends Component {
  render() {
    const { children, value } = this.props

    return (
      <Wrapper>
        {React.Children.map(children, child =>
          React.cloneElement(child, {
            onClick: this.handleClick,
            selectedValue: value
          })
        )}
      </Wrapper>
    )
  }

  handleClick = value => {
    const { onChange } = this.props
    if (onChange) onChange(value)
  }
}

class Option extends Component {
  componentDidMount() {
    if (this.props.selected) this.handleClick()
  }

  render() {
    const { value, onClick, children, selectedValue } = this.props

    return (
      <Button value={value} onClick={onClick} active={value === selectedValue}>
        {children}
      </Button>
    )
  }

  handleClick = () => {
    const { onClick, value } = this.props
    if (onClick) onClick(value)
  }
}

export { Select, Option }
