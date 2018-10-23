import { mainConstants } from "../_constants"

const {
  SET_RESOLUTION,
  REGISTER_MAP,
  REGISTER_MESH,
  MODIFY_MESH,
  REGISTER_GRADIENT,
  MODIFY_GRADIENT
} = mainConstants

const initState = {
  resolution: 16,
  textureMaps: [],
  wireframeEnabled: true,
  meshes: [],
  gradients: []
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
    case REGISTER_GRADIENT:
      return {
        ...state,
        gradients: [...state.gradients, action.gradient]
      }
    case MODIFY_GRADIENT:
      const { color } = action
      const gradients = state.gradients.map(gradient => {
        if (gradient.id !== color.id) return gradient
        const newGradient = { ...gradient }
        newGradient.colors[color.key] = color.hex
        return newGradient
      })
      return {
        ...state,
        gradients
      }
    default:
      return state
  }
}
