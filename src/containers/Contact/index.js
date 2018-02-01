import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import {Linking} from 'react-native'
import { connect } from 'react-redux'
import {Container, Content, Text, Card, List, ListItem, Body, Left, Right, Icon} from 'native-base'
import mainStyles from '../../styles/index'
import * as actions from '../Login/action'
import * as config from '../../config'

class ContactUs extends Component {
  render () {
    return (
      <Container>
        <Content>
          <Card>
            <List>
              <ListItem
                icon onPress={() => this.props.toggleContactUs()}
                style={[mainStyles.alignItemsRight, mainStyles.modalHeader, mainStyles.pl0, mainStyles.ml0]}>
                <Right>
                  <Icon name='ios-close-circle' />
                </Right>
              </ListItem>
              <ListItem icon onPress={() => Linking.openURL('tel:+5052275332')}>
                <Left>
                  <Icon name='ios-call' style={{color: config.COLORS.orange}} />
                </Left>
                <Body>
                  <Text>(505) 227-5332</Text>
                </Body>
              </ListItem>
              <ListItem icon onPress={() => Linking.openURL('mailto: damon@nationalsalesforce.org')}>
                <Left>
                  <Icon name='ios-mail' style={{color: config.COLORS.orange}} />
                </Left>
                <Body>
                  <Text>damon@nationalsalesforce.org</Text>
                </Body>
              </ListItem>
              <ListItem icon onPress={() => Linking.openURL('sms: +5052275332')}>
                <Left>
                  <Icon name='ios-text' style={{color: config.COLORS.orange}} />
                </Left>
                <Body>
                  <Text>(505) 227-5332</Text>
                </Body>
              </ListItem>
            </List>
          </Card>
        </Content>
      </Container>
    )
  }
}

ContactUs.propTypes = {
  toggleContactUs: PropTypes.func
}

const mapStateToProps = state => ({
  login: state.login
})

const mapDispatchToProps = dispatch => bindActionCreators({
  toggleContactUs: () => actions.toggleContactUs()
}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ContactUs)
