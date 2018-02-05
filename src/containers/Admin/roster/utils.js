import uuid from 'uuid'
import firebaseTime from 'firebase'
import store from '../../../redux/store'

export const buildModel = model => {
  const _state = store.getState()
  return {
    id: _state.adminRoster.get('id') || uuid.v4(),
    teamId: _state.adminTeam.get('id'),
    hsId: _state.adminHS.get('id'),
    coachId: _state.adminCoach.get('id'),
    player: _state.adminRoster.get('player').toJS(),
    staff: _state.adminRoster.get('staff').toJS(),
    date: firebaseTime.database.ServerValue.TIMESTAMP
  }
}
