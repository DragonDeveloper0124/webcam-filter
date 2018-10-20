import React, { Component } from "react"
import { connect } from "react-redux"
import {
  Scene,
  WebGLRenderer,
  PerspectiveCamera,
  Texture,
  PlaneGeometry,
  ShaderMaterial,
  Mesh,
  Object3D,
  NearestFilter
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
    this.setup()
    this.renderLoop()
    this.setState({ mounted: true })
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateSize)
    window.removeEventListener("mousemove", this.rotateCam)
  }

  render() {
    const { mounted } = this.state

    if (mounted) this.updateCam()

    return <canvas ref={this.setCanvasRef} />
  }

  renderLoop = () => {
    for (let i = 0; i < this.textures.length; i++)
      this.textures[i].needsUpdate = true

    this.renderer.render(this.scene, this.cam)
    this.dampCamRotation()
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
    const { gridSize, maps } = this.props

    const geo = new PlaneGeometry(
      worldSize,
      worldSize,
      gridSize + 1,
      gridSize + 1
    )

    const videoMap = maps.find(({ id }) => id === "video").media
    const videoTex = new Texture(videoMap)
    this.textures.push(videoTex)

    const dispMap = maps.find(({ id }) => id === "diff").media
    dispMap.minFilter = NearestFilter
    dispMap.magFilter = NearestFilter
    const dispTex = new Texture(dispMap)
    this.textures.push(dispTex)

    const gradientMap = maps.find(({ id }) => id === "gradient").media
    const gradientTex = new Texture(gradientMap)
    this.textures.push(gradientTex)

    const uniforms = colorTex => ({
      colorTex: { type: "t", value: colorTex },
      dispTex: { type: "t", value: dispTex },
      dispAmt: { type: "f", value: 3 }
    })

    const vert = `
      varying vec2 vUv;
      uniform sampler2D dispTex;
      uniform float dispAmt;
      void main() {
        vUv = uv;
        vec4 col = texture2D(dispTex, uv);
        float amt = sqrt(col.x * col.x + col.y * col.y + col.z * col.z);
        vec3 disp = vec3(0, 0, amt * dispAmt);
        gl_Position = projectionMatrix *
          modelViewMatrix *
          vec4(position + disp, 1.0);
      }
    `

    const frag = `
      varying vec2 vUv;
      uniform sampler2D colorTex;
      void main() {
        gl_FragColor = texture2D(colorTex, vUv);
      }
    `

    const videoMat = new ShaderMaterial({
      uniforms: uniforms(videoTex),
      vertexShader: vert,
      fragmentShader: frag,
      wireframe: false
    })
    videoMat.visible = false

    const wireframeMat = new ShaderMaterial({
      uniforms: uniforms(gradientTex),
      vertexShader: vert,
      fragmentShader: frag,
      wireframe: true
    })

    this.videoPlane = new Mesh(geo, videoMat)
    this.scene.add(this.videoPlane)

    this.wireframePlane = new Mesh(geo, wireframeMat)
    this.scene.add(this.wireframePlane)

    this.videoPlane.scale.x = -1

    this.wireframePlane.position.z = 0.01
    this.wireframePlane.scale.x = -1
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
  gridSize: state.main.resolution
})

export default connect(mapStateToProps)(Renderer)
