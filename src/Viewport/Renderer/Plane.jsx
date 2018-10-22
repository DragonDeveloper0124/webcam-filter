import { Component } from "react"
import { connect } from "react-redux"

import { PlaneGeometry, ShaderMaterial, Mesh } from "three"
import shader from "./shader"

class Plane extends Component {
  constructor(props) {
    super(props)
    this.gridSize = -1
    this.geo = null
    this.mesh = null
  }

  componentDidMount() {
    this.createPlane()
  }

  render() {
    return null
  }

  componentDidUpdate() {
    const { gridSize } = this.props
    if (this.gridSize !== gridSize) {
      this.updateGeo()
      this.gridSize = gridSize
    }
  }

  createPlane() {
    const { onMeshCreated, colorTex, dispTex, wireframe } = this.props

    const geo = this.createGeo()
    this.geo = geo
    const mat = new ShaderMaterial({
      uniforms: {
        colorTex: { type: "t", value: colorTex },
        dispTex: { type: "t", value: dispTex },
        dispAmt: { type: "f", value: 3 }
      },
      vertexShader: shader.vert,
      fragmentShader: shader.frag,
      wireframe
    })

    const mesh = new Mesh(geo, mat)
    mesh.scale.x = -1
    if (wireframe) mesh.position.z = 0.01
    this.mesh = mesh

    geo.dispose()

    if (onMeshCreated) onMeshCreated(mesh)
  }

  updateGeo() {
    const geo = this.mesh.geometry
    this.mesh.geometry = this.createGeo()
    geo.dispose()
  }

  createGeo() {
    const { size, gridSize } = this.props
    return new PlaneGeometry(size, size, gridSize, gridSize)
  }
}

Plane.defaultProps = {
  wireframe: false
}

const mapStateToProps = state => ({
  gridSize: state.main.resolution
})

export default connect(mapStateToProps)(Plane)
