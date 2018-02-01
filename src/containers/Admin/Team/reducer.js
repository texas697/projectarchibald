import Immutable from 'immutable'
import * as types from '../../../types'
import {INPUT_FIELDS} from './config'

const initialState = Immutable.Map({
  model: Immutable.fromJS(INPUT_FIELDS),
  image: 'empty'
})

export default (state = initialState, action) => {
  switch (action.type) {
    case types.SET_TEAM_DATA:
      return state
        .set('model', action.model)

    case types.SET_TEAM_COACH_IMAGE:
      return state
        .set('image', action.image)

    default:
      return state
  }
}
