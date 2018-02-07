
import {Alert} from 'react-native'
import * as messages from '../messages/index'
import * as config from '../config/index'
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

export const formNotValid = () => Alert.alert(messages.FORM_NOT_VALID.title, messages.FORM_NOT_VALID.body, [{text: 'OK', onPress: () => console.log('')}])
export const passNoMatch = () => Alert.alert(messages.PASS_NO_MATCH.title, messages.ALL_FIELDS_REQUIRED.body, [{text: 'OK', onPress: () => console.log('')}])

export const formatPhone = string => string.replace(/\D+/g, '').replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3')

export const formatQuery = string => string.trim().toLowerCase().replace("'", '').replace('-', '').replace(' ', '')

export const formatNumbers = string => parseInt(string.trim().replace("'", '').replace('-', '').replace(/\D/g, ''))
export const formatTrim = string => string.trim().toLowerCase()

export const formatHeight = string => {
  if (string) return `${string.slice(0, 1)}'${string.slice(1)}`
  else return ''
}

export const validateEmail = email => config.EMAIL_REGEX.test(email)
export const validateNumbers = numbers => {
  if (!numbers) return false
  let isValid = true
  if (!numbers.includes('/')) isValid = false
  if (isNaN(parseInt(numbers.charAt(0)))) isValid = false
  if (isNaN(parseInt(numbers.charAt(1)))) isValid = false
  if (isNaN(parseInt(numbers.charAt(3)))) isValid = false
  if (isNaN(parseInt(numbers.charAt(4)))) isValid = false
  if (numbers.length !== 5) isValid = false

  return isValid
}
