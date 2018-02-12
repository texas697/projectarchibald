import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import Immutable from 'immutable'
import { connect } from 'react-redux'
import { Image } from 'react-native'
import NB from 'native-base'
import styles from './styles'
import mainStyles from '../../styles/index'
import {logoutRequest} from '../Login/action'
import * as utils from '../../utils/index'
import * as config from '../../config'

const InfoText = ({label, text}) => (
  <NB.Text style={styles.infoTextLabel}>{label}: <NB.Text style={styles.infoText}>{text}</NB.Text></NB.Text>
)

InfoText.propTypes = {
  label: PropTypes.string,
  text: PropTypes.string
}

class Player extends Component {
  render () {
    const {player, team} = this.props
    const data = player.get('data').toJS()
    const route = team.get('route')
    return (
      <NB.Container style={mainStyles.container}>
        <NB.Header>
          <NB.Left>
            <NB.Button transparent onPress={() => this.props.navigation.navigate(route)}>
              <NB.Icon name='arrow-back' />
            </NB.Button>
          </NB.Left>
          <NB.Body><NB.Title>&nbsp;</NB.Title></NB.Body>
          <NB.Right />
        </NB.Header>
        <NB.Content>
          <NB.Card>
            <NB.CardItem>
              <NB.Row>
                <NB.Col style={{width: 140}}>
                  <Image source={{uri: config.IMAGE_64(data.image)}} style={styles.playerImg} />
                </NB.Col>
                <NB.Col>
                  <NB.H3>{`${data.firstName} ${data.lastName}`}</NB.H3>
                  <InfoText label='GRAD YEAR' text={data.grad.toString()} />
                  <InfoText label='HEIGHT' text={utils.formatHeight(data.height.toString())} />
                  <InfoText label='WEIGHT' text={data.weight.toString()} />
                  <InfoText label='PHONE' text={utils.formatPhone(data.phone.toString())} />
                  <InfoText label='PARENT' text={data.parent} />
                  <InfoText label='PARENT PHONE' text={utils.formatPhone(data.parentPhone.toString())} />
                </NB.Col>
              </NB.Row>
            </NB.CardItem>
            <NB.CardItem>
              <NB.Row>
                <NB.Col>
                  <InfoText label='TWITTER' text={data.twitter} />
                  <InfoText label='SNAPCHAT' text={data.snapchat} />
                  <InfoText label='INSTAGRAM' text={data.instagram} />
                  <InfoText label='EMAIL' text={data.email} />
                </NB.Col>
              </NB.Row>
            </NB.CardItem>
            <NB.CardItem>
              <NB.Row>
                <NB.Col>
                  <InfoText label='HIGH SCHOOL' text={data.hs.name} />
                  <InfoText label='HIGH SCHOOL COACH' text={data.coach.name} />
                  <InfoText label='HIGH SCHOOL COACH PHONE' text={utils.formatPhone(data.coach.phone.toString())} />
                  <InfoText label='HIGH SCHOOL COACH EMAIL' text={data.coach.email} />
                </NB.Col>
              </NB.Row>
            </NB.CardItem>
            <NB.CardItem>
              <NB.Row>
                <NB.Col>
                  <NB.Text style={styles.header}>ACCOMPLISHMENTS</NB.Text>
                  <NB.Text style={mainStyles.font12}>
                    {data.accomplishments}
                  </NB.Text>
                </NB.Col>
              </NB.Row>
            </NB.CardItem>
          </NB.Card>
        </NB.Content>
      </NB.Container>
    )
  }
}

Player.propTypes = {
  team: PropTypes.instanceOf(Immutable.Map),
  player: PropTypes.instanceOf(Immutable.Map),
  navigation: PropTypes.object
}

const mapStateToProps = state => ({
  player: state.player,
  team: state.team
})

const mapDispatchToProps = dispatch => bindActionCreators({
  logoutRequest: () => logoutRequest()
}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Player)
