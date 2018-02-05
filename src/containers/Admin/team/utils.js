import uuid from 'uuid'
import cloneDeep from 'lodash/cloneDeep'
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
  const _clone = cloneDeep(INPUT_FIELDS)
  _clone[0].value = team.get('name')
  store.dispatch(actions.setTeamData(_clone))
  store.dispatch(actions.setTeamImage(team.get('image')))
}
