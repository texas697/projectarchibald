import { put, takeEvery, call, take, select } from 'redux-saga/effects'
import { eventChannel } from 'redux-saga'
import * as config from '../../../config/index'
import * as utils from '../../../utils/index'
import * as types from '../../../types/index'
import * as actions from './action'
import {firebaseApp} from '../../../redux/store'

const PATH = 'team'

const _post = (uid, model) => {
  const newKey = firebaseApp.database().ref().child(PATH).push().key

  const updates = {}
  updates[`/${PATH}/` + newKey] = model
  updates[`/coach-${PATH}/${uid}/${newKey}`] = model

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
    const uid = state.login.getIn(['data', 'uid'])
    const res = yield call(_post, uid, action.model)
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
}
