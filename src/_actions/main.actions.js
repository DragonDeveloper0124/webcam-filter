import { mainConstants } from "../_constants"

const setResolution = resolution => ({
  type: mainConstants.SET_RESOLUTION,
  resolution,
})

const registerMesh = mesh => ({
  type: mainConstants.REGISTER_MESH,
  mesh,
})

const modifyMesh = modification => ({
  type: mainConstants.MODIFY_MESH,
  modification,
})

const setBackgroundColor = color => ({
  type: mainConstants.SET_BACKGROUND_COLOR,
  color,
})

export const mainActions = {
  setResolution,
  registerMesh,
  modifyMesh,
  setBackgroundColor,
}
