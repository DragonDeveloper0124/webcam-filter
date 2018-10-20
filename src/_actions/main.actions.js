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

export const mainActions = { setResolution, registerMap }
