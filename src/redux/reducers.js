import { combineReducers } from 'redux'

import adminRoster from '../containers/Admin/roster/reducer'
import adminHS from '../containers/Admin/highSchool/reducer'
import adminStaff from '../containers/Admin/staff/reducer'
import adminCoach from '../containers/Admin/coach/reducer'
import adminTeam from '../containers/Admin/team/reducer'
import adminPlayer from '../containers/Admin/players/reducer'
import player from '../containers/Player/redux'
import home from '../containers/Home/reducer'
import login from '../containers/Login/reducer'
import filters from '../containers/Filters/reducer'
import dimensions from '../modules/Dimensions/reducer'
import spinner from '../modules/Spinner/reducer'
import roles from '../modules/Roles/reducer'
import teams from '../modules/Teams/reducer'
import states from '../modules/States/index'

import register from '../containers/Register/reducer'

export default combineReducers({
  home,
  login,
  filters,
  register,
  dimensions,
  spinner,
  adminPlayer,
  player,
  adminTeam,
  adminCoach,
  adminStaff,
  adminHS,
  adminRoster,
  roles,
  teams,
  states
})
