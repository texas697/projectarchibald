import {firebaseApp} from '../../redux/store'

const _fetchStaff = teamId => {
  return firebaseApp.database().ref(`staff`)
    .orderByChild('teamId').equalTo(teamId)
    .once('value').then(snapshot => {
      if (snapshot.val()) return Object.values(snapshot.val())
      else return {}
    })
}
const _fetchPlayers = teamId => firebaseApp.database().ref(`/team-players/${teamId}`).once('value').then(snapshot => Object.values(snapshot.val()))

export const buildModel = (state) => {
  const teamId = state.adminTeam.get('id')
  _fetchStaff(teamId).then(result => {
    _fetchPlayers(teamId).then(res => {
      return {
        teamId: teamId,
        hsId: state.adminHS.get('id'),
        coachId: state.adminCoach.get('id'),
        staff: result.map(x => x.id),
        players: res.map(x => x.id)
      }
    })
  })
}
