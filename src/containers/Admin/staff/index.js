import React, {Component} from 'react'
import PropTypes from 'prop-types'
import isEmpty from 'lodash/isEmpty'
import {Image, ListView, Alert} from 'react-native'
import {ImagePicker} from 'expo'
import {bindActionCreators} from 'redux'
import ReactTimeout from 'react-timeout'
import NB from 'native-base'
import Immutable from 'immutable'
import cloneDeep from 'lodash/cloneDeep'
import {connect} from 'react-redux'
import styles from './styles'
import mainStyles from '../../../styles/index'
import * as actions from './action'
import * as messages from '../../../messages/index'
import * as config from '../../../config/index'
import * as utils from './utils'
import * as mainUtils from '../../../utils/index'
import {INPUT_FIELDS} from './config'
import CustomSpinner from '../../../components/Spinner'
import {setSpinner} from '../../../modules/Spinner/action'

class Staff extends Component {
  constructor (props) {
    super(props)
    this.ds = new ListView.DataSource({rowHasChanged: (r1, r2) => !Immutable.is(r1, r2)})
    this._onSubmit = this._onSubmit.bind(this)
    this._onInputChange = this._onInputChange.bind(this)
    this._onPickImage = this._onPickImage.bind(this)
    this._onClearFields = this._onClearFields.bind(this)
  }

  async _onPickImage () {
    let result = await ImagePicker.launchImageLibraryAsync({allowsEditing: true, aspect: [4, 3], base64: true})
    if (!result.cancelled) this.props.setStaffImage(result.base64)
  }

  componentDidMount () {
    this._onClearFields()
  }

  componentDidUpdate (prevProps) {
    const {adminStaff} = this.props
    const isFetching = adminStaff.get('isFetching')
    const _isFetching = prevProps.adminStaff.get('isFetching')
    const isAdding = adminStaff.get('isAdding')
    const _isAdding = prevProps.adminStaff.get('isAdding')
    const error = adminStaff.get('error')
    const _error = prevProps.adminStaff.get('error')
    if (error !== _error) {
      this.props.setSpinner(false)
      NB.Toast.show(config.TOAST_ERROR(error))
    }
    if (isAdding !== _isAdding && !isAdding) {
      this.props.setSpinner(false)
      NB.Toast.show(config.TOAST_SUCCESS)
    }
    const staff = adminStaff.get('staff')
    if (isFetching !== _isFetching && !isFetching) utils.setStaffData(staff)
  }

  _focusNext (nextField) {
    if (nextField === 'go') this._onSubmit()
    else this.refs[nextField]._root.focus()
  }

  _onInputChange (val, i) {
    const {adminStaff} = this.props
    let model = adminStaff.get('model')
    model = model.setIn([i, 'value'], val)
    this.props.setStaffData(model)
  }

  _onSubmit () {
    const {adminStaff} = this.props
    const model = adminStaff.get('model')
    const id = adminStaff.get('id')
    const _check = model.find(item => !item.get('value'))
    if (_check) mainUtils.formNotValid()
    else {
      let _message = {}
      if (id) _message = messages.UPDATE_STAFF(model.get(0).value)
      else _message = messages.ADD_STAFF(model.get(0).value)
      Alert.alert(_message.title, _message.body, [{text: 'Cancel', onPress: () => console.log(''), style: 'cancel'}, {text: 'OK', onPress: () => this._onConfirmSubmit()}])
    }
  }

  _onConfirmSubmit () {
    const {adminStaff} = this.props
    this.props.setSpinner(true)
    const model = adminStaff.get('model')
    const image = adminStaff.get('image')
    const _model = utils.buildModel(model, image)
    this.props.setStaffId(_model.id)
    this.props.addStaffRequest(_model)
    this.props.setTimeout(() => this._onClearFields(), 1000)
  }

  _onSelectStaff (data) {
    this.props.fetchStaffByIdRequest(data.get('id'))
  }

  _onDeleteStaff (data) {
    const _message = messages.DELETE_STAFF(data.get('name'))
    Alert.alert(_message.title, _message.body, [{text: 'Cancel', onPress: () => console.log(''), style: 'cancel'}, {text: 'OK', onPress: () => this._onConfirmDelete(data)}])
  }

  _onConfirmDelete (data) {
    this.props.deleteStaffRequest(data.get('id'))
    this._onClearFields()
  }

  _onClearFields () {
    const _clone = cloneDeep(INPUT_FIELDS)
    this.props.setStaffData(_clone)
    this.props.setStaffImage('')
    this.props.setStaffId('')
  }

  render () {
    const {adminStaff} = this.props
    const model = adminStaff.get('model')
    const image = adminStaff.get('image')
    const data = adminStaff.get('data')
    const id = adminStaff.get('id')

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
            <NB.Button onPress={this._onPickImage} block transparent><NB.Text>Select Staff Image</NB.Text></NB.Button>
          </NB.CardItem>
          {!isEmpty(image) && (
            <NB.CardItem style={mainStyles.alignItemsCenter}>
              <Image source={{uri: config.IMAGE_64(image)}} style={mainStyles.imagePick} />
            </NB.CardItem>
          )}
          {model.map((item, i) => (
            <NB.CardItem key={i} style={mainStyles.alignStretch}>
              <NB.Item stackedLabel error={!item.get('isValid')}>
                <NB.Label style={mainStyles.labelHeight}>{item.get('label')}</NB.Label>
                <NB.Input
                  placeholder={item.get('placeholder')}
                  keyboardType={item.get('keyboardType')}
                  ref={item.get('id')}
                  value={item.get('value')}
                  onBlur={() => utils.validate(item.get('value'), item.get('id'), model, i)}
                  returnKeyType={item.get('returnKeyType')}
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
            <NB.H3>Master Staff List</NB.H3>
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
                  onPress={() => this._onSelectStaff(data)}>
                  <NB.Left>
                    <NB.Thumbnail square small source={{ uri: config.IMAGE_64(data.get('image')) }} />
                  </NB.Left>
                  <NB.Text style={mainStyles.ml15}>{data.get('name')}</NB.Text>
                </NB.ListItem>}
              renderRightHiddenRow={data =>
                <NB.Button full danger onPress={_ => this._onDeleteStaff(data)} style={mainStyles.deleteSlideBtn}>
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

Staff.propTypes = {
  adminStaff: PropTypes.instanceOf(Immutable.Map),
  setStaffData: PropTypes.func,
  setStaffId: PropTypes.func,
  setStaffImage: PropTypes.func,
  fetchStaffByIdRequest: PropTypes.func,
  addStaffRequest: PropTypes.func,
  deleteStaffRequest: PropTypes.func,
  setTimeout: PropTypes.func,
  setSpinner: PropTypes.func
}

const mapStateToProps = state => ({
  adminStaff: state.adminStaff
})

const mapDispatchToProps = dispatch => bindActionCreators({
  addStaffRequest: model => actions.addStaffRequest(model),
  setStaffData: model => actions.setStaffData(model),
  setSpinner: isSpinner => setSpinner(isSpinner),
  setStaffImage: image => actions.setStaffImage(image),
  resetStaffData: () => actions.resetStaffData(),
  setStaffId: id => actions.setStaffId(id),
  fetchStaffByIdRequest: id => actions.fetchStaffByIdRequest(id),
  deleteStaffRequest: id => actions.deleteStaffRequest(id)
}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ReactTimeout(Staff))
