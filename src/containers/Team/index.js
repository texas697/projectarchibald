import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Immutable from 'immutable'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Image } from 'react-native'
import NB from 'native-base'
import styles from './styles'
import mainStyles from '../../styles/index'
import * as config from '../../config'
import {setPlayer} from '../Player/redux'
import {setTeamRoute} from './redux'

const InfoText = ({label, text}) => (
  <NB.Text style={{fontSize: 10, marginBottom: 5}}>{label}
    <NB.Text style={{fontSize: 12, fontWeight: 'bold'}}>{text}</NB.Text>
  </NB.Text>
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
      <NB.Container style={mainStyles.container}>
        <NB.Header>
          <NB.Left>
            <NB.Button transparent onPress={() => this.props.navigation.navigate('TeamList')}>
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
                <NB.Col>
                  <NB.Text style={styles.header}>HEAD COACH</NB.Text>
                  <Image source={{uri: config.IMAGE_64(data.coach.image)}} style={styles.teamImg} />
                  <NB.Text style={mainStyles.font12}>{data.coach.name}</NB.Text>
                </NB.Col>
                <NB.Col>
                  <NB.Text style={[styles.header, mainStyles.ml15]}>STAFF</NB.Text>
                  <NB.Content style={{height: 200}}>
                    <NB.List>
                      {data.staff.map((item, i) => (
                        <NB.ListItem key={i}>
                          <NB.Thumbnail square small source={{ uri: config.IMAGE_64(item.image) }} />
                          <NB.Body>
                            <NB.Text style={mainStyles.font10}>{item.name}</NB.Text>
                            <NB.Text style={mainStyles.font10} note>{item.title}</NB.Text>
                          </NB.Body>
                        </NB.ListItem>
                      ))}
                    </NB.List>
                  </NB.Content>
                </NB.Col>
              </NB.Row>
            </NB.CardItem>
            <NB.CardItem>
              <NB.Row>
                <NB.Col>
                  <NB.Text style={[styles.header, mainStyles.ml15]}>ROSTER</NB.Text>
                  <NB.List>
                    {data.players.map((item, i) => (
                      <NB.ListItem
                        onPress={() => setPlayer(Immutable.fromJS(item))}
                        key={i}>
                        <NB.Thumbnail square small source={{ uri: config.IMAGE_64(item.image) }} />
                        <NB.Row>
                          <NB.Col style={[mainStyles.ml10, styles.colWidth]}>
                            <NB.Text style={styles.rosterLabel} note># / #</NB.Text>
                            <NB.Text style={styles.rosterValue}>{item.numbers}</NB.Text>
                          </NB.Col>
                          <NB.Col style={styles.colWidth}>
                            <NB.Text style={styles.rosterLabel} note>Height</NB.Text>
                            <NB.Text style={styles.rosterValue}>{item.height}</NB.Text>
                          </NB.Col>
                          <NB.Col style={styles.colWidth}>
                            <NB.Text style={styles.rosterLabel} note>Year</NB.Text>
                            <NB.Text style={styles.rosterValue}>{item.grad}</NB.Text>
                          </NB.Col>
                          <NB.Col>
                            <NB.Text style={styles.rosterLabel} note>Name</NB.Text>
                            <NB.Text style={styles.rosterValue}>{`${item.firstName} ${item.lastName}`}</NB.Text>
                          </NB.Col>
                        </NB.Row>
                      </NB.ListItem>
                    ))}
                  </NB.List>
                </NB.Col>
              </NB.Row>
            </NB.CardItem>
          </NB.Card>
        </NB.Content>
      </NB.Container>
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
