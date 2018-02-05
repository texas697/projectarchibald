import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {Alert, ListView, Platform} from 'react-native'
import { bindActionCreators } from 'redux'
import { Card, CardItem, Button, Text, Toast, Picker, List, ListItem, Thumbnail, Left, Icon, H3, View, Label } from 'native-base'
import Immutable from 'immutable'
import { connect } from 'react-redux'
import mainStyles from '../../../styles/index'
import * as actions from './action'
import * as config from '../../../config/index'
import * as utils from './utils'
import * as messages from '../../../messages'
import styles from '../players/styles'
import CustomSpinner from '../../../components/Spinner'
import {setSpinner} from '../../../modules/Spinner/action'

const platform = Platform.OS
const Item = Picker.Item
class Roster extends Component {
  constructor (props) {
    super(props)
    this._onSubmit = this._onSubmit.bind(this)
    this._onSelectPlayer = this._onSelectPlayer.bind(this)
    this._onSelectStaff = this._onSelectStaff.bind(this)
    this.ds0 = new ListView.DataSource({ rowHasChanged: (r1, r2) => !Immutable.is(r1, r2) })
    this.ds1 = new ListView.DataSource({ rowHasChanged: (r1, r2) => !Immutable.is(r1, r2) })
  }

  componentDidUpdate (prevProps) {
    const {adminRoster} = this.props
    const isAdding = adminRoster.get('isAdding')
    const _isAdding = prevProps.adminRoster.get('isAdding')
    const error = adminRoster.get('error')
    const _error = prevProps.adminRoster.get('error')
    if (error !== _error) {
      this.props.setSpinner(false)
      Toast.show(config.TOAST_ERROR(error))
    }
    if (isAdding !== _isAdding && !isAdding) {
      this.props.setSpinner(false)
      Toast.show(config.TOAST_SUCCESS)
    }
  }

  _onSelectStaff (val) {
    const {adminRoster, adminStaff} = this.props
    let staff = adminRoster.get('staff')
    const _check = staff.find(x => x.get('name') === val)
    if (_check) Alert.alert(messages.ROSTER_IN_LIST.title, '', [{text: 'OK', onPress: () => console.log('')}])
    else {
      const data = adminStaff.get('data')
      const _obj = data.find(x => x.get('name') === val)
      staff = staff.push(_obj)
      this.props.setRosterStaff(staff)
    }
  }

  _onSelectPlayer (val) {
    const {adminRoster, adminPlayer} = this.props
    let player = adminRoster.get('player')
    const _check = player.find(x => x.get('name') === val)
    if (_check) Alert.alert(messages.ROSTER_IN_LIST.title, '', [{text: 'OK', onPress: () => console.log('')}])
    else {
      const data = adminPlayer.get('data')
      const _obj = data.find(x => x.get('name') === val)
      player = player.push(_obj)
      this.props.setRosterPlayer(player)
    }
  }

  _onSubmit () {
    const {adminRoster, adminHS, adminCoach} = this.props
    const id = adminRoster.get('id')
    let _message = {}
    if (id) _message = messages.UPDATE_ROSTER
    else _message = messages.ADD_ROSTER
    if (adminRoster.get('player').size === 0) Alert.alert(messages.ROSTER_NO_PLAYERS.title, '', [{text: 'OK', onPress: () => console.log('')}])
    else if (adminRoster.get('staff').size === 0) Alert.alert(messages.ROSTER_NO_STAFF.title, '', [{text: 'OK', onPress: () => console.log('')}])
    else if (!adminHS.get('id') || !adminCoach.get('id')) Alert.alert(messages.ROSTER_NO_HS_COACH.title, '', [{text: 'OK', onPress: () => console.log('')}])
    else {
      Alert.alert(_message.title, _message.body, [{text: 'Cancel', onPress: () => console.log(''), style: 'cancel'}, {text: 'OK', onPress: () => this._onConfirmSubmit()}])
    }
  }

  _onConfirmSubmit () {
    this.props.setSpinner(true)
    const _model = utils.buildModel()
    this.props.addRosterRequest(_model)
  }

  _onRemoveStaff (data) {
    const {adminRoster} = this.props
    let staff = adminRoster.get('staff')
    staff = staff.filter(x => x.get('id') !== data.get('id'))
    this.props.setRosterStaff(staff)
  }

  _onRemovePlayer (data) {
    const {adminRoster} = this.props
    let player = adminRoster.get('player')
    player = player.filter(x => x.get('id') !== data.get('id'))
    this.props.setRosterPlayer(player)
  }

  render () {
    const {adminRoster, adminStaff, adminPlayer} = this.props
    const staffOptions = adminStaff.get('options').toJS()
    const playerOptions = adminPlayer.get('options').toJS()
    const player = adminRoster.get('player')
    const staff = adminRoster.get('staff')
    const id = adminRoster.get('id')
    if (platform !== 'ios') {
      staffOptions.unshift(config.EMPTY_OPTION)
      playerOptions.unshift(config.EMPTY_OPTION)
    }
    return (
      <View>
        <Card>
          <CardItem style={[styles.alignItemsCenter]}>
            <Label>Select Staff</Label>
          </CardItem>
          <CardItem style={mainStyles.alignStretch}>
            <Picker
              placeholder='-Select Staff-'
              textStyle={{color: '#000'}}
              iosHeader='Select one'
              mode='dropdown'
              selectedValue={''}
              onValueChange={this._onSelectStaff}
            >
              {staffOptions.map((item, i) => (
                <Item key={i} label={item.label} value={item.label} />
              ))}
            </Picker>
          </CardItem>
          <CardItem style={[styles.alignItemsCenter]}>
            <Label>Select Player</Label>
          </CardItem>
          <CardItem style={mainStyles.alignStretch}>
            <Picker
              placeholder='-Select Player-'
              textStyle={{color: '#000'}}
              iosHeader='Select one'
              mode='dropdown'
              selectedValue={'undefined'}
              onValueChange={this._onSelectPlayer}
            >
              {playerOptions.map((item, i) => (
                <Item key={i} label={item.label} value={item.label} />
              ))}
            </Picker>
          </CardItem>
          <CardItem style={mainStyles.alignItemsCenter}>
            {staff.size > 0 && (<H3>Roster Staff List</H3>)}
          </CardItem>
          <CardItem style={mainStyles.alignItemsCenter}>
            {staff.size > 0 && (<Text style={styles.subtitle}>Swipe to Remove</Text>)}
          </CardItem>
          <CardItem>
            <List
              enableEmptySections
              dataSource={this.ds0.cloneWithRows(staff.toArray())}
              renderRow={data =>
                <ListItem
                  avatar>
                  <Left>
                    <Thumbnail square small source={{ uri: config.IMAGE_64(data.get('image')) }} />
                  </Left>
                  <Text style={mainStyles.ml15}>{data.get('name')}</Text>
                </ListItem>}
              renderRightHiddenRow={data =>
                <Button
                  full
                  danger
                  onPress={_ => this._onRemoveStaff(data)}
                  style={mainStyles.deleteSlideBtn}>
                  <Icon active name='trash' />
                </Button>}
              rightOpenValue={-75}
            />
          </CardItem>
          <CardItem style={mainStyles.alignItemsCenter}>
            {player.size > 0 && (<H3>Roster Player List</H3>)}
          </CardItem>
          <CardItem style={mainStyles.alignItemsCenter}>
            {player.size > 0 && (<Text style={styles.subtitle}>Swipe to Remove</Text>)}
          </CardItem>
          <CardItem>
            <List
              enableEmptySections
              dataSource={this.ds1.cloneWithRows(player.toArray())}
              renderRow={data =>
                <ListItem
                  avatar>
                  <Left>
                    <Thumbnail square small source={{ uri: config.IMAGE_64(data.get('image')) }} />
                  </Left>
                  <Text style={mainStyles.ml15}>{data.get('name')}</Text>
                </ListItem>}
              renderRightHiddenRow={data =>
                <Button
                  full
                  danger
                  onPress={_ => this._onRemovePlayer(data)}
                  style={mainStyles.deleteSlideBtn}>
                  <Icon active name='trash' />
                </Button>}
              rightOpenValue={-75}
            />
          </CardItem>
          <CardItem style={mainStyles.alignStretch}>
            <Button
              onPress={this._onSubmit}
              block
              dark>
              <Text>{id ? 'Update' : 'Add'}</Text>
            </Button>
          </CardItem>
        </Card>
        <CustomSpinner />
      </View>
    )
  }
}

Roster.propTypes = {
  adminPlayer: PropTypes.instanceOf(Immutable.Map),
  adminStaff: PropTypes.instanceOf(Immutable.Map),
  adminHS: PropTypes.instanceOf(Immutable.Map),
  adminRoster: PropTypes.instanceOf(Immutable.Map),
  adminCoach: PropTypes.instanceOf(Immutable.Map),
  setRosterPlayer: PropTypes.func,
  setRosterStaff: PropTypes.func,
  addRosterRequest: PropTypes.func,
  setPlayerStaffList: PropTypes.func,
  setSpinner: PropTypes.func
}

const mapStateToProps = state => ({
  adminHS: state.adminHS,
  adminPlayer: state.adminPlayer,
  adminStaff: state.adminStaff,
  adminCoach: state.adminCoach,
  adminRoster: state.adminRoster
})

const mapDispatchToProps = dispatch => bindActionCreators({
  addRosterRequest: model => actions.addRosterRequest(model),
  setRosterStaff: staff => actions.setRosterStaff(staff),
  setRosterPlayer: player => actions.setRosterPlayer(player),
  fetchRosterByIdRequest: id => actions.fetchRosterByIdRequest(id),
  setPlayerStaffList: (playerList, staffList) => actions.setPlayerStaffList(playerList, staffList),
  setRosterId: id => actions.setRosterId(id),
  setSpinner: isSpinner => setSpinner(isSpinner),
  resetRosterData: () => actions.resetRosterData()
}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Roster)
