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

export const mainActions = {
  setResolution,
  registerMap,
  registerMesh,
  modifyMesh
}
