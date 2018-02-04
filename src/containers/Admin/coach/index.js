import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {Image, Alert} from 'react-native'
import { ImagePicker } from 'expo'
import { bindActionCreators } from 'redux'
import { Card, CardItem, Item, Label, Input, Button, Text, Toast } from 'native-base'
import Immutable from 'immutable'
import { connect } from 'react-redux'
import mainStyles from '../../../styles/index'
import * as actions from './action'
import * as utils from './utils'
import * as config from '../../../config/index'
import * as mainUtils from '../../../utils/index'
import * as messages from '../../../messages/index'

class Coach extends Component {
  constructor (props) {
    super(props)
    this._onSubmit = this._onSubmit.bind(this)
    this._onInputChange = this._onInputChange.bind(this)
    this._onPickImage = this._onPickImage.bind(this)
  }

  componentDidMount () {
    const {adminCoach} = this.props
    const id = adminCoach.get('id')
    this.props.fetchCoachByIdRequest(id)
  }

  componentDidUpdate (prevProps) {
    const {adminCoach} = this.props
    const isFetching = adminCoach.get('isFetching')
    const _isFetching = prevProps.adminCoach.get('isFetching')
    const isAdding = adminCoach.get('isAdding')
    const _isAdding = prevProps.adminCoach.get('isAdding')
    const error = adminCoach.get('error')
    const _error = prevProps.adminCoach.get('error')
    if (error !== _error) Toast.show(config.TOAST_ERROR(error))
    if (isAdding !== _isAdding && !isAdding) Toast.show(config.TOAST_SUCCESS)
    const coach = adminCoach.get('coach')
    if (isFetching !== _isFetching && !isFetching) utils.setCoachData(coach)
  }

  _focusNext (nextField) {
    if (nextField === 'go') this._onSubmit()
    else this.refs[nextField]._root.focus()
  }

  async _onPickImage () {
    let result = await ImagePicker.launchImageLibraryAsync({allowsEditing: true, aspect: [4, 3], base64: true})
    if (!result.cancelled) this.props.setCoachImage(result.base64)
  }

  _onInputChange (val, i) {
    const {adminCoach} = this.props
    let model = adminCoach.get('model')
    if (i === 1 && val.length > 10) return false
    model = model.setIn([i, 'value'], val)
    this.props.setCoachData(model)
  }

  _onSubmit () {
    const {adminCoach} = this.props
    const model = adminCoach.get('model')
    const id = adminCoach.get('id')
    const _check = model.find(item => !item.get('value'))
    if (_check) mainUtils.fieldsRequired()
    else {
      let _message = {}
      if (id) _message = messages.UPDATE_COACH(model.get(0).value)
      else _message = messages.ADD_COACH(model.get(0).value)
      Alert.alert(_message.title, _message.body, [{text: 'Cancel', onPress: () => console.log(''), style: 'cancel'}, {text: 'OK', onPress: () => this._onConfirmSubmit()}])
    }
  }

  _onConfirmSubmit () {
    const {adminCoach} = this.props
    const model = adminCoach.get('model')
    const image = adminCoach.get('image')
    const _model = utils.buildModel(model, image)
    this.props.setCoachId(_model.id)
    this.props.addCoachRequest(_model)
  }

  render () {
    const {adminCoach} = this.props
    const model = adminCoach.get('model')
    const image = adminCoach.get('image')
    const id = adminCoach.get('id')

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
            <Image source={{ uri: config.IMAGE_64(image) }} style={mainStyles.imagePick} />
          </CardItem>
        )}
        {model.map((item, i) => (
          <CardItem key={i} style={mainStyles.alignStretch}>
            <Item stackedLabel>
              <Label style={mainStyles.labelHeight}>{item.get('label')}</Label>
              <Input
                value={item.get('value')}
                ref={item.get('id')}
                returnKeyType={item.get('returnKeyType')}
                keyboardType={item.get('keyboardType')}
                placeholder={item.get('placeholder')}
                onSubmitEditing={() => this._focusNext(item.get('nextId'))}
                onChangeText={val => this._onInputChange(val, i)} />
            </Item>
          </CardItem>
        ))}
        <CardItem style={mainStyles.alignStretch}>
          <Button
            onPress={this._onSubmit}
            block
            dark>
            <Text>{id ? 'Update' : 'Add'}</Text>
          </Button>
        </CardItem>
      </Card>
    )
  }
}

Coach.propTypes = {
  adminCoach: PropTypes.instanceOf(Immutable.Map),
  setCoachData: PropTypes.func,
  setCoachImage: PropTypes.func,
  setCoachId: PropTypes.func,
  fetchCoachByIdRequest: PropTypes.func,
  addCoachRequest: PropTypes.func
}

const mapStateToProps = state => ({
  adminCoach: state.adminCoach
})

const mapDispatchToProps = dispatch => bindActionCreators({
  addCoachRequest: model => actions.addCoachRequest(model),
  setCoachData: model => actions.setCoachData(model),
  setCoachImage: image => actions.setCoachImage(image),
  setCoachId: id => actions.setCoachId(id),
  fetchCoachByIdRequest: id => actions.fetchCoachByIdRequest(id),
  resetCoachData: () => actions.resetCoachData()
}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Coach)
