import { createStore, applyMiddleware, compose } from 'redux'
import createSagaMiddleware from 'redux-saga'
import * as firebase from 'firebase'
import rootReducer from './reducers'
import rootSaga from './sagas'

import * as config from '../config'

export const firebaseApp = firebase.initializeApp(config.FIREBASE_CONFIG)
const sagaMiddleware = createSagaMiddleware()

const initialState = {}
const enhancers = []
const middleware = [
  sagaMiddleware
]

const composedEnhancers = compose(
  applyMiddleware(...middleware),
  ...enhancers
)

const store = createStore(
  rootReducer,
  initialState,
  composedEnhancers
)

sagaMiddleware.run(rootSaga)
export default store
