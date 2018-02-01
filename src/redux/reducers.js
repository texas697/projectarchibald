import { combineReducers } from 'redux'

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
  adminPlayer
})
