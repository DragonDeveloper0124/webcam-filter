import { mainConstants } from "../_constants"

const { SET_RESOLUTION } = mainConstants

const initState = {
  resolution: 16
}

export default (state = initState, action) => {
  switch (action.type) {
    case SET_RESOLUTION:
      return {
        ...state,
        resolution: action.resolution
      }
    default:
      return state
  }
}
