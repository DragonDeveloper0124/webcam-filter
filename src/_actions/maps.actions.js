import { mapsConstants } from "../_constants"

const registerVideoMap = map => ({
  type: mapsConstants.REGISTER_VIDEO_MAP,
  map,
})

const registerDispMap = map => ({
  type: mapsConstants.REGISTER_DISP_MAP,
  map,
})

const registerGradientMap = map => ({
  type: mapsConstants.REGISTER_GRADIENT_MAP,
  map,
})

const modifyGradient = colors => ({
  type: mapsConstants.MODIFY_GRADIENT,
  colors,
})

export const mapsActions = {
  modifyGradient,
  registerVideoMap,
  registerDispMap,
  registerGradientMap,
}
