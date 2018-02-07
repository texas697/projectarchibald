
import Immutable from 'immutable'
import * as types from '../../types'
import store, {firebaseApp} from '../../redux/store'
import {PATH_HS} from '../Admin/highSchool/config'
import {PATH_COACH} from '../Admin/coach/config'
import {PATH_PLAYER} from '../Admin/players/config'
import {PATH_STAFF} from '../Admin/staff/config'
import {Toast} from 'native-base'
import * as config from '../../config'

const _fetchStaff = teamId => {
  return firebaseApp.database().ref(`${PATH_STAFF}`)
    .orderByChild('teamId').equalTo(teamId)
      .once('value').then(snapshot => {
        if (snapshot.val()) return Object.values(snapshot.val())
        else Toast.show(config.TOAST_ERROR(config.TOAST_ERROR))
      })
}
const _fetchPlayers = teamId => {
  return firebaseApp.database().ref(`${PATH_PLAYER}`)
    .orderByChild('teamId').equalTo(teamId)
      .once('value').then(snapshot => {
        if (snapshot.val()) return Object.values(snapshot.val())
        else Toast.show(config.TOAST_ERROR(config.TOAST_ERROR))
      })
}
const _fetchHs = teamId => {
  return firebaseApp.database().ref(`${PATH_HS}`)
    .orderByChild('teamId').equalTo(teamId)
      .once('value').then(snapshot => {
        if (snapshot.val()) return Object.values(snapshot.val())
        else Toast.show(config.TOAST_ERROR(config.TOAST_ERROR))
      })
}
const _fetchCoach = teamId => {
  return firebaseApp.database().ref(`${PATH_COACH}`)
    .orderByChild('teamId').equalTo(teamId)
      .once('value').then(snapshot => {
        if (snapshot.val()) return Object.values(snapshot.val())
        else Toast.show(config.TOAST_ERROR(config.TOAST_ERROR))
      })
}

export async function setTeam (data) {
  const players = await _fetchPlayers(data.get('id'))
  const hs = await _fetchHs(data.get('id'))
  const coach = await _fetchCoach(data.get('id'))
  const staff = await _fetchStaff(data.get('id'))

  data = data.set('players', players)
  data = data.set('hs', hs[0])
  data = data.set('coach', coach[0])
  data = data.set('staff', staff)
  store.dispatch({type: types.SET_TEAM, data})
}

export const setTeamRoute = route => {
  return {
    type: types.SET_TEAM_ROUTE,
    route
  }
}

const initialState = Immutable.Map({
  data: Immutable.fromJS({
    coach: {},
    hs: {},
    players: [],
    staff: []
  }),
  route: 'PlayerList'
})

export default (state = initialState, action) => {
  switch (action.type) {
    case types.SET_TEAM:
      return state
        .set('data', Immutable.fromJS(action.data))

          case types.SET_TEAM_ROUTE:
            return state
              .set('route', action.route)

    default:
      return state
  }
}
