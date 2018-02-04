import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {Alert} from 'react-native'
import { bindActionCreators } from 'redux'
import { Card, CardItem, Item, Label, Input, Button, Text, Toast } from 'native-base'
import Immutable from 'immutable'
import { connect } from 'react-redux'
import mainStyles from '../../../styles/index'
// import styles from './styles'
import * as actions from './action'
import * as messages from '../../../messages/index'
import * as utils from './utils'

class Roster extends Component {
  componentDidMount () {
    this.props.resetRosterData()
  }

  componentDidUpdate (prevProps) {
    const {adminRoster} = this.props
    const isAdding = adminRoster.get('isAdding')
    const _isAdding = prevProps.adminRoster.get('isAdding')
    const error = adminRoster.get('error')
    const _error = prevProps.adminRoster.get('error')
    if (error !== _error) this._onError(error)
    if (isAdding !== _isAdding && !isAdding) this._onSuccess()
  }

  _onSuccess () {
    this.props.resetRosterData()
    // this.props.setSpinner()
  }

  _onError (error) {
    // this.props.setSpinner()
    Toast.show({
      text: error.message,
      position: 'bottom',
      duration: 3000,
      type: 'danger'
    })
  }

  _onInputChange (val, i) {
    const {adminRoster} = this.props
    let model = adminRoster.get('model')
    model = model.setIn([i, 'value'], val)
    this.props.setRosterData(model)
  }

  _onSubmit () {
    const {adminRoster} = this.props
    const model = adminRoster.get('model')
    const image = adminRoster.get('image')
    const _check = model.find(item => !item.get('value'))
    if (_check) {
      Alert.alert(
        messages.ALL_FIELDS_REQUIRED.title,
        messages.ALL_FIELDS_REQUIRED.body,
        [{text: 'OK', onPress: () => console.log('OK Pressed')}], { cancelable: false }
      )
    } else {
      // this.props.setSpinner()
      const _model = utils.buildModel(model, image)
      this.props.addRosterRequest(_model)
    }
  }

  render () {
    const {adminRoster} = this.props
    const model = adminRoster.get('model')
    return (
      <Card>
        {model.map((item, i) => (
          <CardItem key={i}>
            <Item floatingLabel>
              <Label style={mainStyles.labelHeight}>{item.get('label')}</Label>
              <Input
                value={item.get('value')}
                returnKeyType={item.get('returnKeyType')}
                onSubmitEditing={() => this._focusNext(item.get('nextId'))}
                onChangeText={val => this._onInputChange(val, i)} />
            </Item>
          </CardItem>
        ))}
        <CardItem style={mainStyles.alignStretch}>
          <Button
            onPress={this._onSubmit}
            block
            warning>
            <Text>Submit</Text>
          </Button>
        </CardItem>
      </Card>
    )
  }
}

Roster.propTypes = {
  adminRoster: PropTypes.instanceOf(Immutable.Map),
  setRosterData: PropTypes.func,
  setSpinner: PropTypes.func,
  resetRosterData: PropTypes.func,
  addRosterRequest: PropTypes.func
}

const mapStateToProps = state => ({
  adminRoster: state.adminRoster
})

const mapDispatchToProps = dispatch => bindActionCreators({
  addRosterRequest: model => actions.addRosterRequest(model),
  setRosterData: model => actions.setRosterData(model),
  resetRosterData: () => actions.resetRosterData()
}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Roster)
