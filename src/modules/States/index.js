// {short: "OR", name: "Oregon", country: "US"}
import Provinces from 'provinces'
import Immutable from 'immutable'

import * as types from '../../types'
import * as config from '../../config'

export const statesFetchRequest = () => {
  let data = []
  Provinces.forEach(x => {
    if (x.country === 'US') {
      data.push({
        value: x.short,
        label: x.name
      })
    }
  })
  // data.unshift(config.EMPTY_OPTION)
  return {
    type: types.STATES_FETCH_REQUEST,
    data
  }
}

const initialState = Immutable.Map({
  data: Immutable.fromJS([])
})

export default (state = initialState, action) => {
  switch (action.type) {
    case types.STATES_FETCH_REQUEST:
      return state
        .set('data', Immutable.fromJS(action.data))

    default:
      return state
  }
}