import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Immutable from 'immutable'
import NB from 'native-base'
import mainStyles from '../../styles/index'
import * as actions from './action'

class PlayerName extends Component {
  render () {
    return (
      <NB.Container>
        <NB.Content>
          <NB.Card>
            <NB.List>
              <NB.ListItem
                icon onPress={() => this.props.togglePlayerModal()}
                style={[mainStyles.alignItemsRight, mainStyles.modalHeader, mainStyles.pl0, mainStyles.ml0]}>
                <NB.Right>
                  <NB.Icon name='ios-close-circle' />
                </NB.Right>
              </NB.ListItem>
              <NB.ListItem style={mainStyles.alignStretch}>
                <NB.Item stackedLabel>
                  <NB.Label>First Name</NB.Label>
                  <NB.Input
                    returnKeyType='next'
                    keyboardType='default'
                    value={this.props.filters.get('playerFirstFilter')}
                    onChangeText={this.props.setPlayerFirstFilter} />
                </NB.Item>
              </NB.ListItem>
              <NB.ListItem style={mainStyles.alignStretch}>
                <NB.Item stackedLabel>
                  <NB.Label>Last Name</NB.Label>
                  <NB.Input
                    returnKeyType='go'
                    keyboardType='default'
                    value={this.props.filters.get('playerLastFilter')}
                    onChangeText={this.props.setPlayerLastFilter} />
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
