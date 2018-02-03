import uuid from 'uuid'
import firebaseTime from 'firebase'
import store, {firebaseApp} from '../../../redux/store'
import {INPUT_FIELDS} from './config'
import * as actions from './action'

export const buildModel = (model, image) => {
  return {
    id: uuid.v4(),
    name: model.getIn([0, 'value']),
    image: image,
    date: firebaseTime.database.ServerValue.TIMESTAMP
  }
}

const _fetchTeam = id => firebaseApp.database().ref(`team`).orderByChild('id').equalTo(id).once('value').then(snapshot => Object.values(snapshot.val()))

export const setTeamData = teamData => {
  _fetchTeam(teamData.teamId).then(result => {
    INPUT_FIELDS[0].value = result.name
    store.dispatch(actions.setTeamData(INPUT_FIELDS))
    store.dispatch(actions.setTeamImage(result.image))
  })
}
