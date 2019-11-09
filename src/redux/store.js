import { applyMiddleware, createStore } from 'redux'
import { createLogger } from 'redux-logger'

import rootReducer from './rootReducer'

const logger = createLogger()

// const middlewares = [logger]
const middlewares = []

export const store = createStore(rootReducer, applyMiddleware(...middlewares))
