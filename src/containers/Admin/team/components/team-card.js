import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {Image} from 'react-native'
import { ImagePicker } from 'expo'
import { bindActionCreators } from 'redux'
import { Card, CardItem, Item, Label, Input, Button, Text } from 'native-base'
import Immutable from 'immutable'
import { connect } from 'react-redux'
import mainStyles from '../../../../styles/index'
import * as actions from '../action'
import * as config from '../../../../config/index'

class TeamCard extends Component {
  constructor (props) {
    super(props)
    this._onInputChange = this._onInputChange.bind(this)
    this._onPickImage = this._onPickImage.bind(this)
  }

  async _onPickImage () {
    let result = await ImagePicker.launchImageLibraryAsync({allowsEditing: true, aspect: [4, 3], base64: true})
    if (!result.cancelled) this.props.setTeamImage(result.base64)
  }

  _onInputChange (val, i) {
    const {adminTeam} = this.props
    let model = adminTeam.get('model')
    model = model.setIn([i, 'value'], val)
    this.props.setTeamData(model)
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
      </Card>
    )
  }
}

TeamCard.propTypes = {
  adminTeam: PropTypes.instanceOf(Immutable.Map),
  setTeamData: PropTypes.func,
  setTeamImage: PropTypes.func
}

const mapStateToProps = state => ({
  adminTeam: state.adminTeam
})

const mapDispatchToProps = dispatch => bindActionCreators({
  setTeamData: model => actions.setTeamData(model),
  setTeamImage: image => actions.setTeamImage(image)
}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TeamCard)
