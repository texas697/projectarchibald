import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {Alert, Image} from 'react-native'
import { ImagePicker } from 'expo'
import { bindActionCreators } from 'redux'
import { Card, CardItem, Item, Label, Input, Button, Text, Toast } from 'native-base'
import Immutable from 'immutable'
import { connect } from 'react-redux'
import mainStyles from '../../../styles/index'
import * as actions from './action'
import * as messages from '../../../messages/index'
import * as config from '../../../config/index'
import * as utils from './utils'

class Team extends Component {
  constructor (props) {
    super(props)
    this._onSubmit = this._onSubmit.bind(this)
    this._onInputChange = this._onInputChange.bind(this)
    this._onPickImage = this._onPickImage.bind(this)
  }

  async _onPickImage () {
    let result = await ImagePicker.launchImageLibraryAsync({allowsEditing: true, aspect: [4, 3], base64: true})
    if (!result.cancelled) this.props.setTeamImage(result.base64)
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

  _onInputChange (val, i) {
    const {adminTeam} = this.props
    let model = adminTeam.get('model')
    model = model.setIn([i, 'value'], val)
    this.props.setTeamData(model)
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
    const {adminTeam} = this.props
    const model = adminTeam.get('model')
    const image = adminTeam.get('image')
    return (
      <Card>
        <CardItem>
          <Button
            onPress={this._onPickImage}
            block
            transparent>
            <Text>Select Team Image</Text>
          </Button>
        </CardItem>
        {image !== 'empty' && (
          <CardItem style={mainStyles.alignItemsCenter}>
            <Image source={{ uri: config.IMAGE_64(image) }} style={{ width: 200, height: 200 }} />
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

Team.propTypes = {
  adminTeam: PropTypes.instanceOf(Immutable.Map),
  setTeamData: PropTypes.func,
  setSpinner: PropTypes.func,
  setTeamId: PropTypes.func,
  setTeamImage: PropTypes.func,
  resetTeamData: PropTypes.func,
  addTeamRequest: PropTypes.func
}

const mapStateToProps = state => ({
  adminTeam: state.adminTeam
})

const mapDispatchToProps = dispatch => bindActionCreators({
  addTeamRequest: model => actions.addTeamRequest(model),
  setTeamData: model => actions.setTeamData(model),
  setTeamImage: image => actions.setTeamImage(image),
  setTeamId: id => actions.setTeamId(id),
  resetTeamData: () => actions.resetTeamData()
}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Team)
