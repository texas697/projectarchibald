import uuid from 'uuid'
import firebaseTime from 'firebase'
import store from '../../../redux/store'
import {INPUT_FIELDS} from './config'
import * as actions from './action'

export const buildModel = model => {
  const id = store.getState().adminHS.get('id')
  return {
    id: id || uuid.v4(),
    name: model.getIn([0, 'value']),
    teamId: store.getState().adminTeam.get('id'),
    date: firebaseTime.database.ServerValue.TIMESTAMP
  }
}

export const setHsData = hs => {
  INPUT_FIELDS[0].value = hs.get('name')
  store.dispatch(actions.setHsData(INPUT_FIELDS))
}
