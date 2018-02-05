import {all} from 'redux-saga/effects'

import login from '../containers/Login/saga'
import filters from '../containers/Filters/saga'
import register from '../containers/Register/saga'
import adminCoach from '../containers/Admin/coach/saga'
import adminStaff from '../containers/Admin/staff/saga'
import adminTeam from '../containers/Admin/team/saga'
import adminPlayer from '../containers/Admin/players/saga'
import adminHS from '../containers/Admin/highSchool/saga'
import adminRoster from '../containers/Admin/roster/saga'
import roles from '../modules/Roles/saga'
import teams from '../modules/Teams/saga'

export default function * () {
  yield all([
    login(),
    filters(),
    register(),
    adminCoach(),
    adminStaff(),
    adminTeam(),
    adminPlayer(),
    adminHS(),
    adminRoster(),
    roles(),
    teams()
  ])
}
