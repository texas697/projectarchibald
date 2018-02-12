import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import NB from 'native-base'
import mainStyles from '../../styles/index'
import * as actions from '../Login/action'

class ForgotPassword extends Component {
  render () {
    return (
      <NB.Container>
        <NB.Content>
          <NB.Card>
            <NB.List>
              <NB.ListItem
                icon onPress={() => this.props.toggleForgotPass()}
                style={[mainStyles.alignItemsRight, mainStyles.modalHeader, mainStyles.pl0, mainStyles.ml0]}>
                <NB.Right>
                  <NB.Icon name='ios-close-circle' />
                </NB.Right>
              </NB.ListItem>
              <NB.ListItem>
                <NB.Item stackedLabel>
                  <NB.Label>Email</NB.Label>
                  <NB.Input
                    returnKeyType='go'
                    keyboardType='email-address'
                    value={this.props.resetEmail}
                    onChangeText={resetEmail => this.props.onChange(resetEmail)} />
                </NB.Item>
              </NB.ListItem>
              <NB.ListItem style={mainStyles.alignStretch}>
                <NB.Button
                  onPress={this.props.onSubmit}
                  block
                  warning>
                  <NB.Text>Submit</NB.Text>
                </NB.Button>
              </NB.ListItem>
            </NB.List>
          </NB.Card>
        </NB.Content>
      </NB.Container>
    )
  }
}

ForgotPassword.propTypes = {
  toggleForgotPass: PropTypes.func,
  onSubmit: PropTypes.func,
  onChange: PropTypes.func,
  resetEmail: PropTypes.string
}

const mapStateToProps = state => ({
  login: state.login
})

const mapDispatchToProps = dispatch => bindActionCreators({
  toggleForgotPass: () => actions.toggleForgotPass()
}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ForgotPassword)
