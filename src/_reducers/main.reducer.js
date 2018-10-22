import { mainConstants } from "../_constants"

const {
  SET_RESOLUTION,
  REGISTER_MAP,
  REGISTER_MESH,
  MODIFY_MESH
} = mainConstants

const initState = {
  resolution: 16,
  textureMaps: [],
  wireframeEnabled: true,
  meshes: []
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
    case REGISTER_MESH:
      return {
        ...state,
        meshes: [...state.meshes, action.mesh]
      }
    case MODIFY_MESH:
      const { modification } = action
      const meshes = state.meshes.map(options => {
        if (options.id !== modification.id) return options
        return { ...options, ...modification }
      })
      return {
        ...state,
        meshes
      }
    default:
      return state
  }
}
