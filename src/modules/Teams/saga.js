import { put, takeEvery, call, take } from 'redux-saga/effects'
import { eventChannel } from 'redux-saga'
import * as types from '../../types/index'
import * as actions from './action'
import {firebaseApp} from '../../redux/store'

const PATH = 'teams'

const _post = model => firebaseApp.database().ref().child(`${PATH}/${model.id}`).update(model)

const createChannel = uid => {
  const listener = eventChannel(
    emit => {
      firebaseApp.database().ref(`${PATH}/${uid}`).once('value', snapshot => {
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
    yield put(actions.addTeamsSuccess(res))
  } catch (error) {
    yield put(actions.addTeamsFailure(error))
  }
}

function * _fetchRequest (action) {
  const channel = createChannel(action.uid)
  while (true) {
    try {
      let data = yield take(channel)
      data = Object.values(data)
      yield put(actions.fetchTeamsSuccess(data))
    } catch (error) {
      yield put(actions.fetchTeamsFailure(error))
    }
  }
}

export default function * () {
  yield takeEvery(types.TEAMS_ADD_REQUEST, _addRequest)
  yield takeEvery(types.TEAMS_FETCH_REQUEST, _fetchRequest)
}
