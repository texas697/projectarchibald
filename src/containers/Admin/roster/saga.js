import { put, takeEvery, call, take } from 'redux-saga/effects'
import { eventChannel } from 'redux-saga'
import * as types from '../../../types/index'
import * as actions from './action'
import {firebaseApp} from '../../../redux/store'

const PATH = 'roster'

const _post = model => {
  const newKey = firebaseApp.database().ref().child(PATH).push().key
  const updates = {}
  updates[`/${PATH}/${newKey}`] = model
  return firebaseApp.database().ref().update(updates)
}

const _delete = teamId => firebaseApp.database().ref().child(`${PATH}`).orderByChild('teamId').equalTo(teamId).set(null)

const createChannel = (teamId) => {
  const listener = eventChannel(
    emit => {
      firebaseApp.database().ref(`${PATH}`)
        .orderByChild('teamId').equalTo(teamId)
        .on('value', snapshot => {
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
    yield put(actions.addRosterSuccess(res))
  } catch (error) {
    yield put(actions.addRosterFailure(error))
  }
}

function * _fetchRequest (action) {
  const channel = createChannel(action.teamId)
  while (true) {
    try {
      let data = yield take(channel)
      data = Object.values(data)
      yield put(actions.fetchRosterSuccess(data[0]))
    } catch (error) {
      yield put(actions.fetchRosterFailure(error))
    }
  }
}

function * _deleteRequest (action) {
  try {
    const res = yield call(_delete, action.teamId)
    yield put(actions.deleteRosterSuccess(res))
  } catch (error) {
    yield put(actions.deleteRosterFailure(error))
  }
}

export default function * () {
  yield takeEvery(types.ROSTER_ADD_REQUEST, _addRequest)
  yield takeEvery(types.ROSTER_FETCH_REQUEST, _fetchRequest)
  yield takeEvery(types.ROSTER_DELETE_REQUEST, _deleteRequest)
}
