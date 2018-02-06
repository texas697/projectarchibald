import * as actions from './action'
import * as utils from '../../utils'
import store from '../../redux/store'

export const buildmodel = model => {
  return {
    email: model.getIn([1, 'value']),
    password: model.getIn([2, 'value']),
    name: model.getIn([0, 'value'])
  }
}

export const validate = (val, id, model, i) => {
  if (id === 'email') model = model.setIn([i, 'isValid'], utils.validateEmail(val))
  else if (id === 'name') model = model.setIn([i, 'isValid'], val.length > 0)
  else if (id === 'password') model = model.setIn([i, 'isValid'], val.length > 0)
  else if (id === 'confirmPassword') model = model.setIn([i, 'isValid'], val.length > 0)
  store.dispatch(actions.setRegisterData(model))
}
