import React from 'react'
import NB from 'native-base'
import PropTypes from 'prop-types'
import mainStyles from '../../../styles'

const CheckBoxItem = props => (
  <NB.CardItem>
    <NB.Left>
      <NB.Text>{props.label}</NB.Text>
    </NB.Left>
    <NB.Right style={mainStyles.pr15}>
      <NB.CheckBox onPress={props.onPress} checked={props.checked} />
    </NB.Right>
  </NB.CardItem>
)

CheckBoxItem.propTypes = {
  onPress: PropTypes.func,
  checked: PropTypes.bool,
  label: PropTypes.string
}

export default CheckBoxItem
