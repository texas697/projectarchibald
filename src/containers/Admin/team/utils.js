import uuid from 'uuid'
import isEmpty from 'lodash/isEmpty'
import cloneDeep from 'lodash/cloneDeep'
import firebaseTime from 'firebase'
import store from '../../../redux/store'
import {INPUT_FIELDS} from './config'
import * as actions from './action'
import * as config from '../../../config/index'

export const buildModel = (model, image, state) => {
  const id = store.getState().adminTeam.get('id')
  return {
    id: id || uuid.v4(),
    name: model.getIn([0, 'value']),
    image: isEmpty(image) ? config.PLACEHOLDER_IMAGE : image,
    state: isEmpty(state) ? '' : state,
    date: firebaseTime.database.ServerValue.TIMESTAMP
  }
}

export const setTeamData = team => {
  const _clone = cloneDeep(INPUT_FIELDS)
  _clone[0].value = team.get('name')
  store.dispatch(actions.setTeamData(_clone))
  store.dispatch(actions.setTeamImage(team.get('image')))
  store.dispatch(actions.setTeamState(team.get('state')))
}
