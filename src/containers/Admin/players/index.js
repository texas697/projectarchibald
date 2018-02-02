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

class Player extends Component {
  async _onPickImage () {
    let result = await ImagePicker.launchImageLibraryAsync({allowsEditing: true, aspect: [4, 3], base64: true})
    if (!result.cancelled) this.props.setPlayerImage(result.base64)
  }

  componentDidMount () {
    this.props.resetPlayerData()
  }

  componentDidUpdate (prevProps) {
    const {adminPlayer} = this.props
    const isAdding = adminPlayer.get('isAdding')
    const _isAdding = prevProps.adminPlayer.get('isAdding')
    const error = adminPlayer.get('error')
    const _error = prevProps.adminPlayer.get('error')
    if (error !== _error) this._onError(error)
    if (isAdding !== _isAdding && !isAdding) this._onSuccess()
  }

  _onSuccess () {
    this.props.resetPlayerData()
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
    const {adminPlayer} = this.props
    let model = adminPlayer.get('model')
    model = model.setIn([i, 'value'], val)
    this.props.setPlayerData(model)
  }

  _onSubmit () {
    const {adminPlayer} = this.props
    const model = adminPlayer.get('model')
    const image = adminPlayer.get('image')
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
      this.props.addPlayerRequest(_model)
    }
  }

  render () {
    const {adminPlayer} = this.props
    const model = adminPlayer.get('model')
    const image = adminPlayer.get('image')
    return (
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

Player.propTypes = {
  adminPlayer: PropTypes.instanceOf(Immutable.Map),
  setPlayerData: PropTypes.func,
  setSpinner: PropTypes.func,
  setPlayerImage: PropTypes.func,
  resetPlayerData: PropTypes.func,
  addPlayerRequest: PropTypes.func
}

const mapStateToProps = state => ({
  adminPlayer: state.adminPlayer
})

const mapDispatchToProps = dispatch => bindActionCreators({
  addPlayerRequest: model => actions.addPlayerRequest(model),
  setPlayerData: model => actions.setPlayerData(model),
  setPlayerImage: image => actions.setPlayerImage(image),
  resetPlayerData: () => actions.resetPlayerData()
}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Player)
