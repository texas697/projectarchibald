import React, { Component } from 'react'
import { StyleSheet } from 'react-native'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Immutable from 'immutable'
import {
  Spinner,
  View
} from 'native-base'
import * as config from '../../config'

const spinnerStyles = StyleSheet.create({
  spinnerContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center'
  },
  spinner: {
    flex: 1,
    alignSelf: 'center'
  }
})

class CustomSpinner extends Component {
  render () {
    const {spinner, color} = this.props
    const isSpinner = spinner.get('isSpinner')
    if (isSpinner) {
      return (
        <View style={spinnerStyles.spinnerContainer}>
          <Spinner color={color || config.COLORS.orange} style={spinnerStyles.spinner} />
        </View>
      )
    } else return false
  }
}

CustomSpinner.propTypes = {
  spinner: PropTypes.instanceOf(Immutable.Map),
  color: PropTypes.string
}

const mapStateToProps = state => ({
  spinner: state.spinner
})

export default connect(mapStateToProps)(CustomSpinner)
