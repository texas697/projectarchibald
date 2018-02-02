import * as types from '../../../../types'

export const setTeamData = model => {
  return {
    type: types.SET_TEAM_DATA,
    model
  }
}

export const setTeamImage = image => {
  return {
    type: types.SET_TEAM_IMAGE,
    image
  }
}

export const fetchTeamRequest = model => {
  return {
    type: types.TEAM_FETCH_REQUEST,
    model
  }
}

export const fetchTeamSuccess = (data, options) => {
  return {
    type: types.TEAM_FETCH_SUCCESS,
    data,
    options
  }
}
export const fetchTeamFailure = error => {
  return {
    type: types.TEAM_FETCH_FAILURE,
    error
  }
}

export const addTeamRequest = model => {
  return {
    type: types.TEAM_ADD_REQUEST,
    model
  }
}

export const addTeamSuccess = () => {
  return {
    type: types.TEAM_ADD_SUCCESS
  }
}
export const addTeamFailure = error => {
  return {
    type: types.TEAM_ADD_FAILURE,
    error
  }
}

export const deleteTeamRequest = id => {
  return {
    type: types.TEAM_DELETE_REQUEST,
    id
  }
}

export const deleteTeamSuccess = () => {
  return {
    type: types.TEAM_DELETE_SUCCESS
  }
}

export const deleteTeamFailure = error => {
  return {
    type: types.TEAM_DELETE_FAILURE,
    error
  }
}

export const resetTeamData = () => {
  return {
    type: types.RESET_TEAM_DATA
  }
}
