import uuid from 'uuid'
import cloneDeep from 'lodash/cloneDeep'
import isEmpty from 'lodash/isEmpty'
import firebaseTime from 'firebase'
import store from '../../../redux/store'
import {INPUT_FIELDS} from './config'
import * as actions from './action'
import * as config from '../../../config/index'
import * as utils from '../../../utils/index'

export const buildModel = (model, image, ageGroup) => {
  const id = store.getState().adminPlayer.get('id')
  const _firstName = model.getIn([0, 'value'])
  const _lastName = model.getIn([1, 'value'])
  const _firstQuery = utils.formatQuery(model.getIn([0, 'value']))
  const _lastQuery = utils.formatQuery(model.getIn([1, 'value']))
  const _email = utils.formatTrim(model.getIn([2, 'value']))
  const _grad = utils.formatNumbers(model.getIn([3, 'value']))
  const _height = utils.formatNumbers(model.getIn([4, 'value']))
  const _weight = utils.formatNumbers(model.getIn([5, 'value']))
  const _phone = utils.formatNumbers(model.getIn([6, 'value']))
  const _age = utils.formatNumbers(model.getIn([7, 'value']))
  const _parent = model.getIn([8, 'value']).trim()
  const _parentPhone = utils.formatNumbers(model.getIn([9, 'value']))
  const _twitter = utils.formatTrim(model.getIn([10, 'value']))
  const _snapchat = utils.formatTrim(model.getIn([11, 'value']))
  const _instagram = utils.formatTrim(model.getIn([12, 'value']))
  return {
    id: id || uuid.v4(),
    firstQuery: _firstQuery || '',
    lastQuery: _lastQuery || '',
    firstName: _firstName ? _firstName.trim() : '',
    lastName: _lastName ? _lastName.trim() : '',
    email: _email || '',
    grad: _grad || '',
    height: _height || '',
    weight: _weight || '',
    phone: _phone || '',
    age: _age || '',
    parent: _parent || '',
    parentPhone: _parentPhone || '',
    twitter: _twitter || '',
    snapchat: _snapchat || '',
    instagram: _instagram || '',
    image: isEmpty(image) ? config.PLACEHOLDER_IMAGE : image,
    ageGroup: isEmpty(ageGroup) ? '' : ageGroup,
    teamId: store.getState().adminTeam.get('id'),
    date: firebaseTime.database.ServerValue.TIMESTAMP
  }
}
export const setPlayerData = player => {
  const _clone = cloneDeep(INPUT_FIELDS)
  _clone[0].value = player.get('firstName')
  _clone[1].value = player.get('lastName')
  _clone[2].value = player.get('email')
  _clone[3].value = player.get('grad').toString()
  _clone[4].value = player.get('height').toString()
  _clone[5].value = player.get('weight').toString()
  _clone[6].value = player.get('phone').toString()
  _clone[7].value = player.get('age').toString()
  _clone[8].value = player.get('parent')
  _clone[9].value = player.get('parentPhone').toString()
  _clone[10].value = player.get('twitter')
  _clone[11].value = player.get('snapchat')
  _clone[12].value = player.get('instagram')
  store.dispatch(actions.setPlayerData(_clone))
  store.dispatch(actions.setPlayerId(player.get('id')))
  store.dispatch(actions.setPlayerImage(player.get('image')))
  store.dispatch(actions.setPlayerAgeGroup(player.get('ageGroup')))
}
