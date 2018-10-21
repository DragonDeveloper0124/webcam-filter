import React, { Component } from "react"
import { connect } from "react-redux"
import styled from "styled-components"
import { darken } from "polished"
import { mainActions } from "../../_actions"

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-flow: row nowrap;
`

const Button = styled.button`
  padding: 0.25rem 0.5rem;
  color: #f0f0f0;
  border: 0;
  cursor: pointer;
  transition: 0.2s ease background-color;
  &:not(:last-child) {
    margin-right: 0.5rem;
  }
  &:hover {
    background-color: ${darken(0.2, "#00b0b0")};
  }
  outline: none !important;
  background-color: ${({ active }) =>
    active ? "#00b0b0 !important" : "#404040"};
`

const Option = ({ value, active, onClick }) => (
  <Button
    active={active}
    onClick={() => {
      onClick(value)
    }}
  >
    {value}
  </Button>
)

class ResolutionSetting extends Component {
  constructor(props) {
    super(props)

    this.state = {
      options: [8, 16, 32, 64]
    }
  }

  render() {
    return <Wrapper>{this.renderOptions()}</Wrapper>
  }

  renderOptions() {
    const { options } = this.state
    const { resolution } = this.props
    return options.map((value, i) => (
      <Option
        key={i}
        active={value === resolution}
        value={value}
        onClick={this.setResolution}
      />
    ))
  }

  setResolution = resolution => {
    this.props.dispatch(mainActions.setResolution(resolution))
  }
}

const mapStateToProps = state => ({
  resolution: state.main.resolution
})

export default connect(mapStateToProps)(ResolutionSetting)
