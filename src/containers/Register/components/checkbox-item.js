import React from 'react'
import {Left, Right, Text, CardItem, CheckBox} from 'native-base'
import PropTypes from 'prop-types'
import mainStyles from '../../../styles'

const CheckBoxItem = props => (
  <CardItem>
    <Left>
      <Text>{props.label}</Text>
    </Left>
    <Right style={mainStyles.pr15}>
      <CheckBox onPress={props.onPress} checked={props.checked} />
    </Right>
  </CardItem>
)

CheckBoxItem.propTypes = {
  onPress: PropTypes.func,
  checked: PropTypes.bool,
  label: PropTypes.string
}

export default CheckBoxItem
