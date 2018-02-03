
import firebaseTime from 'firebase'
import store, {firebaseApp} from '../../redux/store'
import {PATH_STAFF} from '../../containers/Admin/staff/config'
import {PATH_PLAYER} from '../../containers/Admin/players/config'

const _fetchAllStaff = teamId => {
  return firebaseApp.database().ref(`${PATH_STAFF}`)
    .orderByChild('teamId').equalTo(teamId)
    .once('value').then(snapshot => {
      if (snapshot.val()) return Object.values(snapshot.val())
      else return []
    })
}
const _fetchAllPlayers = teamId => {
  return firebaseApp.database().ref(`${PATH_PLAYER}`)
    .orderByChild('teamId').equalTo(teamId)
    .once('value').then(snapshot => {
      if (snapshot.val()) return Object.values(snapshot.val())
      else return []
    })
}

export async function buildModel () {
  const state = store.getState()
  const teamId = state.adminTeam.get('id')
  return _fetchAllStaff(teamId).then(staff => {
    return _fetchAllPlayers(teamId).then(players => {
      return {
        teamId: teamId,
        hsId: state.adminHS.get('id') || '',
        coachId: firebaseApp.auth().currentUser.uid,
        staff: staff.map(x => x.id),
        players: players.map(x => x.id),
        date: firebaseTime.database.ServerValue.TIMESTAMP
      }
    })
  })
}
