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

class HighSchool extends Component {
  componentDidMount () {
    this.props.resetHsData()
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
    this.props.resetHsData()
    // this.props.setSpinner()
  }

  _onError (error) {
    // this.props.setSpinner()
    Toast.show({text: error.message, position: 'bottom', duration: 3000, type: 'danger'})
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
    const {adminHS} = this.props
    const model = adminHS.get('model')
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
        <CardItem style={mainStyles.submitBtnCard}>
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

HighSchool.propTypes = {
  adminHS: PropTypes.instanceOf(Immutable.Map),
  setHsData: PropTypes.func,
  setSpinner: PropTypes.func,
  resetHsData: PropTypes.func,
  addHsRequest: PropTypes.func
}

const mapStateToProps = state => ({
  adminHS: state.adminHS
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
