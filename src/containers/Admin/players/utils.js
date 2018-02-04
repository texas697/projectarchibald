import uuid from 'uuid'
import cloneDeep from 'lodash/cloneDeep'
import firebaseTime from 'firebase'
import store from '../../../redux/store'
import {INPUT_FIELDS} from './config'
import * as actions from './action'

export const buildModel = (model, image) => {
  const id = store.getState().adminPlayer.get('id')
  return {
    id: id || uuid.v4(),
    name: model.getIn([0, 'value']) || '',
    grad: model.getIn([1, 'value']) || '',
    height: model.getIn([2, 'value']) || '',
    weight: model.getIn([3, 'value']) || '',
    phone: model.getIn([4, 'value']) || '',
    parent: model.getIn([5, 'value']) || '',
    parentPhone: model.getIn([6, 'value']) || '',
    twitter: model.getIn([7, 'value']) || '',
    snapchat: model.getIn([8, 'value']) || '',
    instagram: model.getIn([9, 'value']) || '',
    email: model.getIn([10, 'value']) || '',
    image: image || 'empty',
    teamId: store.getState().adminTeam.get('id'),
    date: firebaseTime.database.ServerValue.TIMESTAMP
  }
}
export const setPlayerData = player => {
  const _clone = cloneDeep(INPUT_FIELDS)
  _clone[0].value = player.get('name')
  _clone[1].value = player.get('grad')
  _clone[2].value = player.get('height')
  _clone[3].value = player.get('weight')
  _clone[4].value = player.get('phone')
  _clone[5].value = player.get('parent')
  _clone[6].value = player.get('parentPhone')
  _clone[7].value = player.get('twitter')
  _clone[8].value = player.get('snapchat')
  _clone[9].value = player.get('instagram')
  _clone[10].value = player.get('email')
  store.dispatch(actions.setPlayerData(_clone))
  store.dispatch(actions.setPlayerImage(player.get('image')))
}
