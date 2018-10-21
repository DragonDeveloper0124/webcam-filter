import { mainConstants } from "../_constants"

const { SET_RESOLUTION, REGISTER_MAP, SET_WIREFRAME } = mainConstants

const initState = {
  resolution: 16,
  textureMaps: [],
  wireframeEnabled: true
}

export default (state = initState, action) => {
  switch (action.type) {
    case SET_RESOLUTION:
      return {
        ...state,
        resolution: action.resolution
      }
    case REGISTER_MAP:
      return {
        ...state,
        textureMaps: [...state.textureMaps, action.map]
      }
    case SET_WIREFRAME:
      return {
        ...state,
        wireframeEnabled: action.isEnabled
      }
    default:
      return state
  }
}
