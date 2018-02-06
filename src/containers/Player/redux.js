
import Immutable from 'immutable'
import * as types from '../../types'
import {firebaseApp} from '../../redux/store'
import {PATH_TEAM} from '../Admin/team/config'
import {PATH_HS} from '../Admin/highSchool/config'
import {PATH_COACH} from '../Admin/coach/config'

const _fetchTeam = id => firebaseApp.database().ref(`${PATH_TEAM}/${id}`).once('value').then(snapshot => Object.values(snapshot.val()))
const _fetchHs = id => firebaseApp.database().ref(`${PATH_HS}/${id}`).once('value').then(snapshot => Object.values(snapshot.val()))
const _fetchCoach = id => firebaseApp.database().ref(`${PATH_COACH}/${id}`).once('value').then(snapshot => Object.values(snapshot.val()))

export const setPlayer = player => {
  const team = _fetchTeam(player.get('teamId'))
  const hs = _fetchHs(player.get('hsId'))
  const coach = _fetchCoach(player.get('coachId'))

  player = player.set('team', team)
  player = player.set('hs', hs)
  player = player.set('coach', coach)
  return {
    type: types.SET_PLAYER,
    player
  }
}

const initialState = Immutable.Map({
  player: Immutable.fromJS({})
})

export default (state = initialState, action) => {
  switch (action.type) {
    case types.SET_PLAYER:
      return state
        .set('player', Immutable.fromJS(action.player))

    default:
      return state
  }
}
