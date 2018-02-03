import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {Alert} from 'react-native'
import { bindActionCreators } from 'redux'
import { Card, CardItem, Button, Text, Toast, View } from 'native-base'
import Immutable from 'immutable'
import { connect } from 'react-redux'
import mainStyles from '../../../styles/index'
import * as actions from './action'
import * as messages from '../../../messages/index'
import * as config from '../../../config/index'
import * as utils from './utils'
import TeamCard from './components/team-card'

class Team extends Component {
  constructor (props) {
    super(props)
    this._onSubmit = this._onSubmit.bind(this)
  }

  componentDidUpdate (prevProps) {
    const {adminTeam} = this.props
    const isAdding = adminTeam.get('isAdding')
    const _isAdding = prevProps.adminTeam.get('isAdding')
    const error = adminTeam.get('error')
    const _error = prevProps.adminTeam.get('error')
    if (error !== _error) Toast.show(config.TOAST_ERROR(error))
    if (isAdding !== _isAdding && !isAdding) Toast.show(config.TOAST_SUCCESS)
  }

  _onSubmit () {
    const {adminTeam} = this.props
    const model = adminTeam.get('model')
    const image = adminTeam.get('image')
    const _check = model.find(item => !item.get('value'))
    if (_check) {
      Alert.alert(
        messages.ALL_FIELDS_REQUIRED.title,
        messages.ALL_FIELDS_REQUIRED.body,
        [{text: 'OK', onPress: () => console.log('OK Pressed')}], { cancelable: false }
      )
    } else {
      const _model = utils.buildModel(model, image)
      this.props.setTeamId(_model.id)
      this.props.addTeamRequest(_model)
    }
  }

  render () {
    return (
      <View>
        <TeamCard />
        <Card>
          <CardItem style={mainStyles.submitBtnCard}>
            <Button
              onPress={this._onSubmit}
              block
              warning>
              <Text>Submit</Text>
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
  addTeamRequest: PropTypes.func
}

const mapStateToProps = state => ({
  adminTeam: state.adminTeam
})

const mapDispatchToProps = dispatch => bindActionCreators({
  addTeamRequest: model => actions.addTeamRequest(model),
  setTeamId: id => actions.setTeamId(id)
}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Team)
