import { put, takeEvery, call, take, select } from 'redux-saga/effects'
import { eventChannel } from 'redux-saga'
import * as config from '../../../config/index'
import * as utils from '../../../utils/index'
import * as types from '../../../types/index'
import * as actions from './action'
import {firebaseApp} from '../../../redux/store'

const PATH = 'highschool'

const _post = (teamId, model) => {
  const newKey = firebaseApp.database().ref().child(PATH).push().key

  const updates = {}
  updates[`/${PATH}/` + newKey] = model
  updates[`/team-${PATH}/${teamId}/${newKey}`] = model

  return firebaseApp.database().ref().update(updates)
}

const _delete = id => firebaseApp.database().ref().child(`${PATH}/${id}`).set(null)

const createChannel = () => {
  const listener = eventChannel(
    emit => {
      firebaseApp.database().ref(`${PATH}`).on('value', snapshot => {
        emit(snapshot.val() || {})
      })
      return () => firebaseApp.database().ref(`${PATH}`).off(listener)
    }
  )
  return listener
}

function * _addRequest (action) {
  try {
    const state = yield select()
    const teamId = state.adminTeam.get('id')
    const res = yield call(_post, teamId, action.model)
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
}
