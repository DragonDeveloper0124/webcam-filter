import { mainConstants } from "../_constants"

const { SET_RESOLUTION, REGISTER_MAP } = mainConstants

const initState = {
  resolution: 16,
  textureMaps: []
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
    default:
      return state
  }
}
