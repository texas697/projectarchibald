import * as types from '../../types'

export const setVisibleHeight = visibleHeight => {
  return {
    type: types.SET_VISIBLE_HEIGHT,
    visibleHeight
  }
}

export const setVisibleWidth = visibleWidth => {
  return {
    type: types.SET_VISIBLE_WIDTH,
    visibleWidth
  }
}
