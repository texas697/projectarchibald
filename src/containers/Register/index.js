import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import forOwn from 'lodash/forOwn'
import {Image, KeyboardAvoidingView} from 'react-native'
import Immutable from 'immutable'
import isEmpty from 'lodash/isEmpty'
import { connect } from 'react-redux'
import NB from 'native-base'
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
import CheckBoxItem from './components/checkbox-item'

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
    NB.Toast.show(config.TOAST_ERROR(error))
  }

  _focusNext (nextField) {
    if (nextField === 'go') this._onSubmit()
    else this.refs[nextField]._root.focus()
  }

  _onSubmit () {
    const {register} = this.props
    const model = register.get('model')
    const _roles = {
      isCoach: register.get('isCoach'),
      isRecruiter: register.get('isRecruiter'),
      isPlayer: register.get('isPlayer'),
      isParent: register.get('isParent'),
      isCoordinator: register.get('isCoordinator')
    }

    let _checkRoles = true
    forOwn(_roles, value => {
      if (!value) _checkRoles = false
    })

    const _passCheck = model.get('password') === model.get('confirmPassword')
    const _check = model.find(item => !item.get('value'))
    if (_check && _passCheck) utils.formNotValid()
    else if (_check && !_passCheck) utils.passNoMatch()
    else if (!_checkRoles) utils.noRoleSelected()
    else {
      this.props.setSpinner(true)
      const _model = localUtils.buildmodel(model)
      const credentials = {email: _model.email.toLowerCase().trim(), password: _model.password}

      if (_roles.isCoach) this._isCoach(credentials, _model)
      else this.props.registerUserRequest(credentials, _model.name)
    }
  }

  _isCoach (credentials, _model) {
    const {adminTeam} = this.props
    const _image = adminTeam.get('image')
    const _state = adminTeam.get('state')
    const _region = adminTeam.get('region')
    let _modelTeam = adminTeam.get('model')

    _modelTeam = teamUtils.buildModel(_modelTeam, _image, _state, _region)

    let _checkTeam = true
    forOwn(_modelTeam, value => {
      if (isEmpty(value)) _checkTeam = false
    })

    if (_checkTeam) {
      this.props.registerUserRequest(credentials, _model.name)
      this.props.fetchTeamByIdSuccess(_modelTeam)
      this.props.setTeamId(_modelTeam.id)
      this.props.addTeamRequest(_modelTeam)
    } else utils.formNotValid()
  }

  _onInputChange (val, i) {
    const {register} = this.props
    let model = register.get('model')
    model = model.setIn([i, 'value'], val)
    this.props.setRegisterData(model)
  }

  _success () {
    NB.Toast.show(config.TOAST_SUCCESS)
    this.props.navigation.navigate('Home')
    this.props.setSpinner(false)
  }

  render () {
    const {register} = this.props
    const isCoach = register.get('isCoach')
    const isRecruiter = register.get('isRecruiter')
    const isPlayer = register.get('isPlayer')
    const isParent = register.get('isParent')
    const isCoordinator = register.get('isCoordinator')
    const model = register.get('model')
    return (
      <NB.Container style={mainStyles.container}>
        <NB.Header>
          <NB.Left>
            <NB.Button transparent onPress={() => this.props.navigation.goBack()}>
              <NB.Icon name='arrow-back' />
            </NB.Button>
          </NB.Left>
          <NB.Body><NB.Title>&nbsp;</NB.Title></NB.Body>
          <NB.Right />
        </NB.Header>
        <KeyboardAvoidingView style={mainStyles.scrollContainer} behavior='padding'>
          <NB.Content>
            <NB.Card>
              <NB.CardItem>
                <Image source={logo} style={{height: 200, width: null, flex: 1}} />
              </NB.CardItem>
              <NB.CardItem style={mainStyles.alignItemsRight}>
                <NB.Text style={mainStyles.helperText}>{config.REQUIRED_LABEL}</NB.Text>
              </NB.CardItem>
              {model.map((item, i) => (
                <NB.CardItem key={i} style={mainStyles.alignStretch}>
                  <NB.Item stackedLabel error={!item.get('isValid')}>
                    <NB.Label>{item.get('label')}</NB.Label>
                    <NB.Input
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
                    {!item.get('isValid') && (<NB.Text style={mainStyles.errorText}>{item.get('error')}</NB.Text>)}
                  </NB.Item>
                </NB.CardItem>
              ))}
              {isCoach && (<NB.CardItem style={mainStyles.alignStretch}><TeamCard onSubmit={this._onSubmit} /></NB.CardItem>)}
              <NB.CardItem><NB.Text style={{color: 'white'}}>SPACER</NB.Text></NB.CardItem>
              <NB.CardItem><NB.Label>I am (select one)</NB.Label></NB.CardItem>
              <CheckBoxItem
                label='Summer Team Coach/Administrator'
                checked={isCoach}
                onPress={() => this.props.setIsCoach()}
              />
              <NB.CardItem><NB.Text style={{color: 'white'}}>SPACER</NB.Text></NB.CardItem>
              <CheckBoxItem
                label='College Recruiter'
                checked={isRecruiter}
                onPress={() => this.props.setIsRecruiter()}
              />
              <NB.CardItem><NB.Text style={{color: 'white'}}>SPACER</NB.Text></NB.CardItem>
              <CheckBoxItem
                label='Player'
                checked={isPlayer}
                onPress={() => this.props.setIsPlayer()}
              />
              <NB.CardItem><NB.Text style={{color: 'white'}}>SPACER</NB.Text></NB.CardItem>
              <CheckBoxItem
                label='Parent'
                checked={isParent}
                onPress={() => this.props.setIsParent()}
              />
              <NB.CardItem><NB.Text style={{color: 'white'}}>SPACER</NB.Text></NB.CardItem>
              <CheckBoxItem
                label='Event Coordinator'
                checked={isCoordinator}
                onPress={() => this.props.setIsCoordinator()}
              />
              <NB.CardItem><NB.Text style={{color: 'white'}}>SPACER</NB.Text></NB.CardItem>
              <NB.CardItem style={mainStyles.alignStretch}>
                <NB.Button
                  onPress={this._onSubmit}
                  block
                  dark>
                  <NB.Text>Register</NB.Text>
                </NB.Button>
              </NB.CardItem>
            </NB.Card>
          </NB.Content>
        </KeyboardAvoidingView>
        <CustomSpinner />
      </NB.Container>
    )
  }
}

Register.propTypes = {
  setRegisterData: PropTypes.func,
  registerUserRequest: PropTypes.func,
  setIsCoach: PropTypes.func,
  setIsRecruiter: PropTypes.func,
  setIsPlayer: PropTypes.func,
  setIsParent: PropTypes.func,
  setIsCoordinator: PropTypes.func,
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
  setIsRecruiter: () => actions.setIsRecruiter(),
  setIsPlayer: () => actions.setIsPlayer(),
  setIsParent: () => actions.setIsParent(),
  setIsCoordinator: () => actions.setIsCoordinator(),
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
