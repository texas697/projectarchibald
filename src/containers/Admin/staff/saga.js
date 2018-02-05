import { put, takeEvery, call, take } from 'redux-saga/effects'
import { eventChannel } from 'redux-saga'
import * as utils from '../../../utils/index'
import * as types from '../../../types/index'
import * as actions from './action'
import {firebaseApp} from '../../../redux/store'
import {PATH_STAFF} from './config'
import * as teamsUtils from '../../../modules/Teams/utils'
import {addTeamsRequest} from '../../../modules/Teams/action'

const _post = model => firebaseApp.database().ref().child(`${PATH_STAFF}/${model.id}`).update(model)

const _delete = id => firebaseApp.database().ref().child(`${PATH_STAFF}/${id}`).set(null)

const _fetchById = id => {
  return firebaseApp.database().ref(`${PATH_STAFF}/${id}`)
    .once('value').then(snapshot => {
      if (snapshot.val()) return snapshot.val()
      else return {}
    })
}

const createChannel = teamId => {
  const listener = eventChannel(
    emit => {
      firebaseApp.database().ref(`${PATH_STAFF}`)
        .orderByChild('teamId').equalTo(teamId)
        .on('value', snapshot => {
          emit(snapshot.val() || {})
        })
      return () => firebaseApp.database().ref(`${PATH_STAFF}`).off(listener)
    }
  )
  return listener
}

function * _addRequest (action) {
  try {
    const res = yield call(_post, action.model)
    yield put(actions.addStaffSuccess(res))
    const _model = yield teamsUtils.buildModel()
    yield put(addTeamsRequest(_model))
  } catch (error) {
    yield put(actions.addStaffFailure(error))
  }
}

function * _fetchRequest (action) {
  const channel = createChannel(action.teamId)
  while (true) {
    try {
      let data = yield take(channel)
      data = Object.values(data)
      const options = utils.buildOptions(data)
      yield put(actions.fetchStaffSuccess(data, options))
    } catch (error) {
      yield put(actions.fetchStaffFailure(error))
    }
  }
}

function * _fetchByIdRequest (action) {
  try {
    const res = yield call(_fetchById, action.id)
    yield put(actions.fetchStaffByIdSuccess(res))
  } catch (error) {
    yield put(actions.fetchStaffByIdFailure(error))
  }
}

function * _deleteRequest (action) {
  try {
    const res = yield call(_delete, action.id)
    yield put(actions.deleteStaffSuccess(res))
    const _model = yield teamsUtils.buildModel()
    yield put(addTeamsRequest(_model))
  } catch (error) {
    yield put(actions.deleteStaffFailure(error))
  }
}

export default function * () {
  yield takeEvery(types.STAFF_ADD_REQUEST, _addRequest)
  yield takeEvery(types.STAFF_FETCH_REQUEST, _fetchRequest)
  yield takeEvery(types.STAFF_DELETE_REQUEST, _deleteRequest)
  yield takeEvery(types.STAFF_BY_ID_FETCH_REQUEST, _fetchByIdRequest)
}
