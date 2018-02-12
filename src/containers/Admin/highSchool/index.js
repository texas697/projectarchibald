import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {Alert} from 'react-native'
import { bindActionCreators } from 'redux'
import NB from 'native-base'
import Immutable from 'immutable'
import { connect } from 'react-redux'
import mainStyles from '../../../styles/index'
import * as actions from './action'
import * as config from '../../../config/index'
import * as utils from './utils'
import * as mainUtils from '../../../utils/index'
import * as messages from '../../../messages'
import CustomSpinner from '../../../components/Spinner'
import {setSpinner} from '../../../modules/Spinner/action'

class HighSchool extends Component {
  constructor (props) {
    super(props)
    this._onSubmit = this._onSubmit.bind(this)
    this._onInputChange = this._onInputChange.bind(this)
  }

  componentDidMount () {
    const {adminHS} = this.props
    const id = adminHS.get('id')
    this.props.fetchHsByIdRequest(id)
  }

  componentDidUpdate (prevProps) {
    const {adminHS} = this.props
    const isFetching = adminHS.get('isFetching')
    const _isFetching = prevProps.adminHS.get('isFetching')
    const isAdding = adminHS.get('isAdding')
    const _isAdding = prevProps.adminHS.get('isAdding')
    const error = adminHS.get('error')
    const _error = prevProps.adminHS.get('error')
    if (error !== _error) {
      this.props.setSpinner(false)
      NB.Toast.show(config.TOAST_ERROR(error))
    }
    if (isAdding !== _isAdding && !isAdding) {
      this.props.setSpinner(false)
      NB.Toast.show(config.TOAST_SUCCESS)
    }
    const hs = adminHS.get('hs')
    if (isFetching !== _isFetching && !isFetching) utils.setHsData(hs)
  }

  _onInputChange (val, i) {
    const {adminHS} = this.props
    let model = adminHS.get('model')
    model = model.setIn([i, 'value'], val)
    this.props.setHsData(model)
  }

  _onSubmit () {
    const {adminHS} = this.props
    const id = adminHS.get('id')
    const model = adminHS.get('model')
    const _check = model.find(item => !item.get('value'))
    if (_check) mainUtils.formNotValid()
    else {
      let _message = {}
      if (id) _message = messages.UPDATE_HS(model.get(0).value)
      else _message = messages.ADD_HS(model.get(0).value)
      Alert.alert(_message.title, _message.body, [{text: 'Cancel', onPress: () => console.log(''), style: 'cancel'}, {text: 'OK', onPress: () => this._onConfirmSubmit()}])
    }
  }

  _onConfirmSubmit () {
    const {adminHS} = this.props
    this.props.setSpinner(true)
    const model = adminHS.get('model')
    const _model = utils.buildModel(model)
    this.props.setHsId(_model.id)
    this.props.addHsRequest(_model)
  }

  render () {
    const {adminHS} = this.props
    const model = adminHS.get('model')
    const id = adminHS.get('id')
    return (
      <NB.View>
        <NB.Card>
          <NB.CardItem style={mainStyles.alignItemsRight}>
            <NB.Text style={mainStyles.helperText}>{config.REQUIRED_LABEL}</NB.Text>
          </NB.CardItem>
          {model.map((item, i) => (
            <NB.CardItem key={i} style={mainStyles.alignStretch}>
              <NB.Item stackedLabel error={!item.get('isValid')}>
                <NB.Label style={mainStyles.labelHeight}>{item.get('label')}</NB.Label>
                <NB.Input
                  placeholder={item.get('placeholder')}
                  value={item.get('value')}
                  keyboardType={item.get('keyboardType')}
                  returnKeyType={item.get('returnKeyType')}
                  onBlur={() => utils.validate(item.get('value'), item.get('id'), model, i)}
                  onSubmitEditing={this._onSubmit}
                  onChangeText={val => this._onInputChange(val, i)} />
                {!item.get('isValid') && (<NB.Text style={mainStyles.errorText}>{item.get('error')}</NB.Text>)}
              </NB.Item>
            </NB.CardItem>
          ))}
          <NB.CardItem style={mainStyles.alignStretch}>
            <NB.Button
              onPress={this._onSubmit}
              block
              dark>
              <NB.Text>{id ? 'Update' : 'Add'}</NB.Text>
            </NB.Button>
          </NB.CardItem>
        </NB.Card>
        <CustomSpinner />
      </NB.View>
    )
  }
}

HighSchool.propTypes = {
  adminHS: PropTypes.instanceOf(Immutable.Map),
  setHsData: PropTypes.func,
  fetchHsByIdRequest: PropTypes.func,
  setHsId: PropTypes.func,
  addHsRequest: PropTypes.func,
  setSpinner: PropTypes.func
}

const mapStateToProps = state => ({
  adminHS: state.adminHS
})

const mapDispatchToProps = dispatch => bindActionCreators({
  addHsRequest: model => actions.addHsRequest(model),
  setHsData: model => actions.setHsData(model),
  setSpinner: isSpinner => setSpinner(isSpinner),
  fetchHsByIdRequest: id => actions.fetchHsByIdRequest(id),
  setHsId: id => actions.setHsId(id),
  resetHsData: () => actions.resetHsData()
}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HighSchool)
