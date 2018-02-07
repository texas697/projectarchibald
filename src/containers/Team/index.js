import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Immutable from 'immutable'
import { connect } from 'react-redux'
import { Image } from 'react-native'
import {Container, Content, Card, CardItem, Thumbnail, List, ListItem, Row, Text, Col, Icon, Button, Header, Left, Title, Body, Right} from 'native-base'
import styles from './styles'
import mainStyles from '../../styles/index'
import * as config from '../../config'

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
                  <Text style={{fontSize: 12}}>{data.coach.name}</Text>
                </Col>
                <Col>
                  <Text style={[styles.header, mainStyles.ml15]}>STAFF</Text>
                  <Content style={{height: 200}}>
                    <List>
                      {data.staff.map((item, i) => (
                        <ListItem key={i}>
                          <Thumbnail square small source={{ uri: config.IMAGE_64(item.image) }} />
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
                    {data.players.map((item, i) => (
                      <ListItem key={i}>
                        <Thumbnail square small source={{ uri: config.IMAGE_64(item.image) }} />
                        <Row>
                          <Col style={{width: 45, marginLeft: 10}}>
                            <Text style={{fontSize: 10, alignSelf: 'flex-start'}} note># / #</Text>
                            <Text style={{fontSize: 12, alignSelf: 'flex-start'}}>{item.numbers}</Text>
                          </Col>
                          <Col style={styles.colWidth}>
                            <Text style={{fontSize: 10, alignSelf: 'flex-start'}} note>Height</Text>
                            <Text style={{fontSize: 12, alignSelf: 'flex-start'}}>{item.height}</Text>
                          </Col>
                          <Col style={styles.colWidth}>
                            <Text style={{fontSize: 10, alignSelf: 'flex-start'}} note>Year</Text>
                            <Text style={{fontSize: 12, alignSelf: 'flex-start'}}>{item.grad}</Text>
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
  team: PropTypes.instanceOf(Immutable.Map),
  navigation: PropTypes.object
}

const mapStateToProps = state => ({
  team: state.team
})

export default connect(
  mapStateToProps
)(Team)
