import { put, takeEvery, call, take, select } from 'redux-saga/effects'
import { eventChannel } from 'redux-saga'
import * as config from '../../../config/index'
import * as utils from '../../../utils/index'
import * as types from '../../../types/index'
import * as actions from './action'
import {firebaseApp} from '../../../redux/store'

const PATH = 'player'

const _post = model => firebaseApp.database().ref().child(`${PATH}/${model.id}`).update(model)

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
    action.model.teamId = state.adminTeam.get('id')
    const res = yield call(_post, action.model)
    yield put(actions.addPlayerSuccess(res))
  } catch (error) {
    yield put(actions.addPlayerFailure(error))
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
      yield put(actions.fetchPlayerSuccess(data, options))
    } catch (error) {
      yield put(actions.fetchPlayerFailure(error))
    }
  }
}

function * _deleteRequest (action) {
  try {
    const res = yield call(_delete, action.id)
    yield put(actions.deletePlayerSuccess(res))
  } catch (error) {
    yield put(actions.deletePlayerFailure(error))
  }
}

export default function * () {
  yield takeEvery(types.PLAYER_ADD_REQUEST, _addRequest)
  yield takeEvery(types.PLAYER_FETCH_REQUEST, _fetchRequest)
  yield takeEvery(types.PLAYER_DELETE_REQUEST, _deleteRequest)
}
