import uuid from 'uuid'
import firebaseTime from 'firebase'
import store from '../../../redux/store'
import {INPUT_FIELDS} from './config'
import * as actions from './action'
import cloneDeep from 'lodash/cloneDeep'

export const buildModel = (model, image) => {
  const id = store.getState().adminStaff.get('id')
  return {
    id: id || uuid.v4(),
    name: model.getIn([0, 'value']).trim(),
    title: model.getIn([1, 'value']).trim(),
    image: image,
    teamId: store.getState().adminTeam.get('id'),
    date: firebaseTime.database.ServerValue.TIMESTAMP
  }
}
export const setStaffData = staff => {
  const _clone = cloneDeep(INPUT_FIELDS)
  _clone[0].value = staff.get('name')
  _clone[1].value = staff.get('title')
  store.dispatch(actions.setStaffData(_clone))
  store.dispatch(actions.setStaffImage(staff.get('image')))
}
