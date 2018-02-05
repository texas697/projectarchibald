
import firebaseTime from 'firebase'
import cloneDeep from 'lodash/cloneDeep'
import isEmpty from 'lodash/isEmpty'
import store, {firebaseApp} from '../../../redux/store'
import {INPUT_FIELDS} from './config'
import * as actions from './action'
import * as config from '../../../config/index'

export const buildModel = (model, image) => {
  const id = store.getState().adminCoach.get('id')
  return {
    id: id || firebaseApp.auth().currentUser.uid,
    name: model.getIn([0, 'value']).trim(),
    phone: model.getIn([1, 'value']).trim(),
    email: model.getIn([2, 'value']).trim().toLowerCase(),
    image: isEmpty(image) ? config.PLACEHOLDER_IMAGE : image,
    teamId: store.getState().adminTeam.get('id'),
    date: firebaseTime.database.ServerValue.TIMESTAMP
  }
}
export const setCoachData = coach => {
  const _clone = cloneDeep(INPUT_FIELDS)
  _clone[0].value = coach.get('name')
  _clone[1].value = coach.get('phone')
  _clone[2].value = coach.get('email')
  store.dispatch(actions.setCoachData(_clone))
  store.dispatch(actions.setCoachImage(coach.get('image')))
}
