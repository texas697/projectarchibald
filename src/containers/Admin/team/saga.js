import { put, takeEvery, call, take } from 'redux-saga/effects'
import { eventChannel } from 'redux-saga'
import * as config from '../../../config/index'
import * as utils from '../../../utils/index'
import * as types from '../../../types/index'
import * as actions from './action'
import {firebaseApp} from '../../../redux/store'
import {PATH_TEAM} from './config'
import * as teamsUtils from '../../../modules/Teams/utils'
import {addTeamsRequest} from '../../../modules/Teams/action'

const _delete = id => firebaseApp.database().ref().child(`${PATH_TEAM}`).orderByChild('id').equalTo(id).set(null)

const _post = model => {
  const newKey = firebaseApp.database().ref().child(PATH_TEAM).push().key
  const updates = {}
  updates[`/${PATH_TEAM}/${newKey}`] = model
  return firebaseApp.database().ref().update(updates)
}

const _fetchById = id => {
  return firebaseApp.database().ref(`${PATH_TEAM}`)
    .orderByChild('id').equalTo(id)
    .once('value').then(snapshot => {
      if (snapshot.val()) return snapshot.val()
      else return {}
    })
}

const createChannel = () => {
  const listener = eventChannel(
    emit => {
      firebaseApp.database().ref(`${PATH_TEAM}`).on('value', snapshot => {
        emit(snapshot.val() || {})
      })
      return () => firebaseApp.database().ref(`${PATH_TEAM}`).off(listener)
    }
  )
  return listener
}

function * _addRequest (action) {
  try {
    const _model = yield teamsUtils.buildModel()
    yield put(addTeamsRequest(_model))
    const res = yield call(_post, action.model)
    yield put(actions.addTeamSuccess(res))
  } catch (error) {
    yield put(actions.addTeamFailure(error))
  }
}

function * _fetchRequest () {
  const channel = createChannel()
  while (true) {
    try {
      let data = yield take(channel)
      data = Object.values(data)
      const options = utils.buildOptions(data)
      options.unshift(config.EMPTY_OPTION)
      yield put(actions.fetchTeamSuccess(data, options))
    } catch (error) {
      yield put(actions.fetchTeamFailure(error))
    }
  }
}

function * _fetchByIdRequest (action) {
  try {
    const res = yield call(_fetchById, action.id)
    yield put(actions.fetchTeamByIdSuccess(res))
  } catch (error) {
    yield put(actions.fetchTeamByIdFailure(error))
  }
}

function * _deleteRequest (action) {
  try {
    const res = yield call(_delete, action.id)
    yield put(actions.deleteTeamSuccess(res))
  } catch (error) {
    yield put(actions.deleteTeamFailure(error))
  }
}

export default function * () {
  yield takeEvery(types.TEAM_ADD_REQUEST, _addRequest)
  yield takeEvery(types.TEAM_FETCH_REQUEST, _fetchRequest)
  yield takeEvery(types.TEAM_DELETE_REQUEST, _deleteRequest)
  yield takeEvery(types.TEAM_BY_ID_FETCH_REQUEST, _fetchByIdRequest)
}
