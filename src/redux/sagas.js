import {all} from 'redux-saga/effects'

import login from '../containers/Login/saga'
import register from '../containers/Register/saga'
import adminCoach from '../containers/Admin/Team/coach/saga'
import adminStaff from '../containers/Admin/Team/staff/saga'
import adminTeam from '../containers/Admin/Team/team/saga'

export default function * () {
  yield all([
    login(),
    register(),
    adminCoach(),
    adminStaff(),
    adminTeam()
  ])
}
