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
  }

  componentDidMount() {
    const { dispatch, id, title, visible } = this.props
    this.createPlane()
    dispatch(mainActions.registerMesh({ id, title, visible }))
  }

  render() {
    return null
  }

  componentDidUpdate() {
    const { gridSize, options } = this.props
    if (options) this.mesh.visible = options.visible || false
    if (this.gridSize !== gridSize) {
      this.updateGeo()
      this.gridSize = gridSize
    }
  }

  createPlane() {
    const { onMeshCreated, colorTex, dispTex, wireframe } = this.props

    const geo = this.createGeo()
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

const mapStateToProps = (state, props) => ({
  gridSize: state.main.resolution,
  meshes: state.main.meshes,
  options: state.main.meshes.find(mesh => mesh.id === props.id)
})

export default connect(mapStateToProps)(Plane)
