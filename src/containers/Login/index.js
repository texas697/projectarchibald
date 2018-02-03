import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import {Image, Dimensions, KeyboardAvoidingView} from 'react-native'
import Modal from 'react-native-modal'
import Immutable from 'immutable'
import { connect } from 'react-redux'
import {Content, Text, Label, Input, Item, CardItem, Card, Button, Toast, Col} from 'native-base'
import styles from './styles'
import mainStyles from '../../styles/index'
import * as actions from './action'
import * as config from '../../config'
import {setVisibleHeight, setVisibleWidth} from '../../modules/Dimensions/action'
import {setSpinner} from '../../modules/Spinner/action'
import CustomSpinner from '../../components/Spinner'
import ContactUs from '../Contact/index'
import ForgotPassword from '../ForgotPass/index'
import * as utils from '../../utils/index'

const logo = require('../../../assets/basketball-logo.png')

class Login extends Component {
  constructor (props) {
    super(props)
    this._onSubmit = this._onSubmit.bind(this)
    this._focusNext = this._focusNext.bind(this)
    this.state = {
      resetEmail: '',
      email: 'texas697@gmail.com',
      password: 'pass123'
      // email: '',
      // password: ''
    }
  }

  componentDidUpdate (prevProps) {
    const {login} = this.props
    const isAuthenticated = login.get('isAuthenticated')
    const _isAuthenticated = prevProps.login.get('isAuthenticated')
    const isReseting = login.get('isReseting')
    const _isReseting = prevProps.login.get('isReseting')
    const error = login.get('error')
    const _error = prevProps.login.get('error')
    if (error !== _error) this._onError(error)
    if (isAuthenticated !== _isAuthenticated && isAuthenticated) this._goToHome()
    if (isReseting !== _isReseting && !isReseting) this._onSuccessReset()
  }

  componentDidMount () {
    const height = Dimensions.get('window').height
    const width = Dimensions.get('window').width
    this.props.setVisibleHeight(height)
    this.props.setVisibleWidth(width)
  }

  _onSuccessReset () {
    this.setState({resetEmail: '', password: ''})
    this.props.toggleForgotPass()
  }

  _onError (error) {
    this.props.setSpinner()
    Toast.show(config.TOAST_ERROR(error))
  }

  _goToHome () {
    this.props.setSpinner()
    this.props.navigation.navigate('Home')
  }

  _focusNext (nextField) {
    this[nextField]._root.focus()
  }

  _onSubmit () {
    const { email, password } = this.state
    if (!email || !password) utils.fieldsRequired()
    else {
      const credentials = { email, password }
      this.props.loginRequest(credentials)
    }
  }

  render () {
    const {email, password} = this.state
    const {dimensions, login} = this.props
    const visibleHeight = dimensions.get('visibleHeight')
    const visibleModal = login.get('visibleModal')
    const visibleForgotModal = login.get('visibleForgotModal')
    return (
      <KeyboardAvoidingView style={mainStyles.container} behavior='padding'>
        <Content>
          <Card>
            <CardItem>
              <Image source={logo} style={styles.logo} />
            </CardItem>
            <CardItem style={{marginTop: visibleHeight / 17}}>
              <Item floatingLabel>
                <Label style={mainStyles.labelHeight}>Email</Label>
                <Input
                  ref='email'
                  onSubmitEditing={() => this._focusNext('passwordInput')}
                  returnKeyType='next'
                  keyboardType='email-address'
                  value={email}
                  onChangeText={email => this.setState({ email })} />
              </Item>
            </CardItem>
            <CardItem>
              <Item floatingLabel>
                <Label style={mainStyles.labelHeight}>Password</Label>
                <Input
                  getRef={ref => { this.passwordInput = ref }}
                  secureTextEntry
                  value={password}
                  returnKeyType='go'
                  onSubmitEditing={this._onSubmit}
                  onChangeText={password => this.setState({ password })}
                />
              </Item>
            </CardItem>
            <CardItem style={mainStyles.submitBtnCard}>
              <Button
                onPress={this._onSubmit}
                block
                warning>
                <Text>Login</Text>
              </Button>
              <Button transparent style={styles.forgotBtn} onPress={() => this.props.toggleForgotPass()}>
                <Text style={[styles.forgotFont]}>Forgot Password</Text>
              </Button>
            </CardItem>
            <CardItem transparent style={mainStyles.pt0}>
              <Col>
                <Button transparent style={styles.contactBtn} onPress={() => this.props.toggleContactUs()}>
                  <Text style={styles.smFont}>Contact Us</Text>
                </Button>
              </Col>
              <Col>
                <Button transparent style={styles.registerBtn} onPress={() => this.props.navigation.navigate('Register')}>
                  <Text style={styles.smFont}>Register</Text>
                </Button>
              </Col>
            </CardItem>
          </Card>
        </Content>
        <CustomSpinner />
        <Modal
          swipeDirection={'right'}
          isVisible={visibleForgotModal}
          onBackButtonPress={() => this.props.toggleForgotPass()}
          animationIn={'slideInUp'}
          animationOut={'slideOutDown'}>
          <ForgotPassword
            {...this.state}
            onChange={resetEmail => this.setState({resetEmail})}
            onSubmit={() => this.props.resetPasswordRequest(this.state.resetEmail)}
          />
        </Modal>
        <Modal
          swipeDirection={'right'}
          isVisible={visibleModal}
          onBackButtonPress={() => this.props.toggleContactUs()}
          animationIn={'slideInUp'}
          animationOut={'slideOutDown'}>
          <ContactUs />
        </Modal>
      </KeyboardAvoidingView>
    )
  }
}

Login.propTypes = {
  navigation: PropTypes.object,
  loginRequest: PropTypes.func,
  setVisibleHeight: PropTypes.func,
  setVisibleWidth: PropTypes.func,
  toggleContactUs: PropTypes.func,
  toggleForgotPass: PropTypes.func,
  setSpinner: PropTypes.func,
  resetPasswordRequest: PropTypes.func,
  login: PropTypes.instanceOf(Immutable.Map),
  dimensions: PropTypes.instanceOf(Immutable.Map)
}

const mapStateToProps = state => ({
  login: state.login,
  dimensions: state.dimensions
})

const mapDispatchToProps = dispatch => bindActionCreators({
  loginRequest: credentials => actions.loginRequest(credentials),
  resetPasswordRequest: email => actions.resetPasswordRequest(email),
  toggleContactUs: () => actions.toggleContactUs(),
  toggleForgotPass: () => actions.toggleForgotPass(),
  setVisibleHeight: height => setVisibleHeight(height),
  setVisibleWidth: width => setVisibleWidth(width),
  setSpinner: () => setSpinner()
}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login)
