import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import {Container, Content, Text, Card, List, ListItem, Item, Label, Right, Icon, Input, Button} from 'native-base'
import mainStyles from '../../styles/index'
import * as actions from '../Login/action'

class ForgotPassword extends Component {
  render () {
    return (
      <Container>
        <Content>
          <Card>
            <List>
              <ListItem
                icon onPress={() => this.props.toggleForgotPass()}
                style={[mainStyles.alignItemsRight, mainStyles.modalHeader, mainStyles.pl0, mainStyles.ml0]}>
                <Right>
                  <Icon name='ios-close-circle' />
                </Right>
              </ListItem>
              <ListItem>
                <Item floatingLabel>
                  <Label style={mainStyles.labelHeight}>Email</Label>
                  <Input
                    returnKeyType='go'
                    keyboardType='email-address'
                    value={this.props.resetEmail}
                    onChangeText={resetEmail => this.props.onChange(resetEmail)} />
                </Item>
              </ListItem>
              <ListItem style={mainStyles.submitBtnCard}>
                <Button
                  onPress={this.props.onSubmit}
                  block
                  warning>
                  <Text>Submit</Text>
                </Button>
              </ListItem>
            </List>
          </Card>
        </Content>
      </Container>
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
