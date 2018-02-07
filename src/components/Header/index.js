import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Immutable from 'immutable'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import {NavigationActions} from 'react-navigation'
import {
  Header,
  Title,
  Button,
  Icon,
  Left,
  Right,
  Body
} from 'native-base'
// import styles from './style'
import {logoutRequest} from '../../containers/Login/action'

class CustomHeader extends Component {
  componentDidUpdate (prevProps) {
    const {login} = this.props

    const isLoggingOut = login.get('isLoggingOut')
    const _isLoggingOut = prevProps.login.get('isLoggingOut')
    if (isLoggingOut !== _isLoggingOut && !isLoggingOut) {
      this.props.navigation.navigate('Login')
      // const resetAction = NavigationActions.reset({
      //   index: 0,
      //   actions: [
      //     NavigationActions.navigate({routeName: 'Login'})
      //   ]
      // })
      // this.props.navigation.dispatch(resetAction)
    }
  }

  render () {
    return (
      <Header
        hasTabs={this.props.hasTabs}
        androidStatusBarColor='#e65d09'
        iosBarStyle='light-content'
      >
        <Left>
          <Button transparent onPress={() => this.props.navigation.navigate('DrawerOpen')}>
            <Icon name='menu' />
          </Button>
        </Left>
        <Body>
          <Title>{this.props.title}</Title>
        </Body>
        <Right>
          <Button transparent onPress={() => this.props.logoutRequest()}>
            <Icon name='ios-exit' />
          </Button>
        </Right>
      </Header>
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
