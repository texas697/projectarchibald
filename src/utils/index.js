
import store, {firebaseApp} from '../redux/store'
import {resetRegisterUserRequest} from '../containers/Register/action'
import {addRolesRequest} from '../modules/Roles/action'
import {setCoachData} from '../containers/Admin/coach/utils'
import {setHsData} from '../containers/Admin/highSchool/utils'
import {setPlayersData} from '../containers/Admin/players/utils'
import {setStaffData} from '../containers/Admin/staff/utils'

export const buildOptions = data => {
  return data.map(x => {
    return {
      value: x.id,
      label: x.name
    }
  })
}

export const updateProfile = (user, name, isCoach) => {
  user.updateProfile({displayName: name})
    .then(() => store.dispatch(resetRegisterUserRequest()))
    .catch(error => console.log(error))
  store.dispatch(addRolesRequest({uid: user.uid, isCoach: isCoach}))
}

const _fetchTeamId = uid => firebaseApp.database().ref(`/user-team/${uid}`).once('value').then(snapshot => {
  if (snapshot.val()) return Object.values(snapshot.val())
  else return {}
})

const _fetchTeamData = id => firebaseApp.database().ref(`/teams`).orderByChild('teamId').equalTo(id).once('value').then(snapshot => Object.values(snapshot.val()))

export const fetchTeamData = (uid) => {
  _fetchTeamId(uid).then(result => {
    if (result) {
      _fetchTeamData(result.id).then(teamData => {
        setCoachData(teamData)
        setHsData(teamData)
        setPlayersData(teamData)
        setStaffData(teamData)
      })
    }
  })
}
