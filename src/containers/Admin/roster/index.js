import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {Alert, ListView} from 'react-native'
import { bindActionCreators } from 'redux'
import { Card, CardItem, Label, Button, Text, Toast, View, Picker, List, ListItem, Thumbnail, Left, Icon, H3 } from 'native-base'
import Immutable from 'immutable'
import { connect } from 'react-redux'
import mainStyles from '../../../styles/index'
import * as actions from './action'
import * as config from '../../../config/index'
import * as utils from './utils'
import NoTeam from '../../../components/NoTeam/index'
import * as messages from '../../../messages'
import styles from '../players/styles'

const PickerItem = Picker.Item
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
    const isFetching = adminRoster.get('isFetching')
    const _isFetching = prevProps.adminRoster.get('isFetching')
    const isAdding = adminRoster.get('isAdding')
    const _isAdding = prevProps.adminRoster.get('isAdding')
    const error = adminRoster.get('error')
    const _error = prevProps.adminRoster.get('error')
    if (error !== _error) Toast.show(config.TOAST_ERROR(error))
    if (isAdding !== _isAdding && !isAdding) Toast.show(config.TOAST_SUCCESS)
    const roster = adminRoster.get('roster')
    if (isFetching !== _isFetching && !isFetching) utils.setRosterData(roster)
  }

  _onSelectStaff (val) {
    const {adminRoster, adminStaff} = this.props
    let staff = adminRoster.get('staff')
    const _check = staff.find(x => x.get('id') === val)
    if (_check) Alert.alert(messages.ROSTER_IN_LIST.title, '', [{text: 'OK', onPress: () => console.log('')}])
    else {
      const data = adminStaff.get('data')
      const _obj = data.find(x => x.get('id') === val)
      staff = staff.push(_obj)
      this.props.setRosterStaff(staff)
    }
  }

  _onSelectPlayer (val) {
    const {adminRoster, adminPlayer} = this.props
    let player = adminRoster.get('player')
    const _check = player.find(x => x.get('id') === val)
    if (_check) Alert.alert(messages.ROSTER_IN_LIST.title, '', [{text: 'OK', onPress: () => console.log('')}])
    else {
      const data = adminPlayer.get('data')
      const _obj = data.find(x => x.get('id') === val)
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
    if (adminRoster.get('player').size <= 0) Alert.alert(messages.ROSTER_NO_PLAYERS.title, '', [{text: 'OK', onPress: () => console.log('')}])
    else if (adminRoster.get('staff').size <= 0) Alert.alert(messages.ROSTER_NO_STAFF.title, '', [{text: 'OK', onPress: () => console.log('')}])
    else if (!adminHS.get('id') || !adminCoach.get('id')) Alert.alert(messages.ROSTER_NO_HS_COACH.title, '', [{text: 'OK', onPress: () => console.log('')}])
    else {
      Alert.alert(_message.title, _message.body, [{text: 'Cancel', onPress: () => console.log(''), style: 'cancel'}, {text: 'OK', onPress: () => this._onConfirmSubmit()}])
    }
  }

  _onConfirmSubmit () {
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
    const {adminRoster, adminTeam, adminStaff, adminPlayer} = this.props
    const staffOptions = adminStaff.get('options').toJS()
    const playerOptions = adminPlayer.get('options').toJS()
    const player = adminRoster.get('player')
    const staff = adminRoster.get('staff')
    const id = adminRoster.get('id')
    const teamId = adminTeam.get('id')
    return (
      <View>
        {!teamId && (<NoTeam />)}
        <Card>
          <CardItem style={mainStyles.alignItemsCenter}>
            <Label>Select Staff</Label>
          </CardItem>
          <CardItem>
            <Picker
              iosHeader='Select one'
              mode='dropdown'
              selectedValue={''}
              onValueChange={this._onSelectStaff}
            >
              {staffOptions.map((item, i) => (
                <PickerItem key={i} label={item.label} value={item.label} />
              ))}
            </Picker>
          </CardItem>
          <CardItem style={mainStyles.alignItemsCenter}>
            <Label>Select Players</Label>
          </CardItem>
          <CardItem>
            <Picker
              iosHeader='Select one'
              mode='dropdown'
              selectedValue={''}
              onValueChange={this._onSelectPlayer}
            >
              {playerOptions.map((item, i) => (
                <PickerItem key={i} label={item.label} value={item.label} />
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
              disabled={!teamId}
              dark>
              <Text>{id ? 'Update' : 'Add'}</Text>
            </Button>
          </CardItem>
        </Card>
      </View>
    )
  }
}

Roster.propTypes = {
  adminTeam: PropTypes.instanceOf(Immutable.Map),
  adminPlayer: PropTypes.instanceOf(Immutable.Map),
  adminStaff: PropTypes.instanceOf(Immutable.Map),
  adminHS: PropTypes.instanceOf(Immutable.Map),
  adminRoster: PropTypes.instanceOf(Immutable.Map),
  adminCoach: PropTypes.instanceOf(Immutable.Map),
  setRosterPlayer: PropTypes.func,
  setRosterStaff: PropTypes.func,
  addRosterRequest: PropTypes.func
}

const mapStateToProps = state => ({
  adminHS: state.adminHS,
  adminPlayer: state.adminPlayer,
  adminStaff: state.adminStaff,
  adminTeam: state.adminTeam,
  adminCoach: state.adminCoach,
  adminRoster: state.adminRoster
})

const mapDispatchToProps = dispatch => bindActionCreators({
  addRosterRequest: model => actions.addRosterRequest(model),
  setRosterStaff: staff => actions.setRosterStaff(staff),
  setRosterPlayer: player => actions.setRosterPlayer(player),
  fetchRosterByIdRequest: id => actions.fetchRosterByIdRequest(id),
  setRosterId: id => actions.setRosterId(id),
  resetRosterData: () => actions.resetRosterData()
}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Roster)
