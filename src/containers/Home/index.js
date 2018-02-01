import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import Immutable from 'immutable'
import { connect } from 'react-redux'
import Modal from 'react-native-modal'
import {
  Container,
  Content,
  Thumbnail,
  Text,
  List,
  ListItem,
  Col,
  H3,
  CardItem,
  Card
} from 'native-base'
import styles from './styles'
import mainStyles from '../../styles/index'
import CustomHeader from '../../components/Header/index'
import Filters from '../Filters/index'

const teamName = require('../../../assets/team-thumbnail.png')
const playerName = require('../../../assets/player-thumbnail.png')
const ageGroup = require('../../../assets/age-thumbnail.png')
const state = require('../../../assets/state-thumbnail.png')
const event = require('../../../assets/event-thumbnail.png')
const tournament = require('../../../assets/tournament-thumbnail.png')

class Home extends Component {
  render () {
    const {home} = this.props
    const visibleModal = home.get('visibleModal')
    return (
      <Container style={mainStyles.container}>
        <CustomHeader title='Home' {...this.props} />
        <Content>
          <Card>
            <CardItem>
              <List>
                <ListItem style={styles.noBorder}>
                  <Text>
                    Welcome to the High Major the one stop shop for all summer basketball recruiting events.
                    Every AAU, traveling, summer, all-star team in on this app. Where College basketball coaches save
                    money by purchasing one app, instead of 10 tournament
                  </Text>
                </ListItem>
                <ListItem style={[styles.alignItemsCenter, styles.noBorder]}>
                  <H3>Search By</H3>
                </ListItem>
                <ListItem style={styles.noBorder}>
                  <Col style={styles.thumbCol}>
                    <Thumbnail style={styles.thumbImage} source={teamName} />
                  </Col>
                  <Col style={styles.thumbCol}>
                    <Thumbnail style={styles.thumbImage} source={playerName} />
                  </Col>
                </ListItem>
                <ListItem style={styles.noBorder}>
                  <Col style={styles.thumbCol}>
                    <Thumbnail style={styles.thumbImage} source={ageGroup} />
                  </Col>
                  <Col style={styles.thumbCol}>
                    <Thumbnail style={styles.thumbImage} source={state} />
                  </Col>
                </ListItem>
                <ListItem style={styles.noBorder}>
                  <Col style={styles.thumbCol}>
                    <Thumbnail style={styles.thumbImage} source={event} />
                  </Col>
                  <Col style={styles.thumbCol}>
                    <Thumbnail style={styles.thumbImage} source={tournament} />
                  </Col>
                </ListItem>
              </List>
            </CardItem>
          </Card>
        </Content>
        <Modal
          isVisible={visibleModal}
          animationIn={'slideInLeft'}
          animationOut={'slideOutRight'}>
          <Filters />
        </Modal>
      </Container>
    )
  }
}

Home.propTypes = {
  dimensions: PropTypes.instanceOf(Immutable.Map),
  home: PropTypes.instanceOf(Immutable.Map)
}

const mapStateToProps = state => ({
  home: state.home,
  dimensions: state.dimensions
})

const mapDispatchToProps = dispatch => bindActionCreators({

}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home)
