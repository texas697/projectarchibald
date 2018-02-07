
import Immutable from 'immutable'
import * as types from '../../types'
import store, {firebaseApp} from '../../redux/store'
import {PATH_TEAM} from '../Admin/team/config'
import {PATH_HS} from '../Admin/highSchool/config'
import {PATH_COACH} from '../Admin/coach/config'
import {Toast} from 'native-base'
import * as config from '../../config'

const _fetchTeam = id => {
  return firebaseApp.database().ref(`${PATH_TEAM}/${id}`)
    .once('value').then(snapshot => {
      if (snapshot.val()) return snapshot.val()
      else Toast.show(config.TOAST_ERROR(config.TOAST_ERROR))
    })
}
const _fetchHs = id => {
  return firebaseApp.database().ref(`${PATH_HS}/${id}`)
    .once('value').then(snapshot => {
      if (snapshot.val()) return snapshot.val()
      else Toast.show(config.TOAST_ERROR(config.TOAST_ERROR))
    })
}
const _fetchCoach = id => {
  return firebaseApp.database().ref(`${PATH_COACH}/${id}`)
    .once('value').then(snapshot => {
      if (snapshot.val()) return snapshot.val()
      else Toast.show(config.TOAST_ERROR(config.TOAST_ERROR))
    })
}

export async function setPlayer (data) {
  const team = await _fetchTeam(data.get('teamId'))
  const hs = await _fetchHs(data.get('hsId'))
  const coach = await _fetchCoach(data.get('coachId'))

  data = data.set('team', team)
  data = data.set('hs', hs)
  data = data.set('coach', coach)
  store.dispatch({type: types.SET_PLAYER, data})
}

const initialState = Immutable.Map({
  data: Immutable.fromJS({
    coach: {
      phone: 0,
      name: '',
      email: ''
    },
    hs: {},
    team: {}
  })
})

export default (state = initialState, action) => {
  switch (action.type) {
    case types.SET_PLAYER:
      return state
        .set('data', Immutable.fromJS(action.data))

    default:
      return state
  }
}
