import React, { Component } from "react"
import { connect } from "react-redux"
import {
  Scene,
  WebGLRenderer,
  PerspectiveCamera,
  Texture,
  PlaneGeometry,
  MeshBasicMaterial,
  Mesh,
  Object3D,
  DoubleSide,
  LinearFilter,
  Euler
} from "three"

class Renderer extends Component {
  constructor(props) {
    super(props)
    this.setCanvasRef = el => {
      this.canvas = el
    }
    this.state = {
      width: 1280,
      height: 720,
      mounted: false,
      worldSize: 10,
      camDistance: 1.4,
      camRotationAmount: 0.0002,
      camRotationDamp: 0.1,
      camTargetRotation: null
    }
    this.scene = null
    this.renderer = null
    this.cam = null
    this.camCtrl = null
    this.tex = null
    this.videoPlane = null
  }

  componentDidMount() {
    window.addEventListener("resize", this.updateSize)
    window.addEventListener("mousemove", this.updateCamRotation)
    this.init()
    this.setup()
    this.renderLoop()
    this.setState({ mounted: true })
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateSize)
    window.removeEventListener("mousemove", this.updateCamRotation)
  }

  render() {
    const { mounted } = this.state

    if (mounted) this.updateCam()

    return <canvas ref={this.setCanvasRef} />
  }

  renderLoop = () => {
    this.tex.needsUpdate = true
    this.renderer.render(this.scene, this.cam)
    this.rotateCam()
    requestAnimationFrame(this.renderLoop)
  }

  init() {
    const { canvas } = this
    this.scene = new Scene()
    this.renderer = new WebGLRenderer({ antialias: true, canvas })

    this.cam = new PerspectiveCamera(45, 1, 1, 1000)
    this.cam.position.z = 1
    this.camCtrl = new Object3D()
    this.camCtrl.add(this.cam)
    this.scene.add(this.camCtrl)

    this.updateSize()
  }

  setup() {
    const { worldSize } = this.state
    const { media, gridSize } = this.props
    this.tex = new Texture(media)
    this.tex.minFilter = LinearFilter
    this.tex.magFilter = LinearFilter
    const geo = new PlaneGeometry(worldSize, worldSize, gridSize, gridSize)
    const mat = new MeshBasicMaterial({
      map: this.tex,
      side: DoubleSide,
      wireframe: false
    })
    this.videoPlane = new Mesh(geo, mat)
    this.scene.add(this.videoPlane)
    this.videoPlane.scale.x = -1
  }

  updateCam() {
    const { width, height, worldSize, camDistance } = this.state
    const aspect = width / height
    const def = worldSize * camDistance
    this.cam.position.z = aspect < 1 ? def / aspect : def
  }

  updateSize = () => {
    this.setState(
      {
        width: window.innerWidth,
        height: window.innerHeight
      },
      () => {
        const { width, height } = this.state
        this.cam.aspect = width / height
        this.cam.updateProjectionMatrix()
        this.renderer.setSize(width, height)
      }
    )
  }

  updateCamRotation = ({ clientX, clientY }) => {
    const { width, height, camRotationAmount } = this.state
    this.setState({
      camTargetRotation: {
        x: (clientY - height / 2) * camRotationAmount,
        y: (clientX - width / 2) * camRotationAmount
      }
    })
  }

  rotateCam() {
    const { camTargetRotation, camRotationDamp } = this.state
    if (camTargetRotation) {
      const { x, y } = this.camCtrl.rotation
      this.camCtrl.rotation.x += (camTargetRotation.x - x) * camRotationDamp
      this.camCtrl.rotation.y += (camTargetRotation.y - y) * camRotationDamp
    }
  }
}

const mapStateToProps = state => ({
  gridSize: state.main.resolution
})

export default connect(mapStateToProps)(Renderer)
