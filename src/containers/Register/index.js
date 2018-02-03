import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import {Alert, Image, KeyboardAvoidingView} from 'react-native'
import Immutable from 'immutable'
import { connect } from 'react-redux'
import {Container, Content, Input, Icon, Button, Item, Label, Toast, Header, Left, Title, Body, Right, Text, CardItem, Card, CheckBox, Radio, List} from 'native-base'
import styles from './styles'
import mainStyles from '../../styles/index'
import * as actions from './action'
import {setSpinner} from '../../modules/Spinner/action'
import * as messages from '../../messages/index'
import * as config from '../../config/index'
import CustomSpinner from '../../components/Spinner'
const logo = require('../../../assets/basketball-logo.png')

class Register extends Component {
  constructor (props) {
    super(props)
    this._onSubmit = this._onSubmit.bind(this)
  }

  componentDidUpdate (prevProps) {
    const {register} = this.props
    const isRegistering = register.get('isRegistering')
    const _isRegistering = prevProps.register.get('isRegistering')
    if (isRegistering !== _isRegistering && !isRegistering) this._success()
    const error = register.get('error')
    const _error = prevProps.register.get('error')
    if (error !== _error) this._onError(error)
  }

  _onError (error) {
    this.props.setSpinner()
    Toast.show(config.TOAST_ERROR(error))
  }

  _focusNext (nextField) {
    this[nextField]._root.focus()
  }

  _onSubmit () {
    const {register} = this.props
    const model = register.get('model')
    const _check = model.find(item => !item.get('value'))
    if (_check) {
      Alert.alert(
        messages.ALL_FIELDS_REQUIRED.title,
        messages.ALL_FIELDS_REQUIRED.body,
        [{text: 'OK', onPress: () => console.log('OK Pressed')}], { cancelable: false }
      )
    } else if (model.get('password') !== model.get('confirmPassword')) {
      Alert.alert('Passwords', 'Do not Match!', [{text: 'OK', onPress: () => console.log('OK Pressed')}])
    } else {
      this.props.setSpinner()
      const email = register.getIn(['model', 1, 'value'])
      const password = register.getIn(['model', 2, 'value'])
      const name = register.getIn(['model', 0, 'value'])
      const credentials = {email, password}
      this.props.registerUserRequest(credentials, name)
    }
  }

  _onInputChange (val, i) {
    const {register} = this.props
    let model = register.get('model')
    model = model.setIn([i, 'value'], val)
    this.props.setRegisterData(model)
  }

  _success () {
    Toast.show(config.TOAST_SUCCESS)
    this.props.navigation.goBack()
    this.props.setSpinner()
  }

  render () {
    const {register} = this.props
    const isCoach = register.get('isCoach')
    const model = register.get('model')

    return (
      <Container style={mainStyles.container}>
        <Header style={{marginBottom: -15}}>
          <Left>
            <Button transparent onPress={() => this.props.navigation.goBack()}>
              <Icon name='arrow-back' />
            </Button>
          </Left>
          <Body><Title>&nbsp;</Title></Body>
          <Right />
        </Header>
        <KeyboardAvoidingView style={mainStyles.container} behavior='padding'>
          <Content>
            <Card>
              <CardItem>
                <Image source={logo} style={{height: 200, width: null, flex: 1}} />
              </CardItem>
              {model.map((item, i) => (
                <CardItem key={i}>
                  <Item floatingLabel last>
                    <Label style={mainStyles.labelHeight}>{item.get('label')}</Label>
                    <Input
                      getRef={ref => { this[item.get('id')] = ref }}
                      secureTextEntry={item.get('password') && item.get('confirmPassword')}
                      value={item.get('value')}
                      returnKeyType={item.get('returnKeyType')}
                      onSubmitEditing={() => this._focusNext(item.get('nextId'))}
                      onChangeText={val => this._onInputChange(val, i)} />
                  </Item>
                </CardItem>
              ))}
              <CardItem><Text style={{color: 'white'}}>SPACER</Text></CardItem>
              <CardItem>
                <Left>
                  <Text>Coach?</Text>
                </Left>
                <Right style={mainStyles.pr15}>
                  <CheckBox onPress={() => this.props.setIsCoach()} checked={isCoach} />
                </Right>
              </CardItem>
              <CardItem><Text style={{color: 'white'}}>SPACER</Text></CardItem>
              <CardItem style={mainStyles.submitBtnCard}>
                <Button
                  onPress={this._onSubmit}
                  block
                  warning>
                  <Text>Submit</Text>
                </Button>
              </CardItem>
            </Card>
          </Content>
        </KeyboardAvoidingView>
        <CustomSpinner />
      </Container>
    )
  }
}

Register.propTypes = {
  setRegisterData: PropTypes.func,
  registerUserRequest: PropTypes.func,
  setIsCoach: PropTypes.func,
  setSpinner: PropTypes.func,
  navigation: PropTypes.object,
  register: PropTypes.instanceOf(Immutable.Map)
}

const mapStateToProps = state => ({
  register: state.register
})

const mapDispatchToProps = dispatch => bindActionCreators({
  registerUserRequest: (credentials, name) => actions.registerUserRequest(credentials, name),
  setSpinner: () => setSpinner(),
  setRegisterData: model => actions.setRegisterData(model),
  setIsCoach: () => actions.setIsCoach()
}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Register)
