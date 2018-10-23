import { mainConstants } from "../_constants"

const setResolution = resolution => ({
  type: mainConstants.SET_RESOLUTION,
  resolution
})

const registerMap = (id, name, media) => ({
  type: mainConstants.REGISTER_MAP,
  map: {
    id,
    name,
    media
  }
})

const registerMesh = mesh => ({
  type: mainConstants.REGISTER_MESH,
  mesh
})

const modifyMesh = modification => ({
  type: mainConstants.MODIFY_MESH,
  modification
})

const registerGradient = (id, label, colors) => ({
  type: mainConstants.REGISTER_GRADIENT,
  gradient: { id, label, colors }
})

const modifyGradient = color => ({
  type: mainConstants.MODIFY_GRADIENT,
  color
})

export const mainActions = {
  setResolution,
  registerMap,
  registerMesh,
  modifyMesh,
  registerGradient,
  modifyGradient
}
