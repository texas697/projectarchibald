import uuid from 'uuid'
import firebaseTime from 'firebase'
import store, {firebaseApp} from '../../../redux/store'
import {INPUT_FIELDS} from './config'
import * as actions from './action'

export const buildModel = (model, image) => {
  return {
    id: uuid.v4(),
    name: model.getIn([0, 'value']),
    phone: model.getIn([1, 'value']),
    email: model.getIn([2, 'value']),
    image: image,
    teamId: store.getState().adminTeam.get('id'),
    date: firebaseTime.database.ServerValue.TIMESTAMP
  }
}

const _fetchPlayer = id => firebaseApp.database().ref(`player`).orderByChild('id').equalTo(id).once('value').then(snapshot => Object.values(snapshot.val()))

export const setPlayersData = teamData => {
  let _players = []
  let _counter = 0
  let _length = teamData.players.length
  teamData.players.forEach(id => {
    _fetchPlayer(id).then(result => {
      _counter++
      _players.push(result)
      if (_counter >= _length) {
        console.log(_players)
      }
    })
  })
}
