import Immutable from 'immutable'
import * as types from '../../../types'
import {INPUT_FIELDS} from './config'

const initialState = Immutable.Map({
  model: Immutable.fromJS(INPUT_FIELDS),
  image: 'empty'
})

export default (state = initialState, action) => {
  switch (action.type) {
    case types.SET_PLAYER_DATA:
      return state
        .set('model', action.model)

    case types.SET_PLAYER_IMAGE:
      return state
        .set('image', action.image)

    default:
      return state
  }
}
