import uuid from 'uuid'
import store, {firebaseApp} from '../../../redux/store'
import {INPUT_FIELDS} from './config'
import * as actions from './action'

export const buildModel = model => {
  return {
    id: uuid.v4(),
    name: model.getIn([0, 'value']),
    teamId: store.getState().adminTeam.get('id')
  }
}

const _fetchHs = id => firebaseApp.database().ref(`/highschool`).orderByChild('id').equalTo(id).once('value').then(snapshot => Object.values(snapshot.val()))

export const setHsData = teamData => {
  _fetchHs(teamData.hsId).then(result => {
    INPUT_FIELDS[0].value = result.name
    store.dispatch(actions.setHsData(INPUT_FIELDS))
  })
}
