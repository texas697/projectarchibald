import React, { Component } from 'react'
import {Container, Tab, Tabs, ScrollableTab, Content} from 'native-base'
import {KeyboardAvoidingView} from 'react-native'

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
        <Tabs locked initialPage={0} renderTabBar={() => <ScrollableTab />}>
          <Tab heading='Team'>
            <KeyboardAvoidingView style={mainStyles.container} behavior='padding'>
              <Content><Team /></Content>
            </KeyboardAvoidingView>
          </Tab>
          <Tab heading='HighSchool'>
            <KeyboardAvoidingView style={mainStyles.container} behavior='padding'>
              <Content><HighSchool /></Content>
            </KeyboardAvoidingView>
          </Tab>
          <Tab heading='Coach'>
            <KeyboardAvoidingView style={mainStyles.container} behavior='padding'>
              <Content><Coach /></Content>
            </KeyboardAvoidingView>
          </Tab>
          <Tab heading='Staff'>
            <KeyboardAvoidingView style={mainStyles.container} behavior='padding'>
              <Content><Staff /></Content>
            </KeyboardAvoidingView>
          </Tab>
          <Tab heading='Player'>
            <KeyboardAvoidingView style={mainStyles.container} behavior='padding'>
              <Content><Players /></Content>
            </KeyboardAvoidingView>
          </Tab>
          <Tab heading='Roster'>
            <KeyboardAvoidingView style={mainStyles.container} behavior='padding'>
              <Content><Roster /></Content>
            </KeyboardAvoidingView>
          </Tab>
        </Tabs>
        <CustomSpinner />
      </Container>
    )
  }
}
