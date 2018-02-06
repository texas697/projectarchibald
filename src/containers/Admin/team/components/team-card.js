import React, { Component } from 'react'
import PropTypes from 'prop-types'
import isEmpty from 'lodash/isEmpty'
import {Image} from 'react-native'
import { ImagePicker } from 'expo'
import { bindActionCreators } from 'redux'
import { Card, CardItem, Item, Label, Input, Button, Text, Picker } from 'native-base'
import Immutable from 'immutable'
import { connect } from 'react-redux'
import mainStyles from '../../../../styles/index'
import * as actions from '../action'
import * as config from '../../../../config/index'
import styles from '../../players/styles'

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
      <Card>
        <CardItem>
          <Button
            onPress={this._onPickImage}
            block
            transparent>
            <Text>Select Team Image</Text>
          </Button>
        </CardItem>
        {!isEmpty(image) && (
          <CardItem style={mainStyles.alignItemsCenter}>
            <Image source={{ uri: config.IMAGE_64(image) }} style={{ width: 200, height: 200 }} />
          </CardItem>
        )}
        <CardItem style={[styles.alignItemsCenter]}>
          <Label style={mainStyles.selectLabel}>State</Label>
        </CardItem>
        <CardItem style={mainStyles.alignStretch}>
          <Picker
            placeholder='-Select-'
            textStyle={{color: '#000'}}
            iosHeader='Select one'
            mode='dropdown'
            selectedValue={state}
            onValueChange={this.props.setTeamState}
          >
            {options.map((item, i) => (
              <Picker.Item key={i} label={item.label} value={item.label} />
            ))}
          </Picker>
        </CardItem>
        <CardItem style={[styles.alignItemsCenter]}>
          <Label style={mainStyles.selectLabel}>Region</Label>
        </CardItem>
        <CardItem style={mainStyles.alignStretch}>
          <Picker
            placeholder='-Select-'
            textStyle={{color: '#000'}}
            iosHeader='Select one'
            mode='dropdown'
            selectedValue={region}
            onValueChange={this.props.setTeamRegion}
          >
            {config.REGION_OPTIONS.map((item, i) => (
              <Picker.Item key={i} label={item.label} value={item.label} />
            ))}
          </Picker>
        </CardItem>
        {model.map((item, i) => (
          <CardItem key={i} style={mainStyles.alignStretch}>
            <Item stackedLabel>
              <Label style={mainStyles.labelHeight}>{item.get('label')}</Label>
              <Input
                value={item.get('value')}
                placeholder={item.get('placeholder')}
                returnKeyType={item.get('returnKeyType')}
                onSubmitEditing={() => this.props.onSubmit()}
                onChangeText={val => this._onInputChange(val, i)} />
            </Item>
          </CardItem>
        ))}
      </Card>
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
