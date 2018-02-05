import React, { Component } from 'react'
import {Image, Platform} from 'react-native'
import PropTypes from 'prop-types'
import {
  Content,
  Text,
  List,
  ListItem,
  Icon,
  Container,
  Left,
  Right,
  Badge
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
    name: 'Player',
    route: 'Player',
    icon: 'phone-portrait',
    bg: '#C5F442'
  },
  {
    name: 'Team',
    route: 'Team',
    icon: 'phone-portrait',
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
  constructor (props) {
    super(props)
    this.state = {
      shadowOffsetWidth: 1,
      shadowRadius: 4
    }
  }

  render () {
    return (
      <Container style={platform === 'ios' ? mainStyles.scrollContainer : mainStyles.container}>
        <Content
          bounces={false}
          style={{ flex: 1, backgroundColor: '#fff', top: -1 }}
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
                    style={{ color: '#777', fontSize: 26, width: 30 }}
                  />
                  <Text style={styles.text}>
                    {data.name}
                  </Text>
                </Left>
                {data.types &&
                <Right style={{ flex: 1 }}>
                  <Badge
                    style={{
                      borderRadius: 3,
                      height: 25,
                      width: 72,
                      backgroundColor: data.bg
                    }}
                  >
                    <Text
                      style={styles.badgeText}
                    >{`${data.types} Types`}</Text>
                  </Badge>
                </Right>}
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
export default SideBar
