import React from 'react'
import { Root } from 'native-base'
import { StackNavigator, DrawerNavigator } from 'react-navigation'
import { Provider } from 'react-redux'
import Admin from './containers/Admin/index'
import Login from './containers/Login/index'
import Register from './containers/Register/index'
import Home from './containers/Home/index'
import Player from './containers/Player/index'
import PlayerList from './containers/Player/list'
import Team from './containers/Team/index'
import TeamList from './containers/Team/list'
import SideBar from './containers/Sidebar/index'
import store, {firebaseApp} from './redux/store'
import {loginSuccess, logoutSuccess} from './containers/Login/action'
import {fetchTeamsByCoachIdRequest} from './modules/Teams/action'
import {statesFetchRequest} from './modules/States/index'
import * as utils from './utils/index'

const Drawer = DrawerNavigator(
  {
    Login: { screen: Login },
    Register: { screen: Register },
    Team: { screen: Team },
    TeamList: { screen: TeamList },
    Player: { screen: Player },
    PlayerList: { screen: PlayerList },
    Home: { screen: Home },
    Admin: { screen: Admin }
  },
  {
    initialRouteName: 'Home',
    contentOptions: {
      activeTintColor: '#e91e63'
    },
    contentComponent: props => <SideBar {...props} />
  }
)

const AppNavigator = StackNavigator(
  {
    Drawer: { screen: Drawer },
    Login: {screen: Login},
    Register: {screen: Register},
    Home: {screen: Home},
    Player: {screen: Player},
    Team: {screen: Team},
    PlayerList: {screen: PlayerList},
    TeamList: {screen: TeamList},
    Admin: {screen: Admin}
  },
  {
    initialRouteName: 'Drawer',
    headerMode: 'none'
  }
)

export default () =>
  <Root>
    <Provider store={store}>
      <AppNavigator />
    </Provider>
  </Root>

firebaseApp.auth().onAuthStateChanged(data => {
  if (data) {
    const _name = store.getState().register.get('name')
    const _isCoach = store.getState().register.get('isCoach')
    const _user = firebaseApp.auth().currentUser

    if (_name) utils.updateProfile(_user, _name, _isCoach)
    else if (_isCoach) store.dispatch(fetchTeamsByCoachIdRequest(_user.uid))
    const user = {name: _user.displayName || _name, email: _user.email, uid: _user.uid}
    store.dispatch(loginSuccess(user))
    store.dispatch(statesFetchRequest())
  } else store.dispatch(logoutSuccess())
})
