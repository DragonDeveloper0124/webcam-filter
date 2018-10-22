import { createStore } from "redux"
import reducer from "../_reducers"

const store = createStore(reducer)

export { store }
