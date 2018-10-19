import React, { Component } from "react"
import * as THREE from "three"
const OrbitControls = require("three-orbit-controls")(THREE)

const {
  Scene,
  WebGLRenderer,
  PerspectiveCamera,
  Texture,
  PlaneGeometry,
  MeshBasicMaterial,
  Mesh,
  DoubleSide
} = THREE

class Renderer extends Component {
  constructor(props) {
    super(props)
    this.setCanvasRef = el => {
      this.canvas = el
    }
    this.state = {
      width: 1280,
      height: 720
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
    this.init()
    this.renderLoop()
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateSize)
  }

  render() {
    const { width, height } = this.state

    if (this.cam) {
      const { gridSize } = this.props
      const aspect = width / height
      const def = gridSize * 1.205
      this.cam.position.z = aspect < 1 ? def / aspect : def
    }

    return (
      <canvas
        width={width}
        height={height}
        ref={this.setCanvasRef}
        style={{
          width: `${width}px`,
          height: `${height}px`
        }}
      />
    )
  }

  renderLoop = () => {
    this.tex.needsUpdate = true
    this.camCtrl.update()
    this.renderer.render(this.scene, this.cam)
    requestAnimationFrame(this.renderLoop)
  }

  init() {
    const { canvas } = this
    this.scene = new Scene()
    this.renderer = new WebGLRenderer({ antialias: true, canvas })
    this.setupCamera()
    this.updateSize()

    this.tex = new Texture(this.props.media)
    this.tex.minFilter = THREE.LinearFilter
    this.tex.magFilter = THREE.LinearFilter
    const { gridSize } = this.props
    const geo = new PlaneGeometry(gridSize, gridSize)
    const mat = new MeshBasicMaterial({
      map: this.tex,
      side: DoubleSide,
      wireframe: false
    })
    this.videoPlane = new Mesh(geo, mat)
    this.scene.add(this.videoPlane)
    this.videoPlane.scale.x = -1
  }

  setupCamera() {
    this.cam = new PerspectiveCamera(45, 1, 1, 1000)
    this.cam.position.z = this.props.gridSize * 1.3
    this.camCtrl = new OrbitControls(this.cam)
    this.camCtrl.enableZoom = false
    this.camCtrl.rotateSpeed = 0.1
    this.camCtrl.enableDamping = true
    this.camCtrl.dampingFactor = 0.2
    this.camCtrl.enabled = false
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
}

export default Renderer
