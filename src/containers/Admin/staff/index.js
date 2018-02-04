import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {Image, ListView} from 'react-native'
import { ImagePicker } from 'expo'
import { bindActionCreators } from 'redux'
import { Card, CardItem, Item, Label, Input, Button, Text, Toast, View, List, ListItem, Icon, H3 } from 'native-base'
import Immutable from 'immutable'
import cloneDeep from 'lodash/cloneDeep'
import { connect } from 'react-redux'
import styles from './styles'
import mainStyles from '../../../styles/index'
import * as actions from './action'
import * as config from '../../../config/index'
import * as utils from './utils'
import * as mainUtils from '../../../utils/index'
import {INPUT_FIELDS} from './config'
import NoTeam from '../../../components/NoTeam/index'

class Staff extends Component {
  constructor (props) {
    super(props)
    this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => !Immutable.is(r1, r2) })
    this._onSubmit = this._onSubmit.bind(this)
    this._onInputChange = this._onInputChange.bind(this)
    this._onPickImage = this._onPickImage.bind(this)
  }

  async _onPickImage () {
    let result = await ImagePicker.launchImageLibraryAsync({allowsEditing: true, aspect: [4, 3], base64: true})
    if (!result.cancelled) this.props.setStaffImage(result.base64)
  }

  componentDidUpdate (prevProps) {
    const {adminStaff} = this.props
    const isFetching = adminStaff.get('isFetching')
    const _isFetching = prevProps.adminStaff.get('isFetching')
    const isAdding = adminStaff.get('isAdding')
    const _isAdding = prevProps.adminStaff.get('isAdding')
    const error = adminStaff.get('error')
    const _error = prevProps.adminStaff.get('error')
    if (error !== _error) Toast.show(config.TOAST_ERROR(error))
    if (isAdding !== _isAdding && !isAdding) Toast.show(config.TOAST_SUCCESS)
    const staff = adminStaff.get('staff')
    if (isFetching !== _isFetching && !isFetching) utils.setStaffData(staff)
  }

  _focusNext (nextField) {
    this[nextField]._root.focus()
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
    const image = adminStaff.get('image')
    const _check = model.find(item => !item.get('value'))
    if (_check) mainUtils.fieldsRequired()
    else {
      const _model = utils.buildModel(model, image)
      this.props.setStaffId(_model.id)
      this.props.addStaffRequest(_model)
    }
  }

  _onSelectStaff (data) {
    this.props.fetchStaffByIdRequest(data.get('id'))
  }

  _onDeleteStaff (data) {
    this.props.deleteStaffRequest(data.get('id'))
    const _clone = cloneDeep(INPUT_FIELDS)
    this.props.setStaffData(_clone)
    this.props.setStaffImage('empty')
  }

  render () {
    const {adminStaff, adminTeam} = this.props
    const model = adminStaff.get('model')
    const image = adminStaff.get('image')
    const teamId = adminTeam.get('id')
    const data = adminStaff.get('data')

    return (
      <View>
        {!teamId && (<NoTeam />)}
        <Card>
          <CardItem>
            <Button
              onPress={this._onPickImage}
              block
              transparent>
              <Text>Select Staff Image</Text>
            </Button>
          </CardItem>
          {image !== 'empty' && (
            <CardItem style={mainStyles.alignItemsCenter}>
              <Image source={{ uri: config.IMAGE_64(image) }} style={{ width: 200, height: 200 }} />
            </CardItem>
          )}
          {model.map((item, i) => (
            <CardItem key={i}>
              <Item floatingLabel>
                <Label style={mainStyles.labelHeight}>{item.get('label')}</Label>
                <Input
                  disabled={!teamId}
                  getRef={ref => { this[item.get('id')] = ref }}
                  value={item.get('value')}
                  returnKeyType={item.get('returnKeyType')}
                  onSubmitEditing={() => this._focusNext(item.get('nextId'))}
                  onChangeText={val => this._onInputChange(val, i)} />
              </Item>
            </CardItem>
          ))}
          <CardItem style={mainStyles.submitBtnCard}>
            <Button
              onPress={this._onSubmit}
              block
              disabled={!teamId}
              warning>
              <Text>Submit</Text>
            </Button>
          </CardItem>
          <CardItem style={mainStyles.alignItemsCenter}>
            <H3>Master Staff List</H3>
          </CardItem>
          <CardItem style={mainStyles.alignItemsCenter}>
            <Text style={styles.subtitle}>Select to Edit / Swipe to Delete</Text>
          </CardItem>
          <CardItem>
            <List
              enableEmptySections
              dataSource={this.ds.cloneWithRows(data.toArray())}
              renderRow={data =>
                <ListItem style={mainStyles.pl20} onPress={() => this._onSelectStaff(data)}><Text>{data.get('name')}</Text></ListItem>}
              renderRightHiddenRow={data =>
                <Button
                  full
                  danger
                  onPress={_ => this._onDeleteStaff(data)}
                  style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                  <Icon active name='trash' />
                </Button>}
              rightOpenValue={-75}
            />
          </CardItem>
        </Card>
      </View>
    )
  }
}

Staff.propTypes = {
  adminTeam: PropTypes.instanceOf(Immutable.Map),
  adminStaff: PropTypes.instanceOf(Immutable.Map),
  setStaffData: PropTypes.func,
  setStaffId: PropTypes.func,
  setStaffImage: PropTypes.func,
  resetStaffData: PropTypes.func,
  fetchStaffByIdRequest: PropTypes.func,
  addStaffRequest: PropTypes.func,
  deleteStaffRequest: PropTypes.func
}

const mapStateToProps = state => ({
  adminStaff: state.adminStaff,
  adminTeam: state.adminTeam
})

const mapDispatchToProps = dispatch => bindActionCreators({
  addStaffRequest: model => actions.addStaffRequest(model),
  setStaffData: model => actions.setStaffData(model),
  setStaffImage: image => actions.setStaffImage(image),
  resetStaffData: () => actions.resetStaffData(),
  setStaffId: id => actions.setStaffId(id),
  fetchStaffByIdRequest: id => actions.fetchStaffByIdRequest(id),
  deleteStaffRequest: id => actions.deleteStaffRequest(id)
}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Staff)
