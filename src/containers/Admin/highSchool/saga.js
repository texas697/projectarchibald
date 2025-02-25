import { put, takeEvery, call, take } from 'redux-saga/effects'
import { eventChannel } from 'redux-saga'
import * as config from '../../../config/index'
import * as utils from '../../../utils/index'
import * as types from '../../../types/index'
import * as actions from './action'
import {firebaseApp} from '../../../redux/store'
import {PATH_HS} from './config'
import * as teamsUtils from '../../../modules/Teams/utils'
import {addTeamsRequest} from '../../../modules/Teams/action'

const _delete = id => firebaseApp.database().ref().child(`${PATH_HS}`).orderByChild('id').equalTo(id).set(null)

const _post = model => {
  const newKey = firebaseApp.database().ref().child(PATH_HS).push().key
  const updates = {}
  updates[`/${PATH_HS}/${newKey}`] = model
  return firebaseApp.database().ref().update(updates)
}

const _fetchById = id => {
  return firebaseApp.database().ref(`${PATH_HS}`)
    .orderByChild('id').equalTo(id)
    .once('value').then(snapshot => {
      if (snapshot.val()) return snapshot.val()
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
    console.log(action.model, 'highschool')
    const _model = yield teamsUtils.buildModel()
    yield put(addTeamsRequest(_model))
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
