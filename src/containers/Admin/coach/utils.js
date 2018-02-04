import uuid from 'uuid'
import firebaseTime from 'firebase'
import store from '../../../redux/store'
import {INPUT_FIELDS} from './config'
import * as actions from './action'

export const buildModel = (model, image) => {
  const id = store.getState().adminCoach.get('id')
  return {
    id: id || uuid.v4(),
    name: model.getIn([0, 'value']).trim(),
    phone: model.getIn([1, 'value']).trim(),
    email: model.getIn([2, 'value']).trim().toLowerCase(),
    image: image || 'empty',
    teamId: store.getState().adminTeam.get('id'),
    date: firebaseTime.database.ServerValue.TIMESTAMP
  }
}
export const setCoachData = coach => {
  INPUT_FIELDS[0].value = coach.get('name')
  INPUT_FIELDS[1].value = coach.get('phone')
  INPUT_FIELDS[2].value = coach.get('email')
  store.dispatch(actions.setCoachData(INPUT_FIELDS))
  store.dispatch(actions.setCoachImage(coach.get('image')))
}
