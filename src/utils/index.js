
import {Alert} from 'react-native'
import * as messages from '../messages/index'
import store from '../redux/store'
import {resetRegisterUserRequest} from '../containers/Register/action'
import {addRolesRequest} from '../modules/Roles/action'
import {addTeamRequest} from '../containers/Admin/team/action'
import {addTeamsRequest} from '../modules/Teams/action'
import * as teamsUtils from '../modules/Teams/utils'

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
    teamsUtils.buildModel().then(model => store.dispatch(addTeamsRequest(model)))
  }
}

export const fieldsRequired = () => Alert.alert(messages.ALL_FIELDS_REQUIRED.title, messages.ALL_FIELDS_REQUIRED.body, [{text: 'OK', onPress: () => console.log('OK Pressed')}], { cancelable: false })
export const passNoMatch = () => Alert.alert(messages.PASS_NO_MATCH.title, messages.ALL_FIELDS_REQUIRED.body, [{text: 'OK', onPress: () => console.log('OK Pressed')}], { cancelable: false })

export const formatPhone = string => string.replace(/\D+/g, '').replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3')

export const formatQuery = string => string.trim().toLowerCase().replace("'", '').replace('-', '').replace(' ', '')

export const formatNumbers = string => parseInt(string.trim().replace("'", '').replace('-', '').replace(/\D/g, ''))
export const formatTrim = string => string.trim().toLowerCase()

export const formatHeight = string => `${string.slice(0, 1)}'${string.slice(1)}`
