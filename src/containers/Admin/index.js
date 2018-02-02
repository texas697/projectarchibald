import React, { Component } from 'react'
import {Container, Content, Text, Footer, FooterTab, Button} from 'native-base'
// import styles from './styles'
import mainStyles from '../../styles/index'
import CustomHeader from '../../components/Header/index'
import CustomSpinner from '../../components/Spinner/index'
import Coach from './coach/index'
import Staff from './staff/index'
import Team from './team/index'
import Players from './players/index'
import HighSchool from './highSchool/index'
import Roster from './roster/index'

export default class AdminTeam extends Component {
  constructor (props) {
    super(props)
    this.state = {
      tab: 'coach'
    }
  }

  _focusNext (nextField) {
    this.refs[nextField]._root.focus()
  }

  render () {
    const {tab} = this.state
    return (
      <Container style={mainStyles.container}>
        <CustomHeader title='Add Team' {...this.props} />
        <Content>
          {tab === 'coach' && (<Coach />)}
          {tab === 'staff' && (<Staff />)}
          {tab === 'players' && (<Players />)}
          {tab === 'team' && (<Team />)}
          {tab === 'hs' && (<HighSchool />)}
          {tab === 'roster' && (<Roster />)}
        </Content>
        <CustomSpinner />
        <Footer>
          <FooterTab>
            <Button onPress={() => this.setState({tab: 'team'})} active={tab === 'team'}>
              <Text>Team</Text>
            </Button>
            <Button onPress={() => this.setState({tab: 'hs'})} active={tab === 'hs'}>
              <Text>HighSchool</Text>
            </Button>
            <Button onPress={() => this.setState({tab: 'coach'})} active={tab === 'coach'}>
              <Text>Coach</Text>
            </Button>
            <Button onPress={() => this.setState({tab: 'staff'})} active={tab === 'staff'}>
              <Text>Staff</Text>
            </Button>
            <Button onPress={() => this.setState({tab: 'players'})} active={tab === 'players'}>
              <Text>Players</Text>
            </Button>
            <Button onPress={() => this.setState({tab: 'roster'})} active={tab === 'roster'}>
              <Text>Roster</Text>
            </Button>
          </FooterTab>
        </Footer>
      </Container>
    )
  }
}
