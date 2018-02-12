import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import {Linking} from 'react-native'
import { connect } from 'react-redux'
import NB from 'native-base'
import mainStyles from '../../styles/index'
import * as actions from '../Login/action'
import * as config from '../../config'

class ContactUs extends Component {
  render () {
    return (
      <NB.Container>
        <NB.Content>
          <NB.Card>
            <NB.List>
              <NB.ListItem
                icon onPress={() => this.props.toggleContactUs()}
                style={[mainStyles.alignItemsRight, mainStyles.modalHeader, mainStyles.pl0, mainStyles.ml0]}>
                <NB.Right>
                  <NB.Icon name='ios-close-circle' />
                </NB.Right>
              </NB.ListItem>
              <NB.ListItem icon onPress={() => Linking.openURL('tel:+5052275332')}>
                <NB.Left>
                  <NB.Icon name='ios-call' style={{color: config.COLORS.orange}} />
                </NB.Left>
                <NB.Body>
                  <NB.Text>(505) 227-5332</NB.Text>
                </NB.Body>
              </NB.ListItem>
              <NB.ListItem icon onPress={() => Linking.openURL('mailto: damon@nationalsalesforce.org')}>
                <NB.Left>
                  <NB.Icon name='ios-mail' style={{color: config.COLORS.orange}} />
                </NB.Left>
                <NB.Body>
                  <NB.Text>damon@nationalsalesforce.org</NB.Text>
                </NB.Body>
              </NB.ListItem>
              <NB.ListItem icon onPress={() => Linking.openURL('sms: +5052275332')}>
                <NB.Left>
                  <NB.Icon name='ios-text' style={{color: config.COLORS.orange}} />
                </NB.Left>
                <NB.Body>
                  <NB.Text>(505) 227-5332</NB.Text>
                </NB.Body>
              </NB.ListItem>
            </NB.List>
          </NB.Card>
        </NB.Content>
      </NB.Container>
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
