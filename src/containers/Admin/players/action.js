import * as types from '../../../types/index'

export const setPlayerData = model => {
  return {
    type: types.SET_PLAYER_DATA,
    model
  }
}

export const setPlayerImage = image => {
  return {
    type: types.SET_PLAYER_IMAGE,
    image
  }
}

export const fetchPlayerByIdRequest = id => {
  return {
    type: types.PLAYER_BY_ID_FETCH_REQUEST,
    id
  }
}

export const fetchPlayerByIdSuccess = player => {
  return {
    type: types.PLAYER_BY_ID_FETCH_SUCCESS,
    player
  }
}

export const fetchPlayerByIdFailure = error => {
  return {
    type: types.PLAYER_BY_ID_FETCH_FAILURE,
    error
  }
}

export const fetchPlayerRequest = teamId => {
  return {
    type: types.PLAYER_FETCH_REQUEST,
    teamId
  }
}

export const fetchPlayerSuccess = (data, options) => {
  return {
    type: types.PLAYER_FETCH_SUCCESS,
    data,
    options
  }
}
export const fetchPlayerFailure = error => {
  return {
    type: types.PLAYER_FETCH_FAILURE,
    error
  }
}

export const addPlayerRequest = model => {
  return {
    type: types.PLAYER_ADD_REQUEST,
    model
  }
}

export const addPlayerSuccess = () => {
  return {
    type: types.PLAYER_ADD_SUCCESS
  }
}
export const addPlayerFailure = error => {
  return {
    type: types.PLAYER_ADD_FAILURE,
    error
  }
}

export const deletePlayerRequest = id => {
  return {
    type: types.PLAYER_DELETE_REQUEST,
    id
  }
}

export const deletePlayerSuccess = () => {
  return {
    type: types.PLAYER_DELETE_SUCCESS
  }
}

export const deletePlayerFailure = error => {
  return {
    type: types.PLAYER_DELETE_FAILURE,
    error
  }
}

export const resetPlayerData = () => {
  return {
    type: types.RESET_PLAYER_DATA
  }
}

export const setPlayerId = id => {
  return {
    type: types.SET_PLAYER_ID,
    id
  }
}

export const setPlayerAgeGroup = ageGroup => {
  return {
    type: types.SET_PLAYER_AGE_GROUP,
    ageGroup
  }
}
