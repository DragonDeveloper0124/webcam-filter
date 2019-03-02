import { mainConstants } from "../_constants"

const { SET_RESOLUTION, REGISTER_MESH, MODIFY_MESH, SET_BACKGROUND_COLOR } = mainConstants

const initState = {
  resolution: 16,
  wireframeEnabled: true,
  meshes: [],
  backgroundColor: "#000000",
}

export default (state = initState, action) => {
  switch (action.type) {
    case SET_RESOLUTION:
      return {
        ...state,
        resolution: action.resolution,
      }
    case REGISTER_MESH:
      return {
        ...state,
        meshes: [...state.meshes, action.mesh],
      }
    case MODIFY_MESH:
      const { modification } = action
      const meshes = state.meshes.map(options => {
        if (options.id !== modification.id) return options
        return { ...options, ...modification }
      })
      return {
        ...state,
        meshes,
      }
    case SET_BACKGROUND_COLOR:
      return {
        ...state,
        backgroundColor: action.color,
      }
    default:
      return state
  }
}
