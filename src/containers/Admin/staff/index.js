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

class Staff extends Component {
  async _onPickImage () {
    let result = await ImagePicker.launchImageLibraryAsync({allowsEditing: true, aspect: [4, 3], base64: true})
    if (!result.cancelled) this.props.setStaffImage(result.base64)
  }

  componentDidMount () {
    this.props.resetStaffData()
  }

  componentDidUpdate (prevProps) {
    const {adminStaff} = this.props
    const isAdding = adminStaff.get('isAdding')
    const _isAdding = prevProps.adminStaff.get('isAdding')
    const error = adminStaff.get('error')
    const _error = prevProps.adminStaff.get('error')
    if (error !== _error) this._onError(error)
    if (isAdding !== _isAdding && !isAdding) this._onSuccess()
  }

  _onSuccess () {
    this.props.resetStaffData()
    this.props.setSpinner()
  }

  _onError (error) {
    this.props.setSpinner()
    Toast.show({
      text: error.message,
      position: 'bottom',
      duration: 3000,
      type: 'danger'
    })
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
    if (_check) {
      Alert.alert(
        messages.ALL_FIELDS_REQUIRED.title,
        messages.ALL_FIELDS_REQUIRED.body,
        [{text: 'OK', onPress: () => console.log('OK Pressed')}], { cancelable: false }
      )
    } else {
      this.props.setSpinner()
      const _model = utils.buildModel(model, image)
      this.props.addStaffRequest(_model)
    }
  }

  render () {
    const {adminStaff} = this.props
    const model = adminStaff.get('model')
    const image = adminStaff.get('image')
    return (
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
            <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />
          </CardItem>
        )}
        {model.map((item, i) => (
          <CardItem key={i}>
            <Item floatingLabel last>
              <Label>{item.get('label')}</Label>
              <Input
                value={item.get('value')}
                returnKeyType={item.get('returnKeyType')}
                onSubmitEditing={() => this._focusNext(item.get('nextId'))}
                onChangeText={val => this._onInputChange(val, i)}
                style={styles.input} />
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

Staff.propTypes = {
  adminStaff: PropTypes.instanceOf(Immutable.Map),
  setStaffData: PropTypes.func,
  setSpinner: PropTypes.func,
  setStaffImage: PropTypes.func,
  resetStaffData: PropTypes.func,
  addStaffRequest: PropTypes.func
}

const mapStateToProps = state => ({
  adminStaff: state.adminStaff
})

const mapDispatchToProps = dispatch => bindActionCreators({
  addStaffRequest: model => actions.addStaffRequest(model),
  setStaffData: model => actions.setStaffData(model),
  setStaffImage: image => actions.setStaffImage(image),
  resetStaffData: () => actions.resetStaffData()
}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Staff)
