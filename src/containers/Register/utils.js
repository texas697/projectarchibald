export const buildmodel = model => {
  return {
    email: model.getIn([1, 'value']),
    password: model.getIn([2, 'value']),
    name: model.getIn([0, 'value'])
  }
}
