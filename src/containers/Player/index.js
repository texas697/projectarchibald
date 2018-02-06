import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import Immutable from 'immutable'
import { connect } from 'react-redux'
import { Image } from 'react-native'
import {Container, Content, Card, CardItem, H3, Row, Text, Col, ListItem, Icon, Button, List, Header, Left, Title, Body, Right, Text, Thumbnail, CardItem, Card} from 'native-base'
import styles from './styles'
import mainStyles from '../../styles/index'
import {logoutRequest} from '../Login/action'
import * as utils from '../../utils/index'

const InfoText = ({label, text}) => (
  <Text style={{fontSize: 10, marginBottom: 5}}>{label}: <Text style={{fontSize: 12, fontWeight: 'bold'}}>{text}</Text></Text>
)

InfoText.propTypes = {
  label: PropTypes.string,
  text: PropTypes.string
}

class Player extends Component {
  render () {
    const {player} = this.props

    return (
      <Container style={mainStyles.container}>
        <Header>
          <Left>
            <Button transparent onPress={() => this.props.navigation.navigate('PlayerList')}>
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
                  <Image source={{uri: player.get('image')}} style={styles.playerImg} />
                </Col>
                <Col>
                  <H3>{player.get('name')}</H3>
                  <InfoText label='GRAD YEAR' text={player.get('grad')} />
                  <InfoText label='HEIGHT' text={utils.formatHeight(player.get('height'))} />
                  <InfoText label='WEIGHT' text={player.get('weight')} />
                  <InfoText label='PHONE' text={utils.formatPhone(player.get('phone'))} />
                  <InfoText label='PARENT' text={player.get('parent')} />
                  <InfoText label='PARENT PHONE' text={utils.formatPhone(player.get('parentPhone'))} />
                </Col>
              </Row>
            </CardItem>
            <CardItem>
              <Row>
                <Col>
                  <InfoText label='TWITTER' text={player.get('twitter')} />
                  <InfoText label='SNAPCHAT' text={player.get('snapchat')} />
                  <InfoText label='INSTAGRAM' text={player.get('instagram')} />
                  <InfoText label='EMAIL' text={player.get('email')} />
                </Col>
              </Row>
            </CardItem>
            <CardItem>
              <Row>
                <Col>
                  <InfoText label='HIGH SCHOOL' text={player.getIn(['hs', 'name'])} />
                  <InfoText label='HIGH SCHOOL COACH' text={player.getIn(['coach', 'name'])} />
                  <InfoText label='HIGH SCHOOL COACH PHONE' text={utils.formatPhone(player.getIn(['coach', 'phone']))} />
                  <InfoText label='HIGH SCHOOL COACH EMAIL' text={player.getIn(['coach', 'email'])} />
                </Col>
              </Row>
            </CardItem>
            <CardItem>
              <Row>
                <Col>
                  <Text style={{fontSize: 10, fontWeight: 'bold', marginBottom: 5}}>ACCOMPLISHMENTS</Text>
                  <Text style={{fontSize: 12}}>
                    {player.get('accomplishments')}
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
  player: PropTypes.instanceOf(Immutable.Map)
}

const mapStateToProps = state => ({
  player: state.player
})

const mapDispatchToProps = dispatch => bindActionCreators({
  logoutRequest: () => logoutRequest()
}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Player)
