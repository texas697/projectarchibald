import React, { Component } from 'react'
import PropTypes from 'prop-types'
import isEmpty from 'lodash/isEmpty'
import {Image} from 'react-native'
import { ImagePicker } from 'expo'
import { bindActionCreators } from 'redux'
import NB from 'native-base'
import Immutable from 'immutable'
import { connect } from 'react-redux'
import mainStyles from '../../../../styles/index'
import * as actions from '../action'
import * as config from '../../../../config/index'
import styles from '../../players/styles'
import * as localUtils from '../utils'

class TeamCard extends Component {
  constructor (props) {
    super(props)
    this._onInputChange = this._onInputChange.bind(this)
    this._onPickImage = this._onPickImage.bind(this)
  }

  async _onPickImage () {
    let result = await ImagePicker.launchImageLibraryAsync(config.IMAGE_OPTIONS)
    if (!result.cancelled) this.props.setTeamImage(result.base64)
  }

  _onInputChange (val, i) {
    const {adminTeam} = this.props
    let model = adminTeam.get('model')
    model = model.setIn([i, 'value'], val)
    this.props.setTeamData(model)
  }

  render () {
    const {adminTeam, states} = this.props
    const model = adminTeam.get('model')
    const image = adminTeam.get('image')
    const state = adminTeam.get('state')
    const region = adminTeam.get('region')
    const options = states.get('data').toJS()

    return (
      <NB.Card>
        <NB.CardItem>
          <NB.Button
            onPress={this._onPickImage}
            block
            transparent>
            <NB.Text>Select Team Image</NB.Text>
          </NB.Button>
        </NB.CardItem>
        {!isEmpty(image) && (
          <NB.CardItem style={mainStyles.alignItemsCenter}>
            <Image source={{ uri: config.IMAGE_64(image) }} style={{ width: 200, height: 200 }} />
          </NB.CardItem>
        )}
        <NB.CardItem style={[styles.alignItemsCenter]}>
          <NB.Label style={mainStyles.selectLabel}>State*</NB.Label>
        </NB.CardItem>
        <NB.CardItem style={mainStyles.alignStretch}>
          <NB.Picker
            placeholder='-Select-'
            textStyle={{color: '#000'}}
            iosHeader='Select one'
            mode='dropdown'
            selectedValue={state}
            onValueChange={this.props.setTeamState}
          >
            {options.map((item, i) => (
              <NB.Picker.Item key={i} label={item.label} value={item.label} />
            ))}
          </NB.Picker>
        </NB.CardItem>
        <NB.CardItem style={[styles.alignItemsCenter]}>
          <NB.Label style={mainStyles.selectLabel}>Region*</NB.Label>
        </NB.CardItem>
        <NB.CardItem style={mainStyles.alignStretch}>
          <NB.Picker
            placeholder='-Select-'
            textStyle={{color: '#000'}}
            iosHeader='Select one'
            mode='dropdown'
            selectedValue={region}
            onValueChange={this.props.setTeamRegion}
          >
            {config.REGION_OPTIONS.map((item, i) => (
              <NB.Picker.Item key={i} label={item.label} value={item.label} />
            ))}
          </NB.Picker>
        </NB.CardItem>
        {model.map((item, i) => (
          <NB.CardItem key={i} style={mainStyles.alignStretch}>
            <NB.Item stackedLabel error={!item.get('isValid')}>
              <NB.Label style={mainStyles.labelHeight}>{item.get('label')}</NB.Label>
              <NB.Input
                value={item.get('value')}
                placeholder={item.get('placeholder')}
                onBlur={() => localUtils.validate(item.get('value'), item.get('id'), model, i)}
                returnKeyType={item.get('returnKeyType')}
                onSubmitEditing={() => this.props.onSubmit()}
                onChangeText={val => this._onInputChange(val, i)} />
              {!item.get('isValid') && (<NB.Text style={mainStyles.errorText}>{item.get('error')}</NB.Text>)}
            </NB.Item>
          </NB.CardItem>
        ))}
      </NB.Card>
    )
  }
}

TeamCard.propTypes = {
  adminTeam: PropTypes.instanceOf(Immutable.Map),
  states: PropTypes.instanceOf(Immutable.Map),
  setTeamData: PropTypes.func,
  setTeamImage: PropTypes.func,
  setTeamState: PropTypes.func,
  setTeamRegion: PropTypes.func,
  onSubmit: PropTypes.func
}

const mapStateToProps = state => ({
  adminTeam: state.adminTeam,
  states: state.states
})

const mapDispatchToProps = dispatch => bindActionCreators({
  setTeamData: model => actions.setTeamData(model),
  setTeamImage: image => actions.setTeamImage(image),
  setTeamState: state => actions.setTeamState(state),
  setTeamRegion: region => actions.setTeamRegion(region)
}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TeamCard)
