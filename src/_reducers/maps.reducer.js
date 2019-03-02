import { mapsConstants } from "../_constants"

const { REGISTER_VIDEO_MAP, REGISTER_DISP_MAP, REGISTER_GRADIENT_MAP, MODIFY_GRADIENT } = mapsConstants

const initState = {
  videoMap: null,
  dispMap: null,
  gradientMap: null,
  gradientColors: ["#00ffff", "#ff00ff"],
}

export default (state = initState, action) => {
  switch (action.type) {
    case REGISTER_VIDEO_MAP:
      return {
        ...state,
        videoMap: action.map,
      }
    case REGISTER_DISP_MAP:
      return {
        ...state,
        dispMap: action.map,
      }
    case REGISTER_GRADIENT_MAP:
      return {
        ...state,
        gradientMap: action.map,
      }
    case MODIFY_GRADIENT:
      return {
        ...state,
        gradientColors: action.colors,
      }
    default:
      return state
  }
}
