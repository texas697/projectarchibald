import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {Image, ListView} from 'react-native'
import cloneDeep from 'lodash/cloneDeep'
import { ImagePicker } from 'expo'
import { bindActionCreators } from 'redux'
import { Card, CardItem, Item, Label, Input, Button, Text, Toast, View, List, ListItem, Icon, H3 } from 'native-base'
import Immutable from 'immutable'
import { connect } from 'react-redux'
import styles from './styles'
import mainStyles from '../../../styles/index'
import * as actions from './action'
import * as config from '../../../config/index'
import * as utils from './utils'
import * as mainUtils from '../../../utils/index'
import {INPUT_FIELDS} from './config'
import NoTeam from '../../../components/NoTeam/index'

class Player extends Component {
  constructor (props) {
    super(props)
    this._onSubmit = this._onSubmit.bind(this)
    this._onInputChange = this._onInputChange.bind(this)
    this._onPickImage = this._onPickImage.bind(this)
    this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => !Immutable.is(r1, r2) })
  }

  componentDidMount () {
    const {adminPlayer} = this.props
    const id = adminPlayer.get('id')
    this.props.fetchPlayerByIdRequest(id)
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
    if (error !== _error) Toast.show(config.TOAST_ERROR(error))
    if (isAdding !== _isAdding && !isAdding) Toast.show(config.TOAST_SUCCESS)
    const player = adminPlayer.get('player')
    if (isFetching !== _isFetching && !isFetching) utils.setPlayerData(player)
  }

  _focusNext (nextField) {
    this[nextField]._root.focus()
  }

  _onInputChange (val, i) {
    const {adminPlayer} = this.props
    let model = adminPlayer.get('model')
    if (i === 4 && val.length > 14) return false
    if (i === 6 && val.length > 14) return false
    model = model.setIn([i, 'value'], i === 4 || i === 6 ? mainUtils.formatPhone(val) : val)
    this.props.setPlayerData(model)
  }

  _onSubmit () {
    const {adminPlayer} = this.props
    const model = adminPlayer.get('model')
    const image = adminPlayer.get('image')
    // const _check = model.find(item => !item.get('value'))
    // if (_check) mainUtils.fieldsRequired()
    // else {
    //   const _model = utils.buildModel(model, image)
    //   this.props.addPlayerRequest(_model)
    // }
    const _model = utils.buildModel(model, image)
    this.props.setPlayerId(_model.id)
    this.props.addPlayerRequest(_model)
  }

  _onSelectPlayer (data) {
    this.props.fetchPlayerByIdRequest(data.get('id'))
  }

  _onDeletePlayer (data) {
    this.props.deletePlayerRequest(data.get('id'))
    const _clone = cloneDeep(INPUT_FIELDS)
    this.props.setPlayerData(_clone)
    this.props.setPlayerImage('empty')
  }

  render () {
    const {adminPlayer, adminTeam} = this.props
    const model = adminPlayer.get('model')
    const image = adminPlayer.get('image')
    const data = adminPlayer.get('data')
    const teamId = adminTeam.get('id')
    return (
      <View>
        {!teamId && (<NoTeam />)}
        <Card>
          <CardItem>
            <Button
              onPress={this._onPickImage}
              block
              transparent>
              <Text>Select Player Image</Text>
            </Button>
          </CardItem>
          {image !== 'empty' && (
            <CardItem style={mainStyles.alignItemsCenter}>
              <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />
            </CardItem>
          )}
          {model.map((item, i) => (
            <CardItem key={i}>
              <Item floatingLabel last>
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
              disabled={!teamId}
              onPress={this._onSubmit}
              block
              warning>
              <Text>Submit</Text>
            </Button>
          </CardItem>
          <CardItem style={mainStyles.alignItemsCenter}>
            <H3>Master Player List</H3>
          </CardItem>
          <CardItem style={mainStyles.alignItemsCenter}>
            <Text style={styles.subtitle}>Select to Edit / Swipe to Delete</Text>
          </CardItem>
          <CardItem>
            <List
              enableEmptySections
              dataSource={this.ds.cloneWithRows(data.toArray())}
              renderRow={data =>
                <ListItem style={mainStyles.pl20} onPress={() => this._onSelectPlayer(data)}><Text>{data.get('name')}</Text></ListItem>}
              renderRightHiddenRow={data =>
                <Button
                  full
                  danger
                  onPress={_ => this._onDeletePlayer(data)}
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

Player.propTypes = {
  adminTeam: PropTypes.instanceOf(Immutable.Map),
  adminPlayer: PropTypes.instanceOf(Immutable.Map),
  setPlayerData: PropTypes.func,
  fetchPlayerByIdRequest: PropTypes.func,
  setPlayerImage: PropTypes.func,
  setPlayerId: PropTypes.func,
  addPlayerRequest: PropTypes.func,
  deletePlayerRequest: PropTypes.func
}

const mapStateToProps = state => ({
  adminPlayer: state.adminPlayer,
  adminTeam: state.adminTeam
})

const mapDispatchToProps = dispatch => bindActionCreators({
  addPlayerRequest: model => actions.addPlayerRequest(model),
  setPlayerData: model => actions.setPlayerData(model),
  setPlayerImage: image => actions.setPlayerImage(image),
  fetchPlayerByIdRequest: id => actions.fetchPlayerByIdRequest(id),
  deletePlayerRequest: id => actions.deletePlayerRequest(id),
  setPlayerId: id => actions.setPlayerId(id),
  resetPlayerData: () => actions.resetPlayerData()
}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Player)
