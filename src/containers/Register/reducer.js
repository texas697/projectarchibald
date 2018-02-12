import Immutable from 'immutable'
import * as types from '../../types'
import {INPUT_FIELDS} from './config'

const initialState = Immutable.Map({
  error: {},
  name: '',
  isCoach: false,
  isRecruiter: false,
  isPlayer: false,
  isParent: false,
  isCoordinator: false,
  isRegistering: false,
  model: Immutable.fromJS(INPUT_FIELDS)
})

export default (state = initialState, action) => {
  switch (action.type) {
    case types.REGISTER_USER_REQUEST:
      return state
        .set('isRegistering', true)
        .set('name', action.name)

    case types.REGISTER_USER_SUCCESS:
      return state
        .set('isRegistering', false)

    case types.REGISTER_USER_FAILURE:
      return state
        .set('isRegistering', false)
        .set('error', action.error)

    case types.RESET_REGISTER_USER_REQUEST:
      return state
        .set('isRegistering', false)
        .set('name', '')

    case types.SET_REGISTER_DATA:
      return state
        .set('model', action.model)
        .set('name', '')

    case types.SET_REGISTER_IS_COACH:
      return state
        .set('isCoach', !state.get('isCoach'))
        .set('isRecruiter', false)
        .set('isPlayer', false)
        .set('isParent', false)
        .set('isCoordinator', false)

    case types.SET_REGISTER_IS_RECRUITER:
      return state
        .set('isRecruiter', !state.get('isRecruiter'))
        .set('isCoach', false)
        .set('isPlayer', false)
        .set('isParent', false)
        .set('isCoordinator', false)

    case types.SET_REGISTER_IS_PLAYER:
      return state
        .set('isPlayer', !state.get('isPlayer'))
        .set('isCoach', false)
        .set('isRecruiter', false)
        .set('isParent', false)
        .set('isCoordinator', false)

    case types.SET_REGISTER_IS_PARENT:
      return state
        .set('isParent', !state.get('isParent'))
        .set('isCoach', false)
        .set('isRecruiter', false)
        .set('isPlayer', false)
        .set('isCoordinator', false)

    case types.SET_REGISTER_IS_COORDINATOR:
      return state
        .set('isCoordinator', !state.get('isCoordinator'))
        .set('isCoach', false)
        .set('isRecruiter', false)
        .set('isPlayer', false)
        .set('isParent', false)

    default:
      return state
  }
}
