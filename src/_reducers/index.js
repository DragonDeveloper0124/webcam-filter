import { combineReducers } from "redux"
import main from "./main.reducer"
import maps from "./maps.reducer"

export default combineReducers({ main, maps })
