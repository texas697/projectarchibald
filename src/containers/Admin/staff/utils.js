import uuid from 'uuid'

export const buildModel = (model, image) => {
  return {
    id: uuid.v4(),
    name: model.getIn([0, 'value']),
    title: model.getIn([1, 'value']),
    image: image
  }
}
