import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import Immutable from 'immutable'
import { connect } from 'react-redux'
import {ImageBackground} from 'react-native'
import Modal from 'react-native-modal'
import NB from 'native-base'
import styles from './styles'
import mainStyles from '../../styles/index'
import CustomHeader from '../../components/Header/index'
import * as actions from '../Filters/action'
import TeamName from '../Filters/team-name'
import AgeGroup from '../Filters/age-group'
import States from '../Filters/states'
import PlayerName from '../Filters/player-name'

const basketball = require('../../../assets/home-ball.png')

const FilterCol = ({onPress, label}) => (
  <NB.Col style={styles.thumbCol}>
    <ImageBackground style={styles.thumbImage} source={basketball}>
      <NB.Text onPress={onPress} style={styles.thumbText}>{label}</NB.Text>
    </ImageBackground>
  </NB.Col>
)

FilterCol.propTypes = {
  label: PropTypes.string,
  onPress: PropTypes.func
}

class Home extends Component {
  componentDidUpdate (prevProps) {
    const {filters} = this.props
    const isFiltering = filters.get('isFiltering')
    const _isFiltering = prevProps.filters.get('isFiltering')
    if (isFiltering !== _isFiltering && !isFiltering) {
      const ageGroupFilter = filters.get('ageGroupFilter')
      const playerFirstFilter = filters.get('playerFirstFilter')
      const playerLastFilter = filters.get('playerLastFilter')
      let path = 'TeamList'
      if (ageGroupFilter || playerFirstFilter || playerLastFilter) path = 'PlayerList'
      this.props.navigation.navigate(path)
    }
  }

  render () {
    const {filters} = this.props
    const visibleAgeGroup = filters.get('visibleAgeGroup')
    const visibleState = filters.get('visibleState')
    const visibleEvent = filters.get('visibleEvent')
    const visiblePlayer = filters.get('visiblePlayer')
    const visibleTeamName = filters.get('visibleTeamName')
    return (
      <NB.Container style={mainStyles.container}>
        <CustomHeader title='Home' {...this.props} />
        <NB.Content>
          <NB.Card>
            <NB.CardItem>
              <NB.List>
                <NB.ListItem style={styles.noBorder}>
                  <NB.Text>
                    Welcome to the High Major the one stop shop for all summer basketball recruiting events.
                    Every AAU, traveling, summer, all-star team in on this app. Where College basketball coaches save
                    money by purchasing one app, instead of 10 tournament
                  </NB.Text>
                </NB.ListItem>
                <NB.ListItem style={[styles.alignItemsCenter, styles.noBorder]}>
                  <NB.H3>Search By</NB.H3>
                </NB.ListItem>
                <NB.ListItem style={styles.noBorder}>
                  <FilterCol label='Team Name' onPress={() => this.props.toggleTeamModal()} />
                  <FilterCol label='Player Name' onPress={() => this.props.togglePlayerModal()} />
                </NB.ListItem>
                <NB.ListItem style={styles.noBorder}>
                  <FilterCol label='Age Group' onPress={() => this.props.toggleAgeGroupModal()} />
                  <FilterCol label='State/Region' onPress={() => this.props.toggleStateModal()} />
                </NB.ListItem>
                <NB.ListItem style={styles.noBorder}>
                  <FilterCol label='Event' onPress={() => this.props.toggleEventModal()} />
                  <FilterCol label='Tournament' onPress={() => this.props.toggleEventModal()} />
                </NB.ListItem>
              </NB.List>
            </NB.CardItem>
          </NB.Card>
        </NB.Content>
        <Modal
          isVisible={visibleAgeGroup}>
          <AgeGroup />
        </Modal>
        <Modal
          isVisible={visibleState}>
          <States />
        </Modal>
        <Modal
          isVisible={visiblePlayer}>
          <PlayerName />
        </Modal>
        <Modal
          isVisible={visibleTeamName}>
          <TeamName />
        </Modal>
      </NB.Container>
    )
  }
}

Home.propTypes = {
  dimensions: PropTypes.instanceOf(Immutable.Map),
  filters: PropTypes.instanceOf(Immutable.Map),
  toggleTeamModal: PropTypes.func,
  toggleAgeGroupModal: PropTypes.func,
  toggleEventModal: PropTypes.func,
  toggleStateModal: PropTypes.func,
  togglePlayerModal: PropTypes.func,
  navigation: PropTypes.object
}

const mapStateToProps = state => ({
  filters: state.filters,
  dimensions: state.dimensions
})

const mapDispatchToProps = dispatch => bindActionCreators({
  toggleTeamModal: () => actions.toggleTeamModal(),
  toggleAgeGroupModal: () => actions.toggleAgeGroupModal(),
  toggleEventModal: () => actions.toggleEventModal(),
  togglePlayerModal: () => actions.togglePlayerModal(),
  toggleStateModal: () => actions.toggleStateModal()
}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home)
