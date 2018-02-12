import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Immutable from 'immutable'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import NB from 'native-base'
import {logoutRequest} from '../../containers/Login/action'

class CustomHeader extends Component {
  componentDidUpdate (prevProps) {
    const {login} = this.props

    const isLoggingOut = login.get('isLoggingOut')
    const _isLoggingOut = prevProps.login.get('isLoggingOut')
    if (isLoggingOut !== _isLoggingOut && !isLoggingOut) {
      this.props.navigation.navigate('Login')
    }
  }

  render () {
    return (
      <NB.Header
        hasTabs={this.props.hasTabs}
        androidStatusBarColor='#e65d09'
        iosBarStyle='light-content'
      >
        <NB.Left>
          <NB.Button transparent onPress={() => this.props.navigation.navigate('DrawerOpen')}>
            <NB.Icon name='menu' />
          </NB.Button>
        </NB.Left>
        <NB.Body>
          <NB.Title>{this.props.title}</NB.Title>
        </NB.Body>
        <NB.Right>
          <NB.Button transparent onPress={() => this.props.logoutRequest()}>
            <NB.Icon name='ios-exit' />
          </NB.Button>
        </NB.Right>
      </NB.Header>
    )
  }
}

CustomHeader.propTypes = {
  login: PropTypes.instanceOf(Immutable.Map),
  navigation: PropTypes.object,
  logoutRequest: PropTypes.func,
  title: PropTypes.string,
  hasTabs: PropTypes.bool
}

const mapDispatchToProps = dispatch => bindActionCreators({
  logoutRequest: () => logoutRequest()
}, dispatch)

const mapStateToProps = state => ({
  login: state.login
})

export default connect(mapStateToProps, mapDispatchToProps)(CustomHeader)
