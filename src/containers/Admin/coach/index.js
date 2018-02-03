import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {Alert, Image} from 'react-native'
import { ImagePicker } from 'expo'
import { bindActionCreators } from 'redux'
import { Card, CardItem, Item, Label, Input, Button, Text, Toast } from 'native-base'
import Immutable from 'immutable'
import { connect } from 'react-redux'
import mainStyles from '../../../styles/index'
import styles from './styles'
import * as actions from './action'
import * as messages from '../../../messages/index'
import * as utils from './utils'

class Coach extends Component {
  async _onPickImage () {
    let result = await ImagePicker.launchImageLibraryAsync({allowsEditing: true, aspect: [4, 3], base64: true})
    if (!result.cancelled) this.props.setCoachImage(result.base64)
  }

  componentDidMount () {
    this.props.resetCoachData()
  }

  componentDidUpdate (prevProps) {
    const {adminCoach} = this.props
    const isAdding = adminCoach.get('isAdding')
    const _isAdding = prevProps.adminCoach.get('isAdding')
    const error = adminCoach.get('error')
    const _error = prevProps.adminCoach.get('error')
    if (error !== _error) this._onError(error)
    if (isAdding !== _isAdding && !isAdding) this._onSuccess()
  }

  _onSuccess () {
    Toast.show({
      text: 'Success',
      position: 'bottom',
      duration: 3000,
      type: 'success'
    })
    this.props.resetCoachData()
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
    const {adminCoach} = this.props
    let model = adminCoach.get('model')
    model = model.setIn([i, 'value'], val)
    this.props.setCoachData(model)
  }

  _onSubmit () {
    const {adminCoach} = this.props
    const model = adminCoach.get('model')
    const image = adminCoach.get('image')
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
      this.props.addCoachRequest(_model)
    }
  }

  render () {
    const {adminCoach} = this.props
    const model = adminCoach.get('model')
    const image = adminCoach.get('image')
    return (
      <Card>
        <CardItem>
          <Button
            onPress={this._onPickImage}
            block
            transparent>
            <Text>Select Coach Image</Text>
          </Button>
        </CardItem>
        {image !== 'empty' && (
          <CardItem style={mainStyles.alignItemsCenter}>
            <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />
          </CardItem>
        )}
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

Coach.propTypes = {
  adminCoach: PropTypes.instanceOf(Immutable.Map),
  setCoachData: PropTypes.func,
  setSpinner: PropTypes.func,
  setCoachImage: PropTypes.func,
  resetCoachData: PropTypes.func,
  addCoachRequest: PropTypes.func
}

const mapStateToProps = state => ({
  adminCoach: state.adminCoach
})

const mapDispatchToProps = dispatch => bindActionCreators({
  addCoachRequest: model => actions.addCoachRequest(model),
  setCoachData: model => actions.setCoachData(model),
  setCoachImage: image => actions.setCoachImage(image),
  resetCoachData: () => actions.resetCoachData()
}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Coach)
