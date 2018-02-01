import * as types from '../../../types'

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
