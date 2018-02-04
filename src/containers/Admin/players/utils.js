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
    name: model.getIn([0, 'value']) ? model.getIn([0, 'value']).trim() : '',
    email: model.getIn([1, 'value']) ? model.getIn([1, 'value']).trim().toLowerCase() : '',
    grad: model.getIn([2, 'value']) ? model.getIn([2, 'value']).trim() : '',
    height: model.getIn([3, 'value']) ? model.getIn([3, 'value']).trim().replace("'", '').replace(/\D/g, '') : '',
    weight: model.getIn([4, 'value']) ? model.getIn([4, 'value']).trim().replace(/\D/g, '') : '',
    phone: model.getIn([5, 'value']) ? model.getIn([5, 'value']).trim() : '',
    parent: model.getIn([6, 'value']).trim(),
    parentPhone: model.getIn([7, 'value']) ? model.getIn([7, 'value']).trim() : '',
    twitter: model.getIn([8, 'value']) ? model.getIn([8, 'value']).trim().toLowerCase() : '',
    snapchat: model.getIn([9, 'value']) ? model.getIn([9, 'value']).trim().toLowerCase() : '',
    instagram: model.getIn([10, 'value']) ? model.getIn([10, 'value']).trim().toLowerCase() : '',
    image: image || 'empty',
    teamId: store.getState().adminTeam.get('id'),
    date: firebaseTime.database.ServerValue.TIMESTAMP
  }
}
export const setPlayerData = player => {
  const _clone = cloneDeep(INPUT_FIELDS)
  _clone[0].value = player.get('name')
  _clone[1].value = player.get('email')
  _clone[2].value = player.get('grad')
  _clone[3].value = player.get('height')
  _clone[4].value = player.get('weight')
  _clone[5].value = player.get('phone')
  _clone[6].value = player.get('parent')
  _clone[7].value = player.get('parentPhone')
  _clone[8].value = player.get('twitter')
  _clone[9].value = player.get('snapchat')
  _clone[10].value = player.get('instagram')
  store.dispatch(actions.setPlayerData(_clone))
  store.dispatch(actions.setPlayerId(player.get('id')))
  store.dispatch(actions.setPlayerImage(player.get('image')))
}
