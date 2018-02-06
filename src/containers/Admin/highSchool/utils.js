import uuid from 'uuid'
import cloneDeep from 'lodash/cloneDeep'
import firebaseTime from 'firebase'
import store from '../../../redux/store'
import {INPUT_FIELDS} from './config'
import * as actions from './action'

export const buildModel = model => {
  const id = store.getState().adminHS.get('id')
  return {
    id: id || uuid.v4(),
    name: model.getIn([0, 'value']).trim(),
    teamId: store.getState().adminTeam.get('id'),
    date: firebaseTime.database.ServerValue.TIMESTAMP
  }
}

export const setHsData = hs => {
  const _clone = cloneDeep(INPUT_FIELDS)
  _clone[0].value = hs.get('name')
  store.dispatch(actions.setHsData(_clone))
}

export const validate = (val, id, model, i) => {
  model = model.setIn([i, 'isValid'], val.length > 0)
  store.dispatch(actions.setHsData(model))
}
