import uuid from 'uuid'
import store, {firebaseApp} from '../../../redux/store'
import {INPUT_FIELDS} from './config'
import * as actions from './action'

export const buildModel = (model, image) => {
  return {
    id: uuid.v4(),
    name: model.getIn([0, 'value']),
    phone: model.getIn([1, 'value']),
    email: model.getIn([2, 'value']),
    image: image,
    teamId: store.getState().adminTeam.get('id')
  }
}

const _fetchCoach = id => firebaseApp.database().ref(`coach`).orderByChild('id').equalTo(id).once('value').then(snapshot => Object.values(snapshot.val()))

export const setCoachData = teamData => {
  _fetchCoach(teamData.teamId).then(result => {
    INPUT_FIELDS[0].value = result.name
    INPUT_FIELDS[1].value = result.phone
    INPUT_FIELDS[2].value = result.email
    store.dispatch(actions.setCoachData(INPUT_FIELDS))
    store.dispatch(actions.setCoachImage(result.image))
  })
}
