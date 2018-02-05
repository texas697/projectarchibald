import * as types from '../../types'

export const toggleTeamModal = () => {
  return {
    type: types.TOGGLE_TEAM_NAME_MODAL
  }
}

export const toggleAgeGroupModal = () => {
  return {
    type: types.TOGGLE_AGE_GROUP_MODAL
  }
}

export const toggleStateModal = () => {
  return {
    type: types.TOGGLE_STATE_MODAL
  }
}

export const toggleEventModal = () => {
  return {
    type: types.TOGGLE_EVENT_MODAL
  }
}

export const togglePlayerModal = () => {
  return {
    type: types.TOGGLE_PLAYER_MODAL
  }
}

export const setTeamFilter = teamFilter => {
  return {
    type: types.SET_TEAM_FILTER,
    teamFilter
  }
}

export const setAgeGroupFilter = ageGroupFilter => {
  return {
    type: types.SET_AGE_GROUP_FILTER,
    ageGroupFilter
  }
}

export const setStateFilter = stateFilter => {
  return {
    type: types.SET_STATE_FILTER,
    stateFilter
  }
}

export const setRegionFilter = regionFilter => {
  return {
    type: types.SET_REGION_FILTER,
    regionFilter
  }
}

export const setEventFilter = eventFilter => {
  return {
    type: types.SET_EVENT_FILTER,
    eventFilter
  }
}

export const setPlayerFilter = playerFilter => {
  return {
    type: types.SET_PLAYER_FILTER,
    playerFilter
  }
}

export const setFilteredDataRequest = () => {
  return {
    type: types.SET_FILTERED_DATA_REQUEST
  }
}

export const setFilteredDataSuccess = data => {
  return {
    type: types.SET_FILTERED_DATA_SUCCESS,
    data
  }
}

export const setFilteredDataFailure = error => {
  return {
    type: types.SET_FILTERED_DATA_FAILURE,
    error
  }
}
