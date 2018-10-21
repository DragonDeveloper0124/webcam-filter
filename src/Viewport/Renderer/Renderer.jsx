import React, { Component } from "react"
import styled from "styled-components"
import { connect } from "react-redux"
import Plane from "./Plane"
import {
  Scene,
  WebGLRenderer,
  PerspectiveCamera,
  Texture,
  Object3D
} from "three"

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
`

const Canvas = styled.canvas`
  position: absolute;
  top: 0;
  left: 0;
`

class Renderer extends Component {
  constructor(props) {
    super(props)

    this.setWrapperRef = el => {
      this.wrapper = el
    }

    this.setCanvasRef = el => {
      this.canvas = el
    }

    this.addMeshToScene = mesh => {
      this.scene.add(mesh)
    }

    this.state = {
      width: 1280,
      height: 720,
      mounted: false,
      worldSize: 10,
      camDistance: 1.4,
      camRotationAmount: 0.0002,
      camRotationDamp: 0.95
    }

    this.scene = null
    this.renderer = null
    this.cam = null
    this.camCtrl = null
    this.tex = null
    this.videoPlane = null
    this.textures = []
    this.mousePos = null
  }

  componentDidMount() {
    window.addEventListener("resize", this.updateSize)
    window.addEventListener("mousemove", this.rotateCam)
    this.init()
    this.renderLoop()
    this.setState({ mounted: true })
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateSize)
    window.removeEventListener("mousemove", this.rotateCam)
  }

  render() {
    const { mounted, worldSize } = this.state
    if (mounted) this.updateCam()

    return (
      <Wrapper innerRef={this.setWrapperRef} id="renderer">
        <Canvas innerRef={this.setCanvasRef} />
        {mounted && (
          <React.Fragment>
            <Plane
              size={worldSize}
              colorTex={this.getTexture("video")}
              dispTex={this.getTexture("diff")}
              onMeshCreated={this.addMeshToScene}
            />
            <Plane
              size={worldSize}
              colorTex={this.getTexture("gradient")}
              dispTex={this.getTexture("diff")}
              wireframe={true}
              onMeshCreated={this.addMeshToScene}
            />
          </React.Fragment>
        )}
      </Wrapper>
    )
  }

  getTexture(id) {
    let tex = this.textures.find(tex => tex.id === id)
    if (!tex) {
      const map = this.props.maps.find(map => map.id === id).media
      tex = { id, value: new Texture(map) }
      this.textures.push(tex)
    }
    return tex.value
  }

  renderLoop = () => {
    for (let i = 0; i < this.textures.length; i++)
      this.textures[i].value.needsUpdate = true

    this.renderer.render(this.scene, this.cam)
    this.dampCamRotation()
    requestAnimationFrame(this.renderLoop)
  }

  init() {
    const { canvas } = this
    this.scene = new Scene()
    this.renderer = new WebGLRenderer({ antialias: true, canvas })
    this.renderer.setClearColor(0x000000, 1)

    this.cam = new PerspectiveCamera(45, 1, 1, 1000)
    this.cam.position.z = 1
    this.camCtrl = new Object3D()
    this.camCtrl.add(this.cam)
    this.scene.add(this.camCtrl)

    this.updateSize()
  }

  updateCam() {
    const { width, height, worldSize, camDistance } = this.state
    const aspect = width / height
    const def = worldSize * camDistance
    this.cam.position.z = aspect < 1 ? def / aspect : def
  }

  updateSize = () => {
    const { clientWidth, clientHeight } = this.wrapper
    this.setState(
      {
        width: clientWidth,
        height: clientHeight
      },
      () => {
        const { width, height } = this.state
        this.cam.aspect = width / height
        this.cam.updateProjectionMatrix()
        this.renderer.setSize(width, height)
      }
    )
  }

  rotateCam = ({ clientX, clientY }) => {
    const { mousePos } = this
    const { camRotationAmount } = this.state
    if (mousePos) {
      this.camCtrl.rotation.x += (mousePos.y - clientY) * camRotationAmount
      this.camCtrl.rotation.y += (mousePos.x - clientX) * camRotationAmount
    }
    this.mousePos = { x: clientX, y: clientY }
  }

  dampCamRotation() {
    const { camRotationDamp } = this.state
    this.camCtrl.rotation.x *= camRotationDamp
    this.camCtrl.rotation.y *= camRotationDamp
  }
}

const mapStateToProps = state => ({
  gridSize: state.main.resolution,
  wireframeEnabled: state.main.wireframeEnabled
})

export default connect(mapStateToProps)(Renderer)
