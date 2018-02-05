import * as types from '../../types'

export const setSpinner = isSpinner => {
  return {
    type: types.SET_SPINNER,
    isSpinner
  }
}
