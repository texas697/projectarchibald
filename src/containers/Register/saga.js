import { put, takeEvery } from 'redux-saga/effects'
import { delay } from 'redux-saga'
import * as types from '../../types'
import * as actions from './action'
import store, {firebaseApp} from '../../redux/store'

function * _registerUserRequest (action) {
  try {
    firebaseApp.auth().createUserWithEmailAndPassword(action.credentials.email, action.credentials.password)
      .catch(error => {
        store.dispatch(actions.registerUserFailure(error))
      })
    yield delay(1000)
    yield put(actions.registerUserSuccess())
  } catch (error) {
    yield put(actions.registerUserFailure(error))
  }
}

export default function * () {
  yield takeEvery(types.REGISTER_USER_REQUEST, _registerUserRequest)
}
