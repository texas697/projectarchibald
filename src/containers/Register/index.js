import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import forOwn from 'lodash/forOwn'
import {Image, KeyboardAvoidingView} from 'react-native'
import Immutable from 'immutable'
import { connect } from 'react-redux'
import {Container, Content, Input, Icon, Button, Item, Label, Toast, Header, Left, Title, Body, Right, Text, CardItem, Card, CheckBox, Radio, List} from 'native-base'
import * as utils from '../../utils/index'
import mainStyles from '../../styles/index'
import * as actions from './action'
import {setSpinner} from '../../modules/Spinner/action'
import * as config from '../../config/index'
import CustomSpinner from '../../components/Spinner'
import TeamCard from '../Admin/team/components/team-card'
import * as localUtils from './utils'
import {setTeamId, resetTeamData, addTeamRequest, fetchTeamByIdSuccess} from '../Admin/team/action'
import {resetCoachData} from '../Admin/coach/action'
import {resetHsData} from '../Admin/highSchool/action'
import {resetPlayerData} from '../Admin/players/action'
import {resetRosterData} from '../Admin/roster/action'
import {resetStaffData} from '../Admin/staff/action'
import * as teamUtils from '../Admin/team/utils'
import isEmpty from 'lodash/isEmpty'

const logo = require('../../../assets/basketball-logo.png')

class Register extends Component {
  constructor (props) {
    super(props)
    this._onSubmit = this._onSubmit.bind(this)
  }

  componentDidMount () {
    this.props.resetTeamData()
    this.props.resetCoachData()
    this.props.resetHsData()
    this.props.resetPlayerData()
    this.props.resetRosterData()
    this.props.resetStaffData()
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
    this.props.setSpinner(false)
    Toast.show(config.TOAST_ERROR(error))
  }

  _focusNext (nextField) {
    if (nextField === 'go') this._onSubmit()
    else this.refs[nextField]._root.focus()
  }

  _onSubmit () {
    const {register, adminTeam} = this.props
    const isCoach = register.get('isCoach')
    const model = register.get('model')

    const _passCheck = model.get('password') === model.get('confirmPassword')
    const _check = model.find(item => !item.get('value'))
    if (_check && _passCheck) utils.formNotValid()
    else if (_check && !_passCheck) utils.passNoMatch()
    else {
      this.props.setSpinner(true)
      const _model = localUtils.buildmodel(model)
      const credentials = {email: _model.email.toLowerCase().trim(), password: _model.password}
      this.props.registerUserRequest(credentials, _model.name)
      if (isCoach) {
        const _image = adminTeam.get('image')
        const _state = adminTeam.get('state')
        const _region = adminTeam.get('region')
        let _modelTeam = adminTeam.get('model')

        _modelTeam = teamUtils.buildModel(_modelTeam, _image, _state, _region)

        let _checkTeam = true
        forOwn(_modelTeam, (value, key) => {
          if (isEmpty(value)) _checkTeam = false
        })

        if (_checkTeam) {
          this.props.fetchTeamByIdSuccess(_modelTeam)
          this.props.setTeamId(_modelTeam.id)
          this.props.addTeamRequest(_modelTeam)
        } else utils.formNotValid()
      }
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
    this.props.setSpinner(false)
  }

  render () {
    const {register} = this.props
    const isCoach = register.get('isCoach')
    const model = register.get('model')
    return (
      <Container style={mainStyles.container}>
        <Header>
          <Left>
            <Button transparent onPress={() => this.props.navigation.goBack()}>
              <Icon name='arrow-back' />
            </Button>
          </Left>
          <Body><Title>&nbsp;</Title></Body>
          <Right />
        </Header>
        <KeyboardAvoidingView style={mainStyles.scrollContainer} behavior='padding'>
          <Content>
            <Card>
              <CardItem>
                <Image source={logo} style={{height: 200, width: null, flex: 1}} />
              </CardItem>
              <CardItem style={mainStyles.alignItemsRight}>
                <Text style={mainStyles.helperText}>{config.REQUIRED_LABEL}</Text>
              </CardItem>
              {model.map((item, i) => (
                <CardItem key={i} style={mainStyles.alignStretch}>
                  <Item stackedLabel error={!item.get('isValid')}>
                    <Label>{item.get('label')}</Label>
                    <Input
                      ref={item.get('id')}
                      autoCapitalize={item.get('autoCapitalize')}
                      secureTextEntry={item.get('secureTextEntry')}
                      value={item.get('value')}
                      onBlur={() => localUtils.validate(item.get('value'), item.get('id'), model, i)}
                      placeholder={item.get('placeholder')}
                      keyboardType={item.get('keyboardType')}
                      returnKeyType={item.get('returnKeyType')}
                      onSubmitEditing={() => this._focusNext(item.get('nextId'))}
                      onChangeText={val => this._onInputChange(val, i)} />
                    {!item.get('isValid') && (<Text style={mainStyles.errorText}>{item.get('error')}</Text>)}
                  </Item>
                </CardItem>
              ))}
              {isCoach && (<CardItem style={mainStyles.alignStretch}><TeamCard onSubmit={this._onSubmit} /></CardItem>)}
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
              <CardItem style={mainStyles.alignStretch}>
                <Button
                  onPress={this._onSubmit}
                  block
                  dark>
                  <Text>Register</Text>
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
  resetTeamData: PropTypes.func,
  resetCoachData: PropTypes.func,
  resetHsData: PropTypes.func,
  resetPlayerData: PropTypes.func,
  resetRosterData: PropTypes.func,
  resetStaffData: PropTypes.func,
  fetchTeamByIdSuccess: PropTypes.func,
  addTeamRequest: PropTypes.func,
  setTeamId: PropTypes.func,
  navigation: PropTypes.object,
  register: PropTypes.instanceOf(Immutable.Map),
  adminTeam: PropTypes.instanceOf(Immutable.Map)
}

const mapStateToProps = state => ({
  register: state.register,
  adminTeam: state.adminTeam
})

const mapDispatchToProps = dispatch => bindActionCreators({
  registerUserRequest: (credentials, name) => actions.registerUserRequest(credentials, name),
  setSpinner: isSpinner => setSpinner(isSpinner),
  setRegisterData: model => actions.setRegisterData(model),
  setIsCoach: () => actions.setIsCoach(),
  setTeamId: id => setTeamId(id),
  resetTeamData: () => resetTeamData(),
  resetCoachData: () => resetCoachData(),
  resetHsData: () => resetHsData(),
  resetPlayerData: () => resetPlayerData(),
  resetRosterData: () => resetRosterData(),
  resetStaffData: () => resetStaffData(),
  addTeamRequest: model => addTeamRequest(model),
  fetchTeamByIdSuccess: team => fetchTeamByIdSuccess(team)
}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Register)
