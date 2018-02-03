import * as types from '../../../types/index'

export const setCoachData = model => {
  return {
    type: types.SET_COACH_DATA,
    model
  }
}

export const setCoachImage = image => {
  return {
    type: types.SET_COACH_IMAGE,
    image
  }
}

export const fetchCoachByIdRequest = id => {
  return {
    type: types.COACH_BY_ID_FETCH_REQUEST,
    id
  }
}

export const fetchCoachByIdSuccess = coach => {
  return {
    type: types.COACH_BY_ID_FETCH_SUCCESS,
    coach
  }
}

export const fetchCoachByIdFailure = error => {
  return {
    type: types.COACH_BY_ID_FETCH_FAILURE,
    error
  }
}

export const fetchCoachRequest = model => {
  return {
    type: types.COACH_FETCH_REQUEST,
    model
  }
}

export const fetchCoachSuccess = (data, options) => {
  return {
    type: types.COACH_FETCH_SUCCESS,
    data,
    options
  }
}
export const fetchCoachFailure = error => {
  return {
    type: types.COACH_FETCH_FAILURE,
    error
  }
}

export const addCoachRequest = model => {
  return {
    type: types.COACH_ADD_REQUEST,
    model
  }
}

export const addCoachSuccess = () => {
  return {
    type: types.COACH_ADD_SUCCESS
  }
}
export const addCoachFailure = error => {
  return {
    type: types.COACH_ADD_FAILURE,
    error
  }
}

export const deleteCoachRequest = id => {
  return {
    type: types.COACH_DELETE_REQUEST,
    id
  }
}

export const deleteCoachSuccess = () => {
  return {
    type: types.COACH_DELETE_SUCCESS
  }
}

export const deleteCoachFailure = error => {
  return {
    type: types.COACH_DELETE_FAILURE,
    error
  }
}

export const resetCoachData = () => {
  return {
    type: types.RESET_COACH_DATA
  }
}

export const setCoachId = id => {
  return {
    type: types.SET_COACH_ID,
    id
  }
}
