import React, { Component } from "react"
import { connect } from "react-redux"
import styled from "styled-components"
import { darken } from "polished"
import Section from "./Section"
import MenuButton from "./MenuButton"
import Button from "./Button"
import GradientPicker from "./GradientPicker"
import { Select, Option } from "./Select"
import { sizes } from "../../style"
import { mainActions, mapsActions } from "../../_actions"

const Wrapper = styled.div`
  max-width: 16rem;
  height: 100%;
  color: ${({ theme }) => theme.fontColor};
  padding: 1rem 1.6rem;
  background: linear-gradient(to right, ${({ theme }) => theme.bgColor} 0%, ${({ theme }) => darken(0.08, theme.bgColor)} 100%);
  line-height: normal;
  transition: 0.5s ease transform;
  position: absolute;
  transform: ${({ open }) => (open ? "translate(0)" : "translate(16rem)")};
  right: 0;
`

class UI extends Component {
  constructor(props) {
    super(props)

    this.state = {
      open: false,
      breakPoint: sizes.md,
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
    const { resolution, meshes, backgroundColor, gradientColors } = this.props

    return (
      <Wrapper id="ui" open={open}>
        <MenuButton onClick={this.toggleUI} open={open} />
        <Section title="Resolution">
          <Select value={resolution} onChange={this.handleResolutionChange}>
            <Option value={8} />
            <Option value={16} />
            <Option value={32} selected />
            <Option value={64} />
            <Option value={128} />
          </Select>
        </Section>
        <Section title="Visibility">
          {meshes &&
            meshes.map(({ id, title, visible }, i) => (
              <Button key={i} active={visible} onClick={this.toggleVisibility} value={id}>
                {title}
              </Button>
            ))}
        </Section>
        <Section title="Color">
          <GradientPicker label="Background" colors={[backgroundColor]} onChange={this.handleBackgroundChange} />
          <GradientPicker label="Wireframe" colors={gradientColors} onChange={this.handleGradientChange} />
        </Section>
      </Wrapper>
    )
  }

  handleResolutionChange = value => this.props.dispatch(mainActions.setResolution(value))

  handleGradientChange = colors => this.props.dispatch(mapsActions.modifyGradient(colors))

  handleBackgroundChange = colors => this.props.dispatch(mainActions.setBackgroundColor(colors[0]))

  toggleVisibility = id => {
    const { meshes } = this.props
    const visible = !meshes.find(mesh => mesh.id === id).visible
    this.props.dispatch(mainActions.modifyMesh({ id, visible }))
  }

  toggleWireframe = () => {
    const { dispatch, wireframeEnabled } = this.props
    dispatch(mainActions.setWireframe(!wireframeEnabled))
  }

  autoClose = () => {
    const { innerWidth } = window
    const { breakPoint } = this.state
    if (innerWidth < breakPoint && this.lastWindowWidth >= breakPoint) this.setState({ open: false })
    this.lastWindowWidth = innerWidth
  }

  toggleUI = () => {
    this.setState(({ open }) => ({ open: !open }))
  }
}

const mapStateToProps = ({ main, maps }) => {
  const { resolution, meshes, backgroundColor } = main
  const { gradientColors } = maps
  return { resolution, meshes, backgroundColor, gradientColors }
}

export default connect(mapStateToProps)(UI)
