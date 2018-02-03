
import {Alert} from 'react-native'
import * as messages from '../messages/index'
import store from '../redux/store'
import {resetRegisterUserRequest} from '../containers/Register/action'
import {addRolesRequest} from '../modules/Roles/action'
import {addTeamRequest} from '../containers/Admin/team/action'

export const buildOptions = data => {
  return data.map(x => {
    return {
      value: x.id,
      label: x.name
    }
  })
}

export const updateProfile = (user, name, isCoach) => {
  user.updateProfile({displayName: name})
    .then(() => {
      store.dispatch(resetRegisterUserRequest())
    }).catch(error => console.log(error))
  store.dispatch(addRolesRequest({uid: user.uid, isCoach: isCoach}))
  if (isCoach) {
    store.dispatch(addTeamRequest({
      id: store.getState().adminTeam.get('id'),
      image: store.getState().adminTeam.get('image'),
      name: store.getState().adminTeam.getIn(['model', 0, 'value'])
    }))
  }
}

export const fieldsRequired = () => Alert.alert(messages.ALL_FIELDS_REQUIRED.title, messages.ALL_FIELDS_REQUIRED.body, [{text: 'OK', onPress: () => console.log('OK Pressed')}], { cancelable: false })
export const passNoMatch = () => Alert.alert(messages.PASS_NO_MATCH.title, messages.ALL_FIELDS_REQUIRED.body, [{text: 'OK', onPress: () => console.log('OK Pressed')}], { cancelable: false })
