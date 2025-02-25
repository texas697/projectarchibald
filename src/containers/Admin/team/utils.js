import uuid from 'uuid'
import isEmpty from 'lodash/isEmpty'
import cloneDeep from 'lodash/cloneDeep'
import firebaseTime from 'firebase'
import store from '../../../redux/store'
import {INPUT_FIELDS} from './config'
import * as actions from './action'
import * as config from '../../../config/index'
import * as utils from '../../../utils/index'

export const buildModel = (model, image, state, region) => {
  const id = store.getState().adminTeam.get('id')
  return {
    id: id || uuid.v4(),
    name: model.getIn([0, 'value']),
    nameQuery: utils.formatQuery(model.getIn([0, 'value'])),
    image: isEmpty(image) ? config.PLACEHOLDER_IMAGE : image,
    state: isEmpty(state) ? '' : state,
    region: isEmpty(region) ? '' : region,
    date: firebaseTime.database.ServerValue.TIMESTAMP
  }
}

export const setTeamData = team => {
  const _clone = cloneDeep(INPUT_FIELDS)
  _clone[0].value = team.get('name')
  store.dispatch(actions.setTeamData(_clone))
  store.dispatch(actions.setTeamImage(team.get('image')))
  store.dispatch(actions.setTeamState(team.get('state')))
  store.dispatch(actions.setTeamRegion(team.get('region')))
}

export const validate = (val, id, model, i) => {
  if (id === 'name') model = model.setIn([i, 'isValid'], val.length > 0)
  else if (id === 'state') model = model.setIn([i, 'isValid'], val.length > 0)
  else if (id === 'region') model = model.setIn([i, 'isValid'], val.length > 0)
  store.dispatch(actions.setTeamData(model))
}
