import uuid from 'uuid'
import cloneDeep from 'lodash/cloneDeep'
import isEmpty from 'lodash/isEmpty'
import firebaseTime from 'firebase'
import store from '../../../redux/store'
import {INPUT_FIELDS} from './config'
import * as actions from './action'
import * as config from '../../../config/index'

const _formatNumbers = string => parseInt(string.trim().replace("'", '').replace('-', '').replace(/\D/g, ''))

export const buildModel = (model, image, ageGroup) => {
  const id = store.getState().adminPlayer.get('id')
  return {
    id: id || uuid.v4(),
    name: model.getIn([0, 'value']) ? model.getIn([0, 'value']).trim() : '',
    email: model.getIn([1, 'value']) ? model.getIn([1, 'value']).trim().toLowerCase() : '',
    grad: model.getIn([2, 'value']) ? _formatNumbers(model.getIn([2, 'value'])) : '',
    height: model.getIn([3, 'value']) ? _formatNumbers(model.getIn([3, 'value'])) : '',
    weight: model.getIn([4, 'value']) ? _formatNumbers(model.getIn([4, 'value'])) : '',
    phone: model.getIn([5, 'value']) ? _formatNumbers(model.getIn([5, 'value'])) : '',
    age: model.getIn([6, 'value']) ? _formatNumbers(model.getIn([6, 'value'])) : '',
    parent: model.getIn([7, 'value']).trim(),
    parentPhone: model.getIn([8, 'value']) ? _formatNumbers(model.getIn([8, 'value'])) : '',
    twitter: model.getIn([9, 'value']) ? model.getIn([9, 'value']).trim().toLowerCase() : '',
    snapchat: model.getIn([10, 'value']) ? model.getIn([10, 'value']).trim().toLowerCase() : '',
    instagram: model.getIn([11, 'value']) ? model.getIn([11, 'value']).trim().toLowerCase() : '',
    image: isEmpty(image) ? config.PLACEHOLDER_IMAGE : image,
    ageGroup: isEmpty(ageGroup) ? '' : ageGroup,
    teamId: store.getState().adminTeam.get('id'),
    date: firebaseTime.database.ServerValue.TIMESTAMP
  }
}
export const setPlayerData = player => {
  const _clone = cloneDeep(INPUT_FIELDS)
  _clone[0].value = player.get('name')
  _clone[1].value = player.get('email')
  _clone[2].value = player.get('grad').toString()
  _clone[3].value = player.get('height').toString()
  _clone[4].value = player.get('weight').toString()
  _clone[5].value = player.get('phone').toString()
  _clone[6].value = player.get('age').toString()
  _clone[7].value = player.get('parent')
  _clone[8].value = player.get('parentPhone').toString()
  _clone[9].value = player.get('twitter')
  _clone[10].value = player.get('snapchat')
  _clone[11].value = player.get('instagram')
  store.dispatch(actions.setPlayerData(_clone))
  store.dispatch(actions.setPlayerId(player.get('id')))
  store.dispatch(actions.setPlayerImage(player.get('image')))
  store.dispatch(actions.setPlayerAgeGroup(player.get('ageGroup')))
}
