import * as types from '../../types'

export const fetchTeamsRequest = uid => {
  return {
    type: types.TEAMS_FETCH_REQUEST,
    uid
  }
}

export const fetchTeamsSuccess = data => {
  return {
    type: types.TEAMS_FETCH_SUCCESS,
    data
  }
}

export const fetchTeamsFailure = error => {
  return {
    type: types.TEAMS_FETCH_FAILURE,
    error
  }
}

export const fetchTeamsByIdRequest = id => {
  return {
    type: types.TEAMS_BY_ID_FETCH_REQUEST,
    id
  }
}

export const fetchTeamsByIdSuccess = teams => {
  return {
    type: types.TEAMS_BY_ID_FETCH_SUCCESS,
    teams
  }
}

export const fetchTeamsByIdFailure = error => {
  return {
    type: types.TEAMS_BY_ID_FETCH_FAILURE,
    error
  }
}

export const fetchTeamsByCoachIdRequest = uid => {
  return {
    type: types.TEAMS_BY_COACH_ID_FETCH_REQUEST,
    uid
  }
}

export const addTeamsRequest = model => {
  return {
    type: types.TEAMS_ADD_REQUEST,
    model
  }
}

export const addTeamsSuccess = () => {
  return {
    type: types.TEAMS_ADD_SUCCESS
  }
}

export const addTeamsFailure = error => {
  return {
    type: types.TEAMS_ADD_FAILURE,
    error
  }
}
