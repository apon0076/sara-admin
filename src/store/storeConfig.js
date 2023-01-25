// import { applyMiddleware, createStore, compose } from "redux"
// import thunk from "redux-thunk"
// import logger from "redux-logger"
// import { composeWithDevTools } from "redux-devtools-extension"
// import rootReducer from "./../reducers/index"

// // Do not integrate Redux Devtools in Production
// let composer
// if (process.env.NODE_ENV === "development") {
//   // composer = composeWithDevTools
//   let middleware = []
//   if (process.env.NODE_ENV === "development") {
//     middleware = [...middleware, thunk, logger]
//   } else {
//     middleware = [...middleware, thunk]
//   }
// } else {
//   composer = compose
// }

// //

// const store = createStore(rootReducer, compose(applyMiddleware(...middleware)))

// //

// //const store = createStore(rootReducer, composer(applyMiddleware(thunk, logger)))

// export default store

import { createStore, applyMiddleware, compose } from "redux"
import thunk from "redux-thunk"
// import logger from "redux-logger"
import rootReducer from "./reducers/index"

let middleware = []
if (process.env.NODE_ENV === "development") {
  // middleware = [...middleware, thunk, logger]
  middleware = [...middleware, thunk]
} else {
  middleware = [...middleware, thunk]
}

export default createStore(rootReducer, compose(applyMiddleware(...middleware)))
