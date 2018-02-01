import {all} from 'redux-saga/effects'

import login from '../containers/Login/saga'
import register from '../containers/Register/saga'

export default function * () {
  yield all([
    login(),
    register()
  ])
}
