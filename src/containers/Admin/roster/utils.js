import uuid from 'uuid'
import store from '../../../redux/store'

export const buildModel = model => {
  return {
    id: uuid.v4(),
    name: model.getIn([0, 'value']),
    teamId: store.getState().adminTeam.get('id')
  }
}
