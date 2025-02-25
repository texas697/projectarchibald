import { put, takeEvery, call, take } from 'redux-saga/effects'
import { eventChannel } from 'redux-saga'
import * as types from '../../types/index'
import * as actions from './action'
import {firebaseApp} from '../../redux/store'

const PATH = 'roles'

const _post = model => {
  const newKey = firebaseApp.database().ref().child(PATH).push().key
  const updates = {}
  updates[`/${PATH}/${newKey}`] = model
  return firebaseApp.database().ref().update(updates)
}

const createChannel = uid => {
  const listener = eventChannel(
    emit => {
      firebaseApp.database().ref(`${PATH}`)
        .orderByChild('uid').equalTo(uid)
        .once('value', snapshot => {
          emit(snapshot.val() || {})
        })
      return () => firebaseApp.database().ref(`${PATH}`).off(listener)
    }
  )
  return listener
}

function * _addRequest (action) {
  try {
    const res = yield call(_post, action.model)
    yield put(actions.addRolesSuccess(res))
  } catch (error) {
    yield put(actions.addRolesFailure(error))
  }
}

function * _fetchRequest (action) {
  const channel = createChannel(action.uid)
  while (true) {
    try {
      let data = yield take(channel)
      data = Object.values(data)
      yield put(actions.fetchRolesSuccess(data))
    } catch (error) {
      yield put(actions.fetchRolesFailure(error))
    }
  }
}

export default function * () {
  yield takeEvery(types.ROLES_ADD_REQUEST, _addRequest)
  yield takeEvery(types.ROLES_FETCH_REQUEST, _fetchRequest)
}
