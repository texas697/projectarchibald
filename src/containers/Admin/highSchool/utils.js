import uuid from 'uuid'

export const buildModel = model => {
  return {
    id: uuid.v4(),
    name: model.getIn([0, 'value'])
  }
}
