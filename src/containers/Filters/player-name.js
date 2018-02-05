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
              <ListItem>
                <Item stackedLabel>
                  <Label>Player Name</Label>
                  <Input
                    returnKeyType='go'
                    keyboardType='email-address'
                    value={this.props.filters.get('playerFilter')}
                    onChangeText={this.props.setPlayerFilter} />
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
  setPlayerFilter: PropTypes.func
}

const mapStateToProps = state => ({
  filters: state.filters
})

const mapDispatchToProps = dispatch => bindActionCreators({
  togglePlayerModal: () => actions.togglePlayerModal(),
  setPlayerFilter: playerFilter => actions.setPlayerFilter(playerFilter),
  setFilteredDataRequest: () => actions.setFilteredDataRequest()
}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PlayerName)
