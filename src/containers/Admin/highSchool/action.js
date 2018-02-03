import * as types from '../../../types/index'

export const setHsData = model => {
  return {
    type: types.SET_HS_DATA,
    model
  }
}

export const fetchHsByIdRequest = id => {
  return {
    type: types.HS_BY_ID_FETCH_REQUEST,
    id
  }
}

export const fetchHsByIdSuccess = hs => {
  return {
    type: types.HS_BY_ID_FETCH_SUCCESS,
    hs
  }
}

export const fetchHsByIdFailure = error => {
  return {
    type: types.HS_BY_ID_FETCH_FAILURE,
    error
  }
}

export const fetchHsRequest = model => {
  return {
    type: types.HS_FETCH_REQUEST,
    model
  }
}

export const fetchHsSuccess = (data, options) => {
  return {
    type: types.HS_FETCH_SUCCESS,
    data,
    options
  }
}
export const fetchHsFailure = error => {
  return {
    type: types.HS_FETCH_FAILURE,
    error
  }
}

export const addHsRequest = model => {
  return {
    type: types.HS_ADD_REQUEST,
    model
  }
}

export const addHsSuccess = () => {
  return {
    type: types.HS_ADD_SUCCESS
  }
}
export const addHsFailure = error => {
  return {
    type: types.HS_ADD_FAILURE,
    error
  }
}

export const deleteHsRequest = id => {
  return {
    type: types.HS_DELETE_REQUEST,
    id
  }
}

export const deleteHsSuccess = () => {
  return {
    type: types.HS_DELETE_SUCCESS
  }
}

export const deleteHsFailure = error => {
  return {
    type: types.HS_DELETE_FAILURE,
    error
  }
}

export const resetHsData = () => {
  return {
    type: types.RESET_HS_DATA
  }
}
