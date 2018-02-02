import { put, takeEvery, call, take } from 'redux-saga/effects'
import { eventChannel } from 'redux-saga'
import * as config from '../../../config/index'
import * as utils from '../../../utils/index'
import * as types from '../../../types/index'
import * as actions from './action'
import {firebaseApp} from '../../../redux/store'

const PATH = 'staff'

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
    const res = yield call(_post, action.model)
    yield put(actions.addStaffSuccess(res))
  } catch (error) {
    yield put(actions.addStaffFailure(error))
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
      yield put(actions.fetchStaffSuccess(data, options))
    } catch (error) {
      yield put(actions.fetchStaffFailure(error))
    }
  }
}

function * _deleteRequest (action) {
  try {
    const res = yield call(_delete, action.id)
    yield put(actions.deleteStaffSuccess(res))
  } catch (error) {
    yield put(actions.deleteStaffFailure(error))
  }
}

export default function * () {
  yield takeEvery(types.STAFF_ADD_REQUEST, _addRequest)
  yield takeEvery(types.STAFF_FETCH_REQUEST, _fetchRequest)
  yield takeEvery(types.STAFF_DELETE_REQUEST, _deleteRequest)
}
