import React, { Component } from 'react'
import {Image, Platform} from 'react-native'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {
  Content,
  Text,
  List,
  ListItem,
  Icon,
  Container,
  Left
} from 'native-base'
import styles from './style'
import mainStyles from '../../styles/index'

const drawerCover = require('../../../assets/drawer-header.png')

const datas = [
  {
    name: 'Home',
    route: 'Home',
    icon: 'ios-home',
    bg: '#C5F442'
  },
  {
    name: 'Admin',
    route: 'Admin',
    icon: 'ios-hammer',
    bg: '#C5F442'
  }
]

const platform = Platform.OS
class SideBar extends Component {
  render () {
    return (
      <Container style={platform === 'ios' ? mainStyles.scrollContainer : mainStyles.container}>
        <Content
          bounces={false}
          style={styles.background}
        >
          <Image source={drawerCover} style={styles.drawerCover} />

          <List
            dataArray={datas}
            renderRow={data =>
              <ListItem
                button
                noBorder
                onPress={() => this.props.navigation.navigate(data.route)}
              >
                <Left>
                  <Icon
                    active
                    name={data.icon}
                    style={styles.icon}
                  />
                  <Text style={styles.text}>
                    {data.name}
                  </Text>
                </Left>
              </ListItem>}
          />
        </Content>
      </Container>
    )
  }
}

SideBar.propTypes = {
  navigation: PropTypes.object
}

const mapStateToProps = state => ({
  roles: state.roles
})

export default connect(
  mapStateToProps
)(SideBar)
