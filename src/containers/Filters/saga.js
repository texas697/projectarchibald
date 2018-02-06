import {put, takeEvery, select, call} from 'redux-saga/effects'
import uniqBy from 'lodash/uniqBy'
import isEmpty from 'lodash/isEmpty'
import * as types from '../../types'
import * as actions from './action'
import {firebaseApp} from '../../redux/store'
import {PATH_TEAM} from '../Admin/team/config'
import {PATH_PLAYER} from '../Admin/players/config'
import * as utils from '../../utils/index'

//   teamFilter: '',
//   ageGroupFilter: '',
//   stateFilter: '',
//   playerFilter: '',
//   eventFilter: '',
//   regionFilter: ''
const _fetchTeamsByName = teamFilter => {
  return firebaseApp.database().ref(`${PATH_TEAM}`)
    .orderByChild('nameQuery').startAt(teamFilter)
    .once('value').then(snapshot => {
      if (snapshot.val()) return Object.values(snapshot.val())
      else return {}
    })
}
const _fetchTeamsByState = stateFilter => {
  return firebaseApp.database().ref(`${PATH_TEAM}`)
    .orderByChild('state').equalTo(stateFilter)
    .once('value').then(snapshot => {
      if (snapshot.val()) return Object.values(snapshot.val())
      else return {}
    })
}
const _fetchTeamsByRegion = regionFilter => {
  return firebaseApp.database().ref(`${PATH_TEAM}`)
    .orderByChild('region').equalTo(regionFilter)
    .once('value').then(snapshot => {
      if (snapshot.val()) return Object.values(snapshot.val())
      else return {}
    })
}
const _fetchPlayersByAgeGroup = ageGroupFilter => {
  return firebaseApp.database().ref(`${PATH_PLAYER}`)
    .orderByChild('ageGroup').equalTo(ageGroupFilter)
    .once('value').then(snapshot => {
      if (snapshot.val()) return Object.values(snapshot.val())
      else return {}
    })
}
const _fetchPlayersByFirstName = playerFirstFilter => {
  return firebaseApp.database().ref(`${PATH_PLAYER}`)
    .orderByChild('firstQuery').equalTo(playerFirstFilter)
    .once('value').then(snapshot => {
      if (snapshot.val()) return Object.values(snapshot.val())
      else return {}
    })
}
const _fetchPlayersByLastName = playerLastFilter => {
  return firebaseApp.database().ref(`${PATH_PLAYER}`)
    .orderByChild('lastQuery').equalTo(playerLastFilter)
    .once('value').then(snapshot => {
      if (snapshot.val()) return Object.values(snapshot.val())
      else return {}
    })
}

function * _setData (action) {
  try {
    let data = []
    const state = yield select()
    const teamFilter = utils.formatQuery(state.filters.get('teamFilter'))
    const ageGroupFilter = state.filters.get('ageGroupFilter')
    const stateFilter = state.filters.get('stateFilter')
    const playerFirstFilter = utils.formatQuery(state.filters.get('playerFirstFilter'))
    const playerLastFilter = utils.formatQuery(state.filters.get('playerLastFilter'))
    const regionFilter = state.filters.get('regionFilter')
    // const eventFilter = state.filters.get('eventFilter')

    if (teamFilter) {
      data = yield call(_fetchTeamsByName, teamFilter)
    } else if (ageGroupFilter) {
      data = yield call(_fetchPlayersByAgeGroup, ageGroupFilter)
    } else if (stateFilter) {
      data = yield call(_fetchTeamsByState, stateFilter)
    } else if (playerFirstFilter || playerLastFilter) {
      data = yield call(_fetchPlayersByFirstName, playerFirstFilter)

      const result = yield call(_fetchPlayersByLastName, playerLastFilter)

      if (!isEmpty(data) && !isEmpty(result)) data = data.concat(result)
      else if (isEmpty(data) && !isEmpty(result)) data = result
      data = uniqBy(data, 'id')
    } else if (regionFilter) {
      data = yield call(_fetchTeamsByRegion, regionFilter)
    }

    yield put(actions.setFilteredDataSuccess(data))
  } catch (error) {
    yield put(actions.setFilteredDataFailure(error))
  }
}

export default function * () {
  yield takeEvery(types.SET_FILTERED_DATA_REQUEST, _setData)
}
