import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Immutable from 'immutable'
import NB from 'native-base'
import mainStyles from '../../styles/index'
import * as actions from './action'

class TeamName extends Component {
  render () {
    return (
      <NB.Container>
        <NB.Content>
          <NB.Card>
            <NB.List>
              <NB.ListItem
                icon onPress={() => this.props.toggleTeamModal()}
                style={[mainStyles.alignItemsRight, mainStyles.modalHeader, mainStyles.pl0, mainStyles.ml0]}>
                <NB.Right>
                  <NB.Icon name='ios-close-circle' />
                </NB.Right>
              </NB.ListItem>
              <NB.ListItem style={mainStyles.alignStretch}>
                <NB.Item stackedLabel>
                  <NB.Label>Team Name</NB.Label>
                  <NB.Input
                    returnKeyType='go'
                    keyboardType='email-address'
                    value={this.props.filters.get('teamFilter')}
                    onChangeText={this.props.setTeamFilter} />
                </NB.Item>
              </NB.ListItem>
              <NB.ListItem style={mainStyles.alignStretch}>
                <NB.Button
                  onPress={this.props.setFilteredDataRequest}
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
