import { createStore } from "redux"
import reducer from "../_reducers"

console.log("message:", process.env.MESSAGE)

const store = createStore(reducer)

export { store }
