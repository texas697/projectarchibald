import { put, takeEvery } from 'redux-saga/effects'
import * as types from '../../types'
import * as actions from './action'
import store, {firebaseApp} from '../../redux/store'

function * _loginRequest (action) {
  try {
    firebaseApp.auth().signInWithEmailAndPassword(action.credentials.email, action.credentials.password)
      .catch(error => {
        store.dispatch(actions.loginFailure(error))
      })
  } catch (error) {
    yield put(actions.loginFailure(error))
  }
}

function * _logoutRequest () {
  try {
    firebaseApp.auth().signOut().then(() => {
      store.dispatch(actions.logoutSuccess())
    }).catch(error => {
      store.dispatch(actions.logoutFailure(error))
    })
  } catch (error) {
    yield put(actions.logoutFailure(error))
  }
}

function * _resetRequest (action) {
  try {
    firebaseApp.auth().sendPasswordResetEmail(action.email).then(() => {
      store.dispatch(actions.resetPasswordSuccess())
    }).catch(error => {
      store.dispatch(actions.resetPasswordFailure(error))
    })
  } catch (error) {
    yield put(actions.resetPasswordFailure(error))
  }
}

export default function * () {
  yield takeEvery(types.LOGIN_REQUEST, _loginRequest)
  yield takeEvery(types.LOGOUT_REQUEST, _logoutRequest)
  yield takeEvery(types.RESET_PASSWORD_REQUEST, _resetRequest)
}
