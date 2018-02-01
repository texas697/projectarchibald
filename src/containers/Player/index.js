import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import Immutable from 'immutable'
import { connect } from 'react-redux'
import { Image } from 'react-native'
import {
  Container, Content, Card, CardItem, H3, Row, Text, Col
} from 'native-base'
import styles from './styles'
import mainStyles from '../../styles/index'
import {logoutRequest} from '../Login/action'
import CustomHeader from '../../components/Header/index'

const InfoText = ({label, text}) => (
  <Text style={{fontSize: 10, marginBottom: 5}}>{label}: <Text style={{fontSize: 12, fontWeight: 'bold'}}>{text}</Text></Text>
)

InfoText.propTypes = {
  label: PropTypes.string,
  text: PropTypes.string
}

class Player extends Component {
  render () {
    // const {dimensions} = this.props
    // const visibleHeight = dimensions.get('visibleHeight')
    // const visibleWidth = dimensions.get('visibleWidth')
    return (
      <Container style={mainStyles.container}>
        <CustomHeader title='Player Profile' {...this.props} />
        <Content>
          <Card>
            <CardItem>
              <Row>
                <Col style={{width: 140}}>
                  <Image source={{uri: 'http://via.placeholder.com/130x200'}} style={styles.playerImg} />
                </Col>
                <Col>
                  <H3>DANNY TARKANIAN</H3>
                  <InfoText label='GRAD YEAR' text='2019' />
                  <InfoText label='HEIGHT' text={"6'4"} />
                  <InfoText label='WEIGHT' text='172' />
                  <InfoText label='PHONE' text='602-298-4745' />
                  <InfoText label='PARENT' text='Sandy' />
                  <InfoText label='PARENT PHONE' text='454-231-5449' />
                </Col>
              </Row>
            </CardItem>
            <CardItem>
              <Row>
                <Col>
                  <InfoText label='TWITTER' text='danny.twitter.com' />
                  <InfoText label='SNAPCHAT' text='danny.snapchat.com' />
                  <InfoText label='INSTAGRAM' text='danny.instagram.com' />
                  <InfoText label='EMAIL' text='danny@gmail.com' />
                </Col>
              </Row>
            </CardItem>
            <CardItem>
              <Row>
                <Col>
                  <InfoText label='HIGH SCHOOL' text='Corona Del Sol HS' />
                  <InfoText label='HIGH SCHOOL COACH' text='Fred Dukes' />
                  <InfoText label='HIGH SCHOOL COACH PHONE' text='281-234-7839' />
                  <InfoText label='EMAIL' text='fred.dukes@gmail.com' />
                </Col>
              </Row>
            </CardItem>
            <CardItem>
              <Row>
                <Col>
                  <Text style={{fontSize: 10, fontWeight: 'bold', marginBottom: 5}}>ACCOMPLISHMENTS</Text>
                  <Text style={{fontSize: 12}}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
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
  dimensions: PropTypes.instanceOf(Immutable.Map)
}

const mapStateToProps = state => ({
  dimensions: state.dimensions
})

const mapDispatchToProps = dispatch => bindActionCreators({
  logoutRequest: () => logoutRequest()
}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Player)
