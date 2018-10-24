import { Component } from "react"
import { connect } from "react-redux"
import { mainActions } from "../../_actions"

import { PlaneGeometry, ShaderMaterial, Mesh } from "three"
import shader from "./shader"

class Plane extends Component {
  constructor(props) {
    super(props)
    this.gridSize = -1
    this.geo = null
    this.mesh = null
    this.tex = null
  }

  componentDidMount() {
    const { dispatch, id, label, visible, onMeshCreated } = this.props
    this.mesh = this.createPlane()
    if (onMeshCreated) onMeshCreated(this.mesh)

    dispatch(mainActions.registerMesh({ id, label, visible }))
  }

  render() {
    return null
  }

  componentDidUpdate() {
    const { colorTex, gridSize, meshes, id } = this.props
    const options = meshes.find(mesh => mesh.id === id)

    if (options) this.mesh.visible = options.visible || false

    if (this.gridSize !== gridSize) {
      this.updateGeo()
      this.gridSize = gridSize
    }

    if (this.tex !== colorTex) {
      this.mesh.material.uniforms.colorTex.value = colorTex
      this.tex = colorTex
    }
  }

  createPlane() {
    const { wireframe } = this.props

    const geo = this.createGeo()
    const mat = this.createMat()

    const mesh = new Mesh(geo, mat)
    mesh.scale.x = -1
    if (wireframe) mesh.position.z = 0.01

    return mesh
  }

  createMat() {
    const { colorTex, dispTex, wireframe } = this.props
    this.tex = colorTex
    return new ShaderMaterial({
      uniforms: {
        colorTex: { type: "t", value: colorTex },
        dispTex: { type: "t", value: dispTex },
        dispAmt: { type: "f", value: 3 }
      },
      vertexShader: shader.vert,
      fragmentShader: shader.frag,
      wireframe
    })
  }

  createGeo() {
    const { size, gridSize } = this.props
    return new PlaneGeometry(size, size, gridSize, gridSize)
  }

  updateGeo() {
    const geo = this.mesh.geometry
    this.mesh.geometry = this.createGeo()
    geo.dispose()
  }
}

Plane.defaultProps = {
  wireframe: false
}

const mapStateToProps = state => ({
  gridSize: state.main.resolution,
  meshes: state.main.meshes
})

export default connect(mapStateToProps)(Plane)
