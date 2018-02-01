import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import Immutable from 'immutable'
import { connect } from 'react-redux'
import { Image } from 'react-native'
import {
  Container, Content, Card, CardItem, ListItem, List, Row, Text, Col, Thumbnail, Body, Right
} from 'native-base'
import styles from './styles'
import mainStyles from '../../styles/index'
import {logoutRequest} from '../Login/action'
import CustomHeader from '../../components/Header/index'

const InfoText = ({label, text}) => (
  <Text style={{fontSize: 10, marginBottom: 5}}>{label}
    <Text style={{fontSize: 12, fontWeight: 'bold'}}>{text}</Text>
  </Text>
)

InfoText.propTypes = {
  label: PropTypes.string,
  text: PropTypes.string
}

const STAFF = [{
  name: 'Rudy Sanchez',
  title: 'Assts. Coach'
}, {
  name: 'Scott Willis',
  title: 'Water Boy'
}, {
  name: 'Aaron Horstman',
  title: 'Ball Boy'
}, {
  name: 'Shawn Saulnier',
  title: 'Assts. Coach'
}, {
  name: 'Jay Dobbs',
  title: 'Head Trainer'
}]

const PLAYERS = [{
  name: 'Rudy Sanchez',
  number: '21/24',
  height: "6'9",
  year: '2020'
}, {
  name: 'Scott Willis',
  number: '21/24',
  height: "6'9",
  year: '2020'
}, {
  name: 'Aaron Horstman',
  number: '21/24',
  height: "6'9",
  year: '2020'
}, {
  name: 'Shawn Saulnier',
  number: '21/24',
  height: "6'9",
  year: '2020'
}, {
  name: 'Jay Dobbs',
  number: '21/24',
  height: "6'9",
  year: '2020'
}]

class Team extends Component {
  render () {
    // const {dimensions} = this.props
    // const visibleHeight = dimensions.get('visibleHeight')
    // const visibleWidth = dimensions.get('visibleWidth')
    return (
      <Container style={mainStyles.container}>
        <CustomHeader title='Team Profile' {...this.props} />
        <Content>
          <Card>
            <CardItem>
              <Row>
                <Col>
                  <Text style={styles.header}>HEAD COACH</Text>
                  <Image source={{uri: 'http://via.placeholder.com/130x200'}} style={styles.headCoachImg} />
                  <Text style={{fontSize: 12}}>Tyrone Fuller</Text>
                </Col>
                <Col>
                  <Text style={[styles.header, mainStyles.ml15]}>STAFF</Text>
                  <Content style={{height: 200}}>
                    <List>
                      {STAFF.map((item, i) => (
                        <ListItem key={i}>
                          <Thumbnail square small source={{ uri: 'http://via.placeholder.com/50x50' }} />
                          <Body>
                            <Text style={{fontSize: 10}}>{item.name}</Text>
                            <Text style={{fontSize: 10}} note>{item.title}</Text>
                          </Body>
                        </ListItem>
                      ))}
                    </List>
                  </Content>
                </Col>
              </Row>
            </CardItem>
            <CardItem>
              <Row>
                <Col>
                  <Text style={[styles.header, mainStyles.ml15]}>ROSTER</Text>
                  <List>
                    {PLAYERS.map((item, i) => (
                      <ListItem key={i}>
                        <Thumbnail square small source={{ uri: 'http://via.placeholder.com/50x50' }} />
                        <Row>
                          <Col style={{width: 45, marginLeft: 10}}>
                            <Text style={{fontSize: 10, alignSelf: 'flex-start'}} note># / #</Text>
                            <Text style={{fontSize: 12, alignSelf: 'flex-start'}}>{item.number}</Text>
                          </Col>
                          <Col style={styles.colWidth}>
                            <Text style={{fontSize: 10, alignSelf: 'flex-start'}} note>Height</Text>
                            <Text style={{fontSize: 12, alignSelf: 'flex-start'}}>{item.height}</Text>
                          </Col>
                          <Col style={styles.colWidth}>
                            <Text style={{fontSize: 10, alignSelf: 'flex-start'}} note>Year</Text>
                            <Text style={{fontSize: 12, alignSelf: 'flex-start'}}>{item.year}</Text>
                          </Col>
                          <Col>
                            <Text style={{fontSize: 10, alignSelf: 'flex-start'}} note>Name</Text>
                            <Text style={{fontSize: 12, alignSelf: 'flex-start'}}>{item.name}</Text>
                          </Col>
                        </Row>
                      </ListItem>
                    ))}
                  </List>
                </Col>
              </Row>
            </CardItem>
          </Card>
        </Content>
      </Container>
    )
  }
}

Team.propTypes = {
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
)(Team)
