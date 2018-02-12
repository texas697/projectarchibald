import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {Image, ListView, Alert} from 'react-native'
import isEmpty from 'lodash/isEmpty'
import cloneDeep from 'lodash/cloneDeep'
import ReactTimeout from 'react-timeout'
import { ImagePicker } from 'expo'
import { bindActionCreators } from 'redux'
import NB from 'native-base'
import Immutable from 'immutable'
import { connect } from 'react-redux'
import styles from './styles'
import * as mainUtils from '../../../utils/index'
import mainStyles from '../../../styles/index'
import * as actions from './action'
import * as config from '../../../config/index'
import * as messages from '../../../messages/index'
import * as utils from './utils'
import {INPUT_FIELDS} from './config'
import CustomSpinner from '../../../components/Spinner'
import {setSpinner} from '../../../modules/Spinner/action'

class Player extends Component {
  constructor (props) {
    super(props)
    this._onSubmit = this._onSubmit.bind(this)
    this._onInputChange = this._onInputChange.bind(this)
    this._onPickImage = this._onPickImage.bind(this)
    this._onClearFields = this._onClearFields.bind(this)
    this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => !Immutable.is(r1, r2) })
  }

  componentDidMount () {
    this._onClearFields()
  }

  async _onPickImage () {
    let result = await ImagePicker.launchImageLibraryAsync(config.IMAGE_OPTIONS)
    if (!result.cancelled) this.props.setPlayerImage(result.base64)
  }

  componentDidUpdate (prevProps) {
    const {adminPlayer} = this.props
    const isFetching = adminPlayer.get('isFetching')
    const _isFetching = prevProps.adminPlayer.get('isFetching')
    const isAdding = adminPlayer.get('isAdding')
    const _isAdding = prevProps.adminPlayer.get('isAdding')
    const error = adminPlayer.get('error')
    const _error = prevProps.adminPlayer.get('error')
    if (error !== _error) {
      this.props.setSpinner(false)
      NB.Toast.show(config.TOAST_ERROR(error))
    }
    if (isAdding !== _isAdding && !isAdding) {
      this.props.setSpinner(false)
      NB.Toast.show(config.TOAST_SUCCESS)
    }
    const player = adminPlayer.get('player')
    if (isFetching !== _isFetching && !isFetching) utils.setPlayerData(player)
  }

  _focusNext (nextField) {
    if (nextField === 'go') this._onSubmit()
    else this.refs[nextField]._root.focus()
  }

  _onInputChange (val, i) {
    const {adminPlayer} = this.props
    let model = adminPlayer.get('model')
    if (i === 5 && val.length > 10) return false
    if (i === 7 && val.length > 10) return false
    model = model.setIn([i, 'value'], val)
    this.props.setPlayerData(model)
  }

  _onSubmit () {
    const {adminPlayer} = this.props
    const model = adminPlayer.get('model')
    const id = adminPlayer.get('id')
    const _check = model.find(item => !item.get('isValid'))
    const _emptyFields = utils.checkValue(model)
    if (_check || !_emptyFields) mainUtils.formNotValid()
    else {
      let _message = {}
      if (id) _message = messages.UPDATE_PLAYER(model.get(0).value)
      else _message = messages.ADD_PLAYER(model.get(0).value)
      Alert.alert(_message.title, _message.body, [{text: 'Cancel', onPress: () => console.log(''), style: 'cancel'}, {text: 'OK', onPress: () => this._onConfirmSubmit()}])
    }
  }

  _onConfirmSubmit () {
    const {adminPlayer} = this.props
    this.props.setSpinner(true)
    const model = adminPlayer.get('model')
    const image = adminPlayer.get('image')
    const ageGroup = adminPlayer.get('ageGroup')
    const _model = utils.buildModel(model, image, ageGroup)
    this.props.setPlayerId(_model.id)
    this.props.addPlayerRequest(_model)
    this.props.setTimeout(() => this._onClearFields(), 1000)
  }

  _onSelectPlayer (data) {
    this.props.fetchPlayerByIdRequest(data.get('id'))
  }

  _onDeletePlayer (data) {
    const _message = messages.DELETE_PLAYER(data.get('name'))
    Alert.alert(_message.title, _message.body, [{text: 'Cancel', onPress: () => console.log(''), style: 'cancel'}, {text: 'OK', onPress: () => this._onConfirmDelete(data)}])
  }

  _onConfirmDelete (data) {
    this.props.deletePlayerRequest(data.get('id'))
    this._onClearFields()
  }

  _onClearFields () {
    const _clone = cloneDeep(INPUT_FIELDS)
    this.props.setPlayerData(_clone)
    this.props.setPlayerImage('')
    this.props.setPlayerId('')
  }

  render () {
    const {adminPlayer} = this.props
    const model = adminPlayer.get('model')
    const image = adminPlayer.get('image')
    const ageGroup = adminPlayer.get('ageGroup')
    const data = adminPlayer.get('data')
    const id = adminPlayer.get('id')

    return (
      <NB.View>
        <NB.Card>
          {id !== '' && (
            <NB.CardItem style={mainStyles.alignItemsRight}>
              <NB.Button small danger iconLeft onPress={this._onClearFields}>
                <NB.Icon name='ios-close-circle' />
                <NB.Text>Clear Fields</NB.Text>
              </NB.Button>
            </NB.CardItem>
          )}
          <NB.CardItem style={mainStyles.alignItemsRight}>
            <NB.Text style={mainStyles.helperText}>{config.REQUIRED_LABEL}</NB.Text>
          </NB.CardItem>
          <NB.CardItem>
            <NB.Button
              onPress={this._onPickImage}
              block
              transparent>
              <NB.Text>Select Player Image</NB.Text>
            </NB.Button>
          </NB.CardItem>
          {!isEmpty(image) && (
            <NB.CardItem style={mainStyles.alignItemsCenter}>
              <Image source={{ uri: config.IMAGE_64(image) }} style={mainStyles.imagePick} />
            </NB.CardItem>
          )}
          <NB.CardItem style={[styles.alignItemsCenter]}>
            <NB.Label style={mainStyles.selectLabel}>Age Group</NB.Label>
          </NB.CardItem>
          <NB.CardItem style={mainStyles.alignStretch}>
            <NB.Picker
              placeholder='-Select-'
              textStyle={{color: '#000'}}
              iosHeader='Select one'
              mode='dropdown'
              selectedValue={ageGroup}
              onValueChange={this.props.setPlayerAgeGroup}
            >
              {config.AGE_GROUP_OPTIONS.map((item, i) => (
                <NB.Picker.Item key={i} label={item.label} value={item.label} />
              ))}
            </NB.Picker>
          </NB.CardItem>
          {model.map((item, i) => (
            <NB.CardItem key={i} style={mainStyles.alignStretch}>
              <NB.Item stackedLabel error={!item.get('isValid')}>
                <NB.Label style={mainStyles.labelHeight}>{item.get('label')}</NB.Label>
                <NB.Input
                  ref={item.get('id')}
                  multiline={i === 13}
                  autoGrow={i === 13}
                  autoCapitalize='words'
                  value={item.get('value')}
                  placeholder={item.get('placeholder')}
                  keyboardType={item.get('keyboardType')}
                  returnKeyType={item.get('returnKeyType')}
                  onBlur={() => utils.validate(item.get('value'), item.get('id'), model, i)}
                  onSubmitEditing={() => this._focusNext(item.get('nextId'))}
                  onChangeText={val => this._onInputChange(val, i)} />
                {!item.get('isValid') && (<NB.Text style={mainStyles.errorText}>{item.get('error')}</NB.Text>)}
              </NB.Item>
            </NB.CardItem>
          ))}
          <NB.CardItem style={mainStyles.alignStretch}>
            <NB.Button
              onPress={this._onSubmit}
              block
              dark>
              <NB.Text>{id ? 'Update' : 'Add'}</NB.Text>
            </NB.Button>
          </NB.CardItem>
          <NB.CardItem style={mainStyles.alignItemsCenter}>
            <NB.H3>Master Player List</NB.H3>
          </NB.CardItem>
          <NB.CardItem style={mainStyles.alignItemsCenter}>
            <NB.Text style={styles.subtitle}>Select to Edit / Swipe to Delete</NB.Text>
          </NB.CardItem>
          <NB.CardItem>
            <NB.List
              enableEmptySections
              dataSource={this.ds.cloneWithRows(data.toArray())}
              renderRow={data =>
                <NB.ListItem
                  avatar
                  onPress={() => this._onSelectPlayer(data)}>
                  <NB.Left>
                    <NB.Thumbnail square small source={{ uri: config.IMAGE_64(data.get('image')) }} />
                  </NB.Left>
                  <NB.Text style={mainStyles.ml15}>{`${data.get('firstName')} ${data.get('lastName')}`}</NB.Text>
                </NB.ListItem>}
              renderRightHiddenRow={data =>
                <NB.Button
                  full
                  danger
                  onPress={_ => this._onDeletePlayer(data)}
                  style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                  <NB.Icon active name='trash' />
                </NB.Button>}
              rightOpenValue={-75}
            />
          </NB.CardItem>
        </NB.Card>
        <CustomSpinner />
      </NB.View>
    )
  }
}

Player.propTypes = {
  adminPlayer: PropTypes.instanceOf(Immutable.Map),
  setPlayerData: PropTypes.func,
  fetchPlayerByIdRequest: PropTypes.func,
  setPlayerImage: PropTypes.func,
  setPlayerId: PropTypes.func,
  addPlayerRequest: PropTypes.func,
  deletePlayerRequest: PropTypes.func,
  setTimeout: PropTypes.func,
  setSpinner: PropTypes.func,
  setPlayerAgeGroup: PropTypes.func
}

const mapStateToProps = state => ({
  adminPlayer: state.adminPlayer
})

const mapDispatchToProps = dispatch => bindActionCreators({
  addPlayerRequest: model => actions.addPlayerRequest(model),
  setPlayerData: model => actions.setPlayerData(model),
  setSpinner: isSpinner => setSpinner(isSpinner),
  setPlayerImage: image => actions.setPlayerImage(image),
  fetchPlayerByIdRequest: id => actions.fetchPlayerByIdRequest(id),
  deletePlayerRequest: id => actions.deletePlayerRequest(id),
  setPlayerId: id => actions.setPlayerId(id),
  setPlayerAgeGroup: ageGroup => actions.setPlayerAgeGroup(ageGroup),
  resetPlayerData: () => actions.resetPlayerData()
}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ReactTimeout(Player))
