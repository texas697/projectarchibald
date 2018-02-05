import Immutable from 'immutable'
import * as types from '../../types'

const initialState = Immutable.Map({
  visibleAgeGroup: false,
  visibleState: false,
  visibleEvent: false,
  visiblePlayer: false,
  visibleTeamName: false,
  teamFilter: '',
  ageGroupFilter: '',
  stateFilter: '',
  playerFilter: '',
  eventFilter: '',
  regionFilter: '',
  data: Immutable.fromJS([]),
  isFiltering: false,
  error: {}
})

export default (state = initialState, action) => {
  switch (action.type) {
    case types.TOGGLE_AGE_GROUP_MODAL:
      return state
        .set('visibleAgeGroup', !state.get('visibleAgeGroup'))

    case types.TOGGLE_STATE_MODAL:
      return state
        .set('visibleState', !state.get('visibleState'))

    case types.TOGGLE_EVENT_MODAL:
      return state
        .set('visibleEvent', !state.get('visibleEvent'))

    case types.TOGGLE_PLAYER_MODAL:
      return state
        .set('visiblePlayer', !state.get('visiblePlayer'))

    case types.TOGGLE_TEAM_NAME_MODAL:
      return state
        .set('visibleTeamName', !state.get('visibleTeamName'))

    case types.SET_TEAM_FILTER:
      return state
        .set('teamFilter', action.teamFilter)

    case types.SET_AGE_GROUP_FILTER:
      return state
        .set('ageGroupFilter', action.ageGroupFilter)

    case types.SET_STATE_FILTER:
      return state
        .set('stateFilter', action.stateFilter)

    case types.SET_PLAYER_FILTER:
      return state
        .set('playerFilter', action.playerFilter)

    case types.SET_EVENT_FILTER:
      return state
        .set('eventFilter', action.eventFilter)

    case types.SET_REGION_FILTER:
      return state
        .set('regionFilter', action.regionFilter)

    case types.SET_FILTERED_DATA_REQUEST:
      return state
        .set('isFiltering', true)

    case types.SET_FILTERED_DATA_SUCCESS:
      return state
        .set('isFiltering', false)
        .set('data', Immutable.fromJS(action.data))

    case types.SET_FILTERED_DATA_FAILURE:
      return state
        .set('isFiltering', false)
        .set('error', action.error)

    default:
      return state
  }
}
