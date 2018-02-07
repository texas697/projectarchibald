import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Immutable from 'immutable'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Image } from 'react-native'
import {Container, Content, Card, CardItem, Thumbnail, List, ListItem, Row, Text, Col, Icon, Button, Header, Left, Title, Body, Right} from 'native-base'
import styles from './styles'
import mainStyles from '../../styles/index'
import * as config from '../../config'
import {setPlayer} from '../Player/redux'
import {setTeamRoute} from './redux'
const InfoText = ({label, text}) => (
  <Text style={{fontSize: 10, marginBottom: 5}}>{label}
    <Text style={{fontSize: 12, fontWeight: 'bold'}}>{text}</Text>
  </Text>
)

InfoText.propTypes = {
  label: PropTypes.string,
  text: PropTypes.string
}

class Team extends Component {
  componentDidMount () {
  this.props.setTeamRoute('PlayerList')
  }

  componentDidUpdate (prevProps) {
    const data = this.props.player.get('data')
    const _data = prevProps.player.get('data')
    if (data !== _data) {
      this.props.navigation.navigate('Player')
      this.props.setTeamRoute('Team')
    }
  }
  render () {
    const {team} = this.props
    const data = team.get('data').toJS()
    return (
      <Container style={mainStyles.container}>
        <Header>
          <Left>
            <Button transparent onPress={() => this.props.navigation.navigate('TeamList')}>
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
                <Col>
                  <Text style={styles.header}>HEAD COACH</Text>
                  <Image source={{uri: config.IMAGE_64(data.coach.image)}} style={styles.teamImg} />
                  <Text style={mainStyles.font12}>{data.coach.name}</Text>
                </Col>
                <Col>
                  <Text style={[styles.header, mainStyles.ml15]}>STAFF</Text>
                  <Content style={{height: 200}}>
                    <List>
                      {data.staff.map((item, i) => (
                        <ListItem key={i}>
                          <Thumbnail square small source={{ uri: config.IMAGE_64(item.image) }} />
                          <Body>
                            <Text style={mainStyles.font10}>{item.name}</Text>
                            <Text style={mainStyles.font10} note>{item.title}</Text>
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
                    {data.players.map((item, i) => (
                      <ListItem
                        onPress={() => setPlayer(Immutable.fromJS(item))}
                        key={i}>
                        <Thumbnail square small source={{ uri: config.IMAGE_64(item.image) }} />
                        <Row>
                          <Col style={[mainStyles.ml10, styles.colWidth]}>
                            <Text style={styles.rosterLabel} note># / #</Text>
                            <Text style={styles.rosterValue}>{item.numbers}</Text>
                          </Col>
                          <Col style={styles.colWidth}>
                            <Text style={styles.rosterLabel} note>Height</Text>
                            <Text style={styles.rosterValue}>{item.height}</Text>
                          </Col>
                          <Col style={styles.colWidth}>
                            <Text style={styles.rosterLabel} note>Year</Text>
                            <Text style={styles.rosterValue}>{item.grad}</Text>
                          </Col>
                          <Col>
                            <Text style={styles.rosterLabel} note>Name</Text>
                            <Text style={styles.rosterValue}>{`${item.firstName} ${item.lastName}`}</Text>
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
  player: PropTypes.instanceOf(Immutable.Map),
  team: PropTypes.instanceOf(Immutable.Map),
  navigation: PropTypes.object,
  setTeamRoute: PropTypes.func
}

const mapStateToProps = state => ({
  team: state.team,
  player: state.player
})

const mapDispatchToProps = dispatch => bindActionCreators({
  setTeamRoute: route => setTeamRoute(route)
}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Team)
