import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Immutable from 'immutable'
import {Container, Content, Text, Card, List, ListItem, Item, Label, Right, Icon, Input, Button} from 'native-base'
import mainStyles from '../../styles/index'
import * as actions from './action'

class PlayerName extends Component {
  render () {
    return (
      <Container>
        <Content>
          <Card>
            <List>
              <ListItem
                icon onPress={() => this.props.togglePlayerModal()}
                style={[mainStyles.alignItemsRight, mainStyles.modalHeader, mainStyles.pl0, mainStyles.ml0]}>
                <Right>
                  <Icon name='ios-close-circle' />
                </Right>
              </ListItem>
              <ListItem style={mainStyles.alignStretch}>
                <Item stackedLabel>
                  <Label>First Name</Label>
                  <Input
                    returnKeyType='next'
                    keyboardType='default'
                    value={this.props.filters.get('playerFirstFilter')}
                    onChangeText={this.props.setPlayerFirstFilter} />
                </Item>
              </ListItem>
              <ListItem style={mainStyles.alignStretch}>
                <Item stackedLabel>
                  <Label>Last Name</Label>
                  <Input
                    returnKeyType='go'
                    keyboardType='default'
                    value={this.props.filters.get('playerLastFilter')}
                    onChangeText={this.props.setPlayerLastFilter} />
                </Item>
              </ListItem>
              <ListItem style={mainStyles.alignStretch}>
                <Button
                  onPress={this.props.setFilteredDataRequest}
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

PlayerName.propTypes = {
  filters: PropTypes.instanceOf(Immutable.Map),
  togglePlayerModal: PropTypes.func,
  setFilteredDataRequest: PropTypes.func,
  setPlayerFirstFilter: PropTypes.func,
  setPlayerLastFilter: PropTypes.func
}

const mapStateToProps = state => ({
  filters: state.filters
})

const mapDispatchToProps = dispatch => bindActionCreators({
  togglePlayerModal: () => actions.togglePlayerModal(),
  setPlayerFirstFilter: playerFirstFilter => actions.setPlayerFirstFilter(playerFirstFilter),
  setPlayerLastFilter: playerLastFilter => actions.setPlayerLastFilter(playerLastFilter),
  setFilteredDataRequest: () => actions.setFilteredDataRequest()
}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PlayerName)
