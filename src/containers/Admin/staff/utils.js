import uuid from 'uuid'
import firebaseTime from 'firebase'
import store, {firebaseApp} from '../../../redux/store'
import {INPUT_FIELDS} from './config'
import * as actions from './action'

export const buildModel = (model, image) => {
  return {
    id: uuid.v4(),
    name: model.getIn([0, 'value']),
    title: model.getIn([1, 'value']),
    image: image,
    teamId: store.getState().adminTeam.get('id'),
    date: firebaseTime.database.ServerValue.TIMESTAMP
  }
}

const _fetchStaff = id => firebaseApp.database().ref(`staff`).orderByChild('id').equalTo(id).once('value').then(snapshot => Object.values(snapshot.val()))

export const setStaffData = teamData => {
  let _staff = []
  let _counter = 0
  let _length = teamData.staff.length
  teamData.players.forEach(id => {
    _fetchStaff(id).then(result => {
      _counter++
      _staff.push(result)
      if (_counter >= _length) {
        console.log(_staff)
      }
    })
  })
}
