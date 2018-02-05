import {put, takeEvery, select, call} from 'redux-saga/effects'
import * as types from '../../types'
import * as actions from './action'
import {firebaseApp} from '../../redux/store'
import {PATH_TEAM} from '../Admin/team/config'
import {PATH_PLAYER} from '../Admin/players/config'

//   teamFilter: '',
//   ageGroupFilter: '',
//   stateFilter: '',
//   playerFilter: '',
//   eventFilter: '',
//   regionFilter: ''
const _fetchTeamsByName = teamFilter => {
  return firebaseApp.database().ref(`${PATH_TEAM}`)
    .orderByChild('name').startAt(teamFilter)
    .once('value').then(snapshot => {
      if (snapshot.val()) return snapshot.val()
      else return {}
    })
}
const _fetchPlayersByAgeGroup = ageGroupFilter => {
  return firebaseApp.database().ref(`${PATH_PLAYER}`)
    .orderByChild('ageGroup').equalTo(ageGroupFilter)
    .once('value').then(snapshot => {
      if (snapshot.val()) return snapshot.val()
      else return {}
    })
}
const _fetchTeamsByState = stateFilter => {
  return firebaseApp.database().ref(`${PATH_TEAM}`)
    .orderByChild('state').equalTo(stateFilter)
    .once('value').then(snapshot => {
      if (snapshot.val()) return snapshot.val()
      else return {}
    })
}
const _fetchPlayersByName = playerFilter => {
  return firebaseApp.database().ref(`${PATH_PLAYER}`)
    .orderByChild('name').startAt(playerFilter)
    .once('value').then(snapshot => {
      if (snapshot.val()) return snapshot.val()
      else return {}
    })
}

function * _setData (action) {
  try {
    let data = []
    const state = yield select()
    const teamFilter = state.filters.get('teamFilter')
    const ageGroupFilter = state.filters.get('ageGroupFilter')
    const stateFilter = state.filters.get('stateFilter')
    const playerFilter = state.filters.get('playerFilter')
    // const eventFilter = state.filters.get('eventFilter')
    // const regionFilter = state.filters.get('regionFilter')

    if (teamFilter) data = yield call(_fetchTeamsByName, teamFilter)
    else if (ageGroupFilter) data = yield call(_fetchPlayersByAgeGroup, ageGroupFilter)
    else if (stateFilter) data = yield call(_fetchTeamsByState, stateFilter)
    else if (playerFilter) data = yield call(_fetchPlayersByName, playerFilter)

    yield put(actions.setFilteredDataSuccess(data))
  } catch (error) {
    yield put(actions.setFilteredDataFailure(error))
  }
}

export default function * () {
  yield takeEvery(types.SET_FILTERED_DATA_REQUEST, _setData)
}
