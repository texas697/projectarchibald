import { put, takeEvery, call, take } from 'redux-saga/effects'
import { eventChannel } from 'redux-saga'
import * as types from '../../types/index'
import * as actions from './action'
import {firebaseApp} from '../../redux/store'

const PATH = 'teams'

const _post = model => firebaseApp.database().ref().child(`${PATH}/${model.teamId}`).update(model)

const _fetchById = id => {
  return firebaseApp.database().ref(`${PATH}/${id}`)
    .once('value').then(snapshot => {
      if (snapshot.val()) return Object.values(snapshot.val())
      else return {}
    })
}

const _fetchByCoachId = uid => {
  return firebaseApp.database().ref(PATH)
    .orderByChild('coachId').equalTo(uid)
    .once('value').then(snapshot => {
      if (snapshot.val()) return Object.values(snapshot.val())
      else return {}
    })
}

const createChannel = () => {
  const listener = eventChannel(
    emit => {
      firebaseApp.database().ref(`${PATH}`).once('value', snapshot => {
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

function * _fetchRequest () {
  const channel = createChannel()
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

function * _fetchByIdRequest (action) {
  try {
    const res = yield call(_fetchById, action.id)
    yield put(actions.fetchTeamsByIdSuccess(res))
  } catch (error) {
    yield put(actions.fetchTeamsByIdFailure(error))
  }
}

function * _fetchByCoachIdRequest (action) {
  try {
    const res = yield call(_fetchByCoachId, action.uid)
    yield put(actions.fetchTeamsByIdSuccess(res[0]))
  } catch (error) {
    yield put(actions.fetchTeamsByIdFailure(error))
  }
}

export default function * () {
  yield takeEvery(types.TEAMS_ADD_REQUEST, _addRequest)
  yield takeEvery(types.TEAMS_FETCH_REQUEST, _fetchRequest)
  yield takeEvery(types.TEAMS_BY_ID_FETCH_REQUEST, _fetchByIdRequest)
  yield takeEvery(types.TEAMS_BY_COACH_ID_FETCH_REQUEST, _fetchByCoachIdRequest)
}
