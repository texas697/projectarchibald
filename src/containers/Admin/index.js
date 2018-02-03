import React, { Component } from 'react'
import {Container, Tab, Tabs, ScrollableTab, Content} from 'native-base'
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
  render () {
    return (
      <Container style={mainStyles.container}>
        <CustomHeader title='Build Team' {...this.props} hasTabs />
        <Tabs initialPage={0} renderTabBar={() => <ScrollableTab />}>
          <Tab heading='Team'>
            <Content><Team /></Content>
          </Tab>
          <Tab heading='HighSchool'>
            <Content><HighSchool /></Content>
          </Tab>
          <Tab heading='Coach'>
            <Content><Coach /></Content>
          </Tab>
          <Tab heading='Staff'>
            <Content><Staff /></Content>
          </Tab>
          <Tab heading='Player'>
            <Content><Players /></Content>
          </Tab>
          <Tab heading='Roster'>
            <Content><Roster /></Content>
          </Tab>
        </Tabs>
        <CustomSpinner />
      </Container>
    )
  }
}
