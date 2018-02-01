import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import Immutable from 'immutable'
import {
  Switch
} from 'react-native'
import { connect } from 'react-redux'
import {
  Container,
  Content,
  Header,
  Left,
  Col,
  Body,
  Button,
  Icon,
  Text,
  Right,
  List,
  ListItem,
  Picker
} from 'native-base'
import styles from './styles'
import * as config from '../../config/index'
import {toggleUserModal} from '../../containers/Home/action'

const Item = Picker.Item

const status = config.FILTERS.status
const listMin = config.FILTERS.listPriceMin
const listMax = config.FILTERS.listPriceMax

class Filters extends Component {
  componentDidMount () {
  }

  render () {
    // const {dimensions} = this.props
    // const visibleHeight = dimensions.get('visibleHeight')
    // const visibleWidth = dimensions.get('visibleWidth')
    return (
      <Container style={styles.container}>
        <Header>
          <Left>
            <Button transparent onPress={() => this.props.toggleUserModal()}>
              <Icon name='ios-close-circle' />
            </Button>
          </Left>
          <Body />
          <Right />
        </Header>
        <Content>
          <List>
            <ListItem itemDivider>
              <Text>Region</Text>
            </ListItem>
            {status.map(item => (
              <ListItem key={item.value}>
                <Col>
                  <Text style={styles.switchText}>{item.label}</Text>
                </Col>
                <Col style={styles.switchCol}>
                  <Switch
                    onValueChange={console.log}
                    value={false} />
                </Col>
              </ListItem>
            ))}
            <ListItem itemDivider>
              <Text>Age Group</Text>
            </ListItem>
            <ListItem>
              <Col>
                <Picker
                  iosHeader='Select one'
                  mode='dropdown'
                  selectedValue={''}
                  onValueChange={console.log}>
                  {listMin.map(item => (
                    <Item
                      key={item.value}
                      label={item.label}
                      value={item.value} />
                  ))}
                </Picker>
              </Col>
              <Col>
                <Picker
                  iosHeader='Select one'
                  mode='dropdown'
                  selectedValue={''}
                  onValueChange={console.log}>
                  {listMax.map(item => (
                    <Item
                      key={item.value}
                      label={item.label}
                      value={item.value} />
                  ))}
                </Picker>
              </Col>
            </ListItem>
          </List>
        </Content>
      </Container>
    )
  }
}

Filters.propTypes = {
  toggleUserModal: PropTypes.func,
  filters: PropTypes.instanceOf(Immutable.Map),
  dimensions: PropTypes.instanceOf(Immutable.Map)
}

const mapStateToProps = state => ({
  filters: state.filters,
  dimensions: state.dimensions
})

const mapDispatchToProps = dispatch => bindActionCreators({
  toggleUserModal: () => toggleUserModal()
}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Filters)
