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
      tab: 'team'
    }
  }

  _focusNext (nextField) {
    this.refs[nextField]._root.focus()
  }

  render () {
    const {tab} = this.state
    return (
      <Container style={mainStyles.container}>
        <CustomHeader title='Build Team' {...this.props} />
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
              <Text style={{fontSize: 8}}>Team</Text>
            </Button>
            <Button onPress={() => this.setState({tab: 'hs'})} active={tab === 'hs'}>
              <Text style={{fontSize: 8}}>HS</Text>
            </Button>
            <Button onPress={() => this.setState({tab: 'coach'})} active={tab === 'coach'}>
              <Text style={{fontSize: 8}}>Coach</Text>
            </Button>
            <Button onPress={() => this.setState({tab: 'staff'})} active={tab === 'staff'}>
              <Text style={{fontSize: 8}}>Staff</Text>
            </Button>
            <Button onPress={() => this.setState({tab: 'players'})} active={tab === 'players'}>
              <Text style={{fontSize: 8}}>Player</Text>
            </Button>
            <Button onPress={() => this.setState({tab: 'roster'})} active={tab === 'roster'}>
              <Text style={{fontSize: 8}}>Roster</Text>
            </Button>
          </FooterTab>
        </Footer>
      </Container>
    )
  }
}
