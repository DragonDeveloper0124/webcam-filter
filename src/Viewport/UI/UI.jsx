import React, { Component } from "react"
import styled from "styled-components"
import { darken } from "polished"
import Section from "./Section"
import ResolutionSetting from "./ResolutionSetting"
import MenuButton from "./MenuButton"
import { sizes } from "../../style"

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
      breakPoint: sizes.lg
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
    return (
      <Wrapper id="ui" open={open}>
        <MenuButton onClick={this.toggleUI} open={open} />
        <Section title="Resolution">
          <ResolutionSetting />
        </Section>
      </Wrapper>
    )
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

export default UI
