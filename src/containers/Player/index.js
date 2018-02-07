import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import Immutable from 'immutable'
import { connect } from 'react-redux'
import { Image } from 'react-native'
import {Container, Content, Card, CardItem, H3, Row, Text, Col, Icon, Button, Header, Left, Title, Body, Right} from 'native-base'
import styles from './styles'
import mainStyles from '../../styles/index'
import {logoutRequest} from '../Login/action'
import * as utils from '../../utils/index'
import * as config from '../../config'

const InfoText = ({label, text}) => (
  <Text style={styles.infoTextLabel}>{label}: <Text style={styles.infoText}>{text}</Text></Text>
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
      <Container style={mainStyles.container}>
        <Header>
          <Left>
            <Button transparent onPress={() => this.props.navigation.navigate(route)}>
              <Icon name='arrow-back' />
            </Button>
          </Left>
          <Body><Title>&nbsp;</Title></Body>
          <Right />
        </Header>
        <Content>
          <Card>
            <CardItem>
              <Row>
                <Col style={{width: 140}}>
                  <Image source={{uri: config.IMAGE_64(data.image)}} style={styles.playerImg} />
                </Col>
                <Col>
                  <H3>{`${data.firstName} ${data.lastName}`}</H3>
                  <InfoText label='GRAD YEAR' text={data.grad.toString()} />
                  <InfoText label='HEIGHT' text={utils.formatHeight(data.height.toString())} />
                  <InfoText label='WEIGHT' text={data.weight.toString()} />
                  <InfoText label='PHONE' text={utils.formatPhone(data.phone.toString())} />
                  <InfoText label='PARENT' text={data.parent} />
                  <InfoText label='PARENT PHONE' text={utils.formatPhone(data.parentPhone.toString())} />
                </Col>
              </Row>
            </CardItem>
            <CardItem>
              <Row>
                <Col>
                  <InfoText label='TWITTER' text={data.twitter} />
                  <InfoText label='SNAPCHAT' text={data.snapchat} />
                  <InfoText label='INSTAGRAM' text={data.instagram} />
                  <InfoText label='EMAIL' text={data.email} />
                </Col>
              </Row>
            </CardItem>
            <CardItem>
              <Row>
                <Col>
                  <InfoText label='HIGH SCHOOL' text={data.hs.name} />
                  <InfoText label='HIGH SCHOOL COACH' text={data.coach.name} />
                  <InfoText label='HIGH SCHOOL COACH PHONE' text={utils.formatPhone(data.coach.phone.toString())} />
                  <InfoText label='HIGH SCHOOL COACH EMAIL' text={data.coach.email} />
                </Col>
              </Row>
            </CardItem>
            <CardItem>
              <Row>
                <Col>
                  <Text style={styles.header}>ACCOMPLISHMENTS</Text>
                  <Text style={mainStyles.font12}>
                    {data.accomplishments}
                  </Text>
                </Col>
              </Row>
            </CardItem>
          </Card>
        </Content>
      </Container>
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
