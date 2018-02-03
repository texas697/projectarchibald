import uuid from 'uuid'
import firebaseTime from 'firebase'
import store from '../../../redux/store'
import {INPUT_FIELDS} from './config'
import * as actions from './action'

export const buildModel = (model, image) => {
  const id = store.getState().adminTeam.get('id')
  return {
    id: id || uuid.v4(),
    name: model.getIn([0, 'value']),
    image: image,
    date: firebaseTime.database.ServerValue.TIMESTAMP
  }
}

export const setTeamData = team => {
  INPUT_FIELDS[0].value = team.get('name')
  store.dispatch(actions.setTeamData(INPUT_FIELDS))
  store.dispatch(actions.setTeamImage(team.get('image')))
}
