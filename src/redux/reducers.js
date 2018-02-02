import { combineReducers } from 'redux'

import adminStaff from '../containers/Admin/Team/staff/reducer'
import adminCoach from '../containers/Admin/Team/coach/reducer'
import adminTeam from '../containers/Admin/Team/team/reducer'
import adminPlayer from '../containers/Admin/Player/reducer'
import home from '../containers/Home/reducer'
import login from '../containers/Login/reducer'
import filters from '../containers/Filters/reducer'
import dimensions from '../modules/Dimensions/reducer'
import spinner from '../modules/Spinner/reducer'

import register from '../containers/Register/reducer'

export default combineReducers({
  home,
  login,
  filters,
  register,
  dimensions,
  spinner,
  adminPlayer,
  adminTeam,
  adminCoach,
  adminStaff
})
