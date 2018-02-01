import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import {Alert, Image} from 'react-native'
import { ImagePicker } from 'expo'
import Immutable from 'immutable'
import { connect } from 'react-redux'
import {Container, Content, Text, Card, CardItem, Input, Button, Item, Label} from 'native-base'
import styles from './styles'
import mainStyles from '../../../styles/index'
import CustomHeader from '../../../components/Header/index'
import {setSpinner} from '../../../modules/Spinner/action'
import CustomSpinner from '../../../components/Spinner'
import * as actions from './action'
import * as messages from '../../../messages'

class AdminPlayer extends Component {
  constructor (props) {
    super(props)
    this._onSubmit = this._onSubmit.bind(this)
    this._focusNext = this._focusNext.bind(this)
    this._onInputChange = this._onInputChange.bind(this)
    this._onPickImage = this._onPickImage.bind(this)
  }

  _focusNext (nextField) {
    this.refs[nextField]._root.focus()
  }

  _onSubmit () {
    const {adminPlayer} = this.props
    const model = adminPlayer.get('model')
    const _check = model.find(item => !item.get('value'))
    if (_check) {
      Alert.alert(
        messages.ALL_FIELDS_REQUIRED.title,
        messages.ALL_FIELDS_REQUIRED.body,
        [{text: 'OK', onPress: () => console.log('OK Pressed')}], { cancelable: false }
      )
    } else {
      this.props.setSpinner()
      // this.props.loginRequest(model)
    }
  }

  async _onPickImage () {
    let result = await ImagePicker.launchImageLibraryAsync({allowsEditing: true, aspect: [4, 3]})
    if (!result.cancelled) this.props.setPlayerImage(result.uri)
  }

  _onInputChange (val, i) {
    const {adminPlayer} = this.props
    let model = adminPlayer.get('model')
    model = model.setIn([i, 'value'], val)
    this.props.setPlayerData(model)
  }

  render () {
    const {adminPlayer} = this.props
    const model = adminPlayer.get('model')
    const image = adminPlayer.get('image')
    return (
      <Container style={mainStyles.container}>
        <CustomHeader title='Add Player' {...this.props} />
        <Content>
          <Card>
            <CardItem>
              <Button
                onPress={this._onPickImage}
                block
                transparent>
                <Text>Select Profile Image</Text>
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
        </Content>
        <CustomSpinner />
      </Container>
    )
  }
}

AdminPlayer.propTypes = {
  adminPlayer: PropTypes.instanceOf(Immutable.Map),
  setPlayerData: PropTypes.func,
  setSpinner: PropTypes.func,
  setPlayerImage: PropTypes.func
}

const mapStateToProps = state => ({
  adminPlayer: state.adminPlayer
})

const mapDispatchToProps = dispatch => bindActionCreators({
  setPlayerData: model => actions.setPlayerData(model),
  setPlayerImage: image => actions.setPlayerImage(image),
  setSpinner: () => setSpinner()
}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AdminPlayer)
