import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {Alert} from 'react-native'
import { bindActionCreators } from 'redux'
import { Card, CardItem, Item, Label, Input, Button, Text, Toast, View } from 'native-base'
import Immutable from 'immutable'
import { connect } from 'react-redux'
import mainStyles from '../../../styles/index'
// import styles from './styles'
import * as actions from './action'
import * as messages from '../../../messages/index'
import * as config from '../../../config/index'
import * as utils from './utils'
import NoTeam from '../../../components/NoTeam/index'

class HighSchool extends Component {
  constructor (props) {
    super(props)
    this._onSubmit = this._onSubmit.bind(this)
    this._onInputChange = this._onInputChange.bind(this)
  }

  componentDidUpdate (prevProps) {
    const {adminHS} = this.props
    const isAdding = adminHS.get('isAdding')
    const _isAdding = prevProps.adminHS.get('isAdding')
    const error = adminHS.get('error')
    const _error = prevProps.adminHS.get('error')
    if (error !== _error) this._onError(error)
    if (isAdding !== _isAdding && !isAdding) this._onSuccess()
  }

  _onSuccess () {
    Toast.show(config.TOAST_SUCCESS)
    // this.props.setSpinner()
  }

  _onError (error) {
    // this.props.setSpinner()
    Toast.show(config.TOAST_ERROR(error))
  }

  _onInputChange (val, i) {
    const {adminHS} = this.props
    let model = adminHS.get('model')
    model = model.setIn([i, 'value'], val)
    this.props.setHsData(model)
  }

  _onSubmit () {
    const {adminHS} = this.props
    const model = adminHS.get('model')
    const _check = model.find(item => !item.get('value'))
    if (_check) {
      Alert.alert(
        messages.ALL_FIELDS_REQUIRED.title,
        messages.ALL_FIELDS_REQUIRED.body,
        [{text: 'OK', onPress: () => console.log('OK Pressed')}], { cancelable: false }
      )
    } else {
      // this.props.setSpinner()
      const _model = utils.buildModel(model)
      this.props.addHsRequest(_model)
    }
  }

  render () {
    const {adminHS, adminTeam} = this.props
    const model = adminHS.get('model')
    const teamId = adminTeam.get('id')
    return (
      <View>
        {!teamId && (<NoTeam />)}
        <Card>
          {model.map((item, i) => (
            <CardItem key={i}>
              <Item floatingLabel>
                <Label style={mainStyles.labelHeight}>{item.get('label')}</Label>
                <Input
                  disabled={!teamId}
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
        </Card>
      </View>
    )
  }
}

HighSchool.propTypes = {
  adminTeam: PropTypes.instanceOf(Immutable.Map),
  adminHS: PropTypes.instanceOf(Immutable.Map),
  setHsData: PropTypes.func,
  setSpinner: PropTypes.func,
  resetHsData: PropTypes.func,
  addHsRequest: PropTypes.func
}

const mapStateToProps = state => ({
  adminHS: state.adminHS,
  adminTeam: state.adminTeam
})

const mapDispatchToProps = dispatch => bindActionCreators({
  addHsRequest: model => actions.addHsRequest(model),
  setHsData: model => actions.setHsData(model),
  resetHsData: () => actions.resetHsData()
}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HighSchool)
