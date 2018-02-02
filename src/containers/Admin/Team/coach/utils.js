import uuid from 'uuid'

export const buildModel = (model, image) => {
  return {
    id: uuid.v4(),
    name: model.getIn([0, 'value']),
    phone: model.getIn([1, 'value']),
    email: model.getIn([2, 'value']),
    image: image
  }
}
