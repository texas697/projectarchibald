import { put, takeEvery, call, take } from 'redux-saga/effects'
import { eventChannel } from 'redux-saga'
import * as config from '../../../config/index'
import * as utils from '../../../utils/index'
import * as types from '../../../types/index'
import * as actions from './action'
import {firebaseApp} from '../../../redux/store'
import {PATH_COACH} from './config'
import * as teamsUtils from '../../../modules/Teams/utils'
import {addTeamsRequest} from '../../../modules/Teams/action'

const _post = model => firebaseApp.database().ref().child(`${PATH_COACH}/${model.id}`).update(model)
const _delete = id => firebaseApp.database().ref().child(`${PATH_COACH}/${id}`).set(null)

const _fetchById = id => {
  return firebaseApp.database().ref(`${PATH_COACH}/${id}`)
    .once('value').then(snapshot => {
      if (snapshot.val()) return snapshot.val()
      else return {}
    })
}

const createChannel = () => {
  const listener = eventChannel(
    emit => {
      firebaseApp.database().ref(`${PATH_COACH}`).on('value', snapshot => {
        emit(snapshot.val() || {})
      })
      return () => firebaseApp.database().ref(`${PATH_COACH}`).off(listener)
    }
  )
  return listener
}

function * _addRequest (action) {
  try {
    const res = yield call(_post, action.model)
    const _model = yield teamsUtils.buildModel()
    yield put(addTeamsRequest(_model))
    yield put(actions.addCoachSuccess(res))
  } catch (error) {
    yield put(actions.addCoachFailure(error))
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
      yield put(actions.fetchCoachSuccess(data, options))
    } catch (error) {
      yield put(actions.fetchCoachFailure(error))
    }
  }
}

function * _fetchByIdRequest (action) {
  try {
    const res = yield call(_fetchById, action.id)
    yield put(actions.fetchCoachByIdSuccess(res))
  } catch (error) {
    yield put(actions.fetchCoachByIdFailure(error))
  }
}

function * _deleteRequest (action) {
  try {
    const res = yield call(_delete, action.id)
    yield put(actions.deleteCoachSuccess(res))
  } catch (error) {
    yield put(actions.deleteCoachFailure(error))
  }
}

export default function * () {
  yield takeEvery(types.COACH_ADD_REQUEST, _addRequest)
  yield takeEvery(types.COACH_FETCH_REQUEST, _fetchRequest)
  yield takeEvery(types.COACH_DELETE_REQUEST, _deleteRequest)
  yield takeEvery(types.COACH_BY_ID_FETCH_REQUEST, _fetchByIdRequest)
}
