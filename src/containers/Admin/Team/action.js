import * as types from '../../../types'

export const setTeamData = model => {
  return {
    type: types.SET_TEAM_DATA,
    model
  }
}

export const setTeamCoachImage = image => {
  return {
    type: types.SET_TEAM_COACH_IMAGE,
    image
  }
}
