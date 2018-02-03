import { put, takeEvery, call, take, select } from 'redux-saga/effects'
import { eventChannel } from 'redux-saga'
import firebaseTime from 'firebase'
import * as config from '../../../config/index'
import * as utils from '../../../utils/index'
import * as types from '../../../types/index'
import * as actions from './action'
import {firebaseApp} from '../../../redux/store'
import {PATH_HS} from './config'

const _post = model => firebaseApp.database().ref().child(`${PATH_HS}/${model.id}`).update(model)
const _delete = id => firebaseApp.database().ref().child(`${PATH_HS}/${id}`).set(null)

const _fetchById = id => {
  return firebaseApp.database().ref(`${PATH_HS}/${id}`)
    .once('value').then(snapshot => {
      if (snapshot.val()) return Object.values(snapshot.val())
      else return {}
    })
}

const createChannel = () => {
  const listener = eventChannel(
    emit => {
      firebaseApp.database().ref(`${PATH_HS}`).on('value', snapshot => {
        emit(snapshot.val() || {})
      })
      return () => firebaseApp.database().ref(`${PATH_HS}`).off(listener)
    }
  )
  return listener
}

function * _addRequest (action) {
  try {
    const state = yield select()
    action.model.teamId = state.adminTeam.get('id')
    action.model.date = firebaseTime.database.ServerValue.TIMESTAMP
    const res = yield call(_post, action.model)
    yield put(actions.addHsSuccess(res))
  } catch (error) {
    yield put(actions.addHsFailure(error))
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
      yield put(actions.fetchHsSuccess(data, options))
    } catch (error) {
      yield put(actions.fetchHsFailure(error))
    }
  }
}

function * _fetchByIdRequest (action) {
  try {
    const res = yield call(_fetchById, action.id)
    yield put(actions.fetchHsByIdSuccess(res))
  } catch (error) {
    yield put(actions.fetchHsByIdFailure(error))
  }
}

function * _deleteRequest (action) {
  try {
    const res = yield call(_delete, action.id)
    yield put(actions.deleteHsSuccess(res))
  } catch (error) {
    yield put(actions.deleteHsFailure(error))
  }
}

export default function * () {
  yield takeEvery(types.HS_ADD_REQUEST, _addRequest)
  yield takeEvery(types.HS_FETCH_REQUEST, _fetchRequest)
  yield takeEvery(types.HS_DELETE_REQUEST, _deleteRequest)
  yield takeEvery(types.HS_BY_ID_FETCH_REQUEST, _fetchByIdRequest)
}
