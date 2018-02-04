import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {Alert} from 'react-native'
import { bindActionCreators } from 'redux'
import { Card, CardItem, Button, Text, Toast, View } from 'native-base'
import Immutable from 'immutable'
import { connect } from 'react-redux'
import mainStyles from '../../../styles/index'
import * as actions from './action'
import * as config from '../../../config/index'
import * as utils from './utils'
import * as mainUtils from '../../../utils/index'
import TeamCard from './components/team-card'
import * as messages from '../../../messages'

class Team extends Component {
  constructor (props) {
    super(props)
    this._onSubmit = this._onSubmit.bind(this)
  }

  componentDidMount () {
    const {adminTeam} = this.props
    const id = adminTeam.get('id')
    this.props.fetchTeamByIdRequest(id)
  }

  componentDidUpdate (prevProps) {
    const {adminTeam} = this.props
    const isFetching = adminTeam.get('isFetching')
    const _isFetching = prevProps.adminTeam.get('isFetching')
    const isAdding = adminTeam.get('isAdding')
    const _isAdding = prevProps.adminTeam.get('isAdding')
    const error = adminTeam.get('error')
    const _error = prevProps.adminTeam.get('error')
    if (error !== _error) Toast.show(config.TOAST_ERROR(error))
    if (isAdding !== _isAdding && !isAdding) Toast.show(config.TOAST_SUCCESS)
    const team = adminTeam.get('team')
    if (isFetching !== _isFetching && !isFetching) utils.setTeamData(team)
  }

  _onSubmit () {
    const {adminTeam} = this.props
    const model = adminTeam.get('model')
    const _check = model.find(item => !item.get('value'))
    if (_check) mainUtils.fieldsRequired()
    else {
      const _message = messages.UPDATE_TEAM(model.get(0).value)
      Alert.alert(_message.title, _message.body, [{text: 'Cancel', onPress: () => console.log(''), style: 'cancel'}, {text: 'OK', onPress: () => this._onConfirmSubmit()}])
    }
  }

  _onConfirmSubmit () {
    const {adminTeam} = this.props
    const model = adminTeam.get('model')
    const image = adminTeam.get('image')
    const _model = utils.buildModel(model, image)
    this.props.setTeamId(_model.id)
    this.props.addTeamRequest(_model)
  }

  render () {
    return (
      <View>
        <TeamCard />
        <Card>
          <CardItem style={mainStyles.alignStretch}>
            <Button
              onPress={this._onSubmit}
              dark
              block>
              <Text>Update</Text>
            </Button>
          </CardItem>
        </Card>
      </View>
    )
  }
}

Team.propTypes = {
  adminTeam: PropTypes.instanceOf(Immutable.Map),
  setTeamId: PropTypes.func,
  addTeamRequest: PropTypes.func,
  fetchTeamByIdRequest: PropTypes.func
}

const mapStateToProps = state => ({
  adminTeam: state.adminTeam
})

const mapDispatchToProps = dispatch => bindActionCreators({
  addTeamRequest: model => actions.addTeamRequest(model),
  fetchTeamByIdRequest: id => actions.fetchTeamByIdRequest(id),
  setTeamId: id => actions.setTeamId(id)
}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Team)
