import React from 'react'
import { Root } from 'native-base'
import { StackNavigator, DrawerNavigator } from 'react-navigation'
import { Provider } from 'react-redux'

import Admin from './containers/Admin/index'
import Login from './containers/Login/index'
import Register from './containers/Register/index'
import Home from './containers/Home/index'
import Player from './containers/Player/index'
import Team from './containers/Team/index'
import Filters from './containers/Filters/index'
import SideBar from './containers/Sidebar/index'
import store, {firebaseApp} from './redux/store'
import {resetRegisterUserRequest} from './containers/Register/action'
import {loginSuccess, logoutSuccess} from './containers/Login/action'

const Drawer = DrawerNavigator(
  {
    Login: { screen: Login },
    Register: { screen: Register },
    Home: { screen: Home },
    Player: { screen: Player },
    Team: { screen: Team },
    Admin: { screen: Admin }
  },
  {
    initialRouteName: 'Login',
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
    Filters: {screen: Filters},
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
    const _user = firebaseApp.auth().currentUser
    if (_name) {
      _user.updateProfile({displayName: _name})
        .then(() => store.dispatch(resetRegisterUserRequest()))
        .catch(error => console.log(error))
    }
    const user = {
      name: _user.displayName || _name,
      email: _user.email,
      uid: _user.uid
    }
    store.dispatch(loginSuccess(user))
  } else store.dispatch(logoutSuccess())
})
