import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Immutable from 'immutable'
import {Container, Content, Text, Card, List, ListItem, Item, Label, Right, Icon, Input, Button} from 'native-base'
import mainStyles from '../../styles/index'
import * as actions from './action'

class TeamName extends Component {
  render () {
    return (
      <Container>
        <Content>
          <Card>
            <List>
              <ListItem
                icon onPress={() => this.props.toggleTeamModal()}
                style={[mainStyles.alignItemsRight, mainStyles.modalHeader, mainStyles.pl0, mainStyles.ml0]}>
                <Right>
                  <Icon name='ios-close-circle' />
                </Right>
              </ListItem>
              <ListItem style={mainStyles.alignStretch}>
                <Item stackedLabel>
                  <Label>Team Name</Label>
                  <Input
                    returnKeyType='go'
                    keyboardType='email-address'
                    value={this.props.filters.get('teamFilter')}
                    onChangeText={this.props.setTeamFilter} />
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

TeamName.propTypes = {
  filters: PropTypes.instanceOf(Immutable.Map),
  toggleTeamModal: PropTypes.func,
  setFilteredDataRequest: PropTypes.func,
  setTeamFilter: PropTypes.func
}

const mapStateToProps = state => ({
  filters: state.filters
})

const mapDispatchToProps = dispatch => bindActionCreators({
  toggleTeamModal: () => actions.toggleTeamModal(),
  setTeamFilter: teamFilter => actions.setTeamFilter(teamFilter),
  setFilteredDataRequest: () => actions.setFilteredDataRequest()
}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TeamName)
