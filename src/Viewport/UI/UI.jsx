import React, { Component } from "react"
import { connect } from "react-redux"
import styled from "styled-components"
import { darken } from "polished"
import Section from "./Section"
import MenuButton from "./MenuButton"
import { Select, Option } from "./Select"
import { sizes } from "../../style"
import { mainActions } from "../../_actions"

const Wrapper = styled.div`
  max-width: 16rem;
  height: 100%;
  color: ${({ theme }) => theme.fontColor};
  padding: 1rem 1.6rem;
  background: linear-gradient(
    to right,
    ${({ theme }) => theme.bgColor} 0%,
    ${({ theme }) => darken(0.08, theme.bgColor)} 100%
  );
  line-height: normal;
  transition: 0.2s ease transform;
  position: absolute;
  transform: ${({ open }) => (open ? "translate(0)" : "translate(16rem)")};
  right: 0;
`

class UI extends Component {
  constructor(props) {
    super(props)

    this.state = {
      open: false,
      breakPoint: sizes.md
    }

    this.lastWindowWidth = window.innerWidth
  }

  componentDidMount() {
    const { breakPoint } = this.state
    this.setState({ open: window.innerWidth >= breakPoint })
    window.addEventListener("resize", this.autoClose)
  }

  componentWillMount() {
    window.removeEventListener("resize", this.autoClose)
  }

  render() {
    const { open } = this.state
    const { resolution } = this.props
    return (
      <Wrapper id="ui" open={open}>
        <MenuButton onClick={this.toggleUI} open={open} />
        <Section title="Resolution">
          <Select value={resolution} onChange={this.handleResolutionChange}>
            <Option value={8} />
            <Option value={16} selected />
            <Option value={32} />
            <Option value={64} />
            <Option value={128} />
          </Select>
        </Section>
        <Section title="Visibility" />
      </Wrapper>
    )
  }

  handleResolutionChange = value => {
    this.props.dispatch(mainActions.setResolution(value))
  }

  autoClose = () => {
    const { innerWidth } = window
    const { breakPoint } = this.state
    if (innerWidth < breakPoint && this.lastWindowWidth >= breakPoint)
      this.setState({ open: false })
    this.lastWindowWidth = innerWidth
  }

  toggleUI = () => {
    this.setState(({ open }) => ({ open: !open }))
  }
}

const mapStateToProps = state => ({
  resolution: state.main.resolution
})

export default connect(mapStateToProps)(UI)
