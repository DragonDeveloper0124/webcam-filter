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
    const {
      resolution,
      meshes,
      gradients,
      backgroundColor,
      planeTexId
    } = this.props

    const wireframeGradient = gradients.find(({ id }) => id === "wireframe")
    const planeGradient = gradients.find(({ id }) => id === "plane")

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
              <Button
                key={i}
                active={visible}
                onClick={this.toggleVisibility}
                value={id}
              >
                {title}
              </Button>
            ))}
        </Section>
        <Section title="Color">
          <GradientPicker
            id="backgroundColor"
            label="Background"
            colors={[backgroundColor]}
            defaultColors={["#000000"]}
            onChange={this.handleBackgroundChange}
          />
          {wireframeGradient && (
            <GradientPicker
              id="wireframe"
              label="Wireframe"
              colors={wireframeGradient.colors}
              defaultColors={["#00ffff", "#ff00ff"]}
              onChange={this.handleGradientChange}
            />
          )}
          {planeGradient && (
            <GradientPicker
              id="plane"
              label="Plane"
              colors={planeGradient.colors}
              defaultColors={["#303030", "#303030"]}
              onChange={this.handleGradientChange}
            />
          )}
          {/*gradients &&
            gradients.map(({ id, label, colors }, i) => (
              <GradientPicker
                key={i}
                id={id}
                colors={colors}
                label={label}
                onChange={this.handleGradientChange}
              />
            ))*/}
        </Section>
        <Section title="Plane Texture">
          <Select value={planeTexId} onChange={this.handlePlaneTexChange}>
            <Option value="plane" selected>
              Color
            </Option>
            <Option value="video">Video</Option>
          </Select>
        </Section>
      </Wrapper>
    )
  }

  handleResolutionChange = value => {
    this.props.dispatch(mainActions.setResolution(value))
  }

  handleGradientChange = color => {
    this.props.dispatch(mainActions.modifyGradient(color))
  }

  handleBackgroundChange = ({ hex }) => {
    this.props.dispatch(mainActions.setBackgroundColor(hex))
  }

  handlePlaneTexChange = value => {
    this.props.dispatch(mainActions.setPlaneTexture(value))
  }

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
    if (innerWidth < breakPoint && this.lastWindowWidth >= breakPoint)
      this.setState({ open: false })
    this.lastWindowWidth = innerWidth
  }

  toggleUI = () => {
    this.setState(({ open }) => ({ open: !open }))
  }
}

const mapStateToProps = ({ main }) => {
  const { resolution, meshes, gradients, backgroundColor, planeTexId } = main
  return { resolution, meshes, gradients, backgroundColor, planeTexId }
}

export default connect(mapStateToProps)(UI)
