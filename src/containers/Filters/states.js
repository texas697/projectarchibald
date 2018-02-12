import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import Immutable from 'immutable'
import { connect } from 'react-redux'
import NB from 'native-base'
import mainStyles from '../../styles/index'
import * as actions from './action'
import * as config from '../../config/index'
import styles from '../Home/styles'

const RegionCol = ({onSelect, label, region}) => (
  <NB.Col style={styles.thumbCol}>
    <NB.Text
      onPress={onSelect}
      style={[mainStyles.textCenter, {color: region === label ? config.COLORS.orange : '#000'}]}>{label}
    </NB.Text>
  </NB.Col>
)

RegionCol.propTypes = {
  region: PropTypes.string,
  label: PropTypes.string,
  onSelect: PropTypes.func
}

class States extends Component {
  render () {
    const {states, filters} = this.props
    const options = states.get('data').toJS()
    return (
      <NB.Container>
        <NB.Content>
          <NB.Card>
            <NB.List>
              <NB.ListItem
                icon onPress={() => this.props.toggleStateModal()}
                style={[mainStyles.alignItemsRight, mainStyles.modalHeader, mainStyles.pl0, mainStyles.ml0]}>
                <NB.Right>
                  <NB.Icon name='ios-close-circle' />
                </NB.Right>
              </NB.ListItem>
              <NB.ListItem style={[styles.alignItemsCenter, styles.noBorder]}>
                <NB.Label style={mainStyles.selectLabel}>Select Age State</NB.Label>
              </NB.ListItem>
              <NB.ListItem style={mainStyles.alignStretch}>
                <NB.Picker
                  placeholder='-Select-'
                  textStyle={{color: '#000'}}
                  iosHeader='Select one'
                  mode='dropdown'
                  selectedValue={filters.get('stateFilter')}
                  onValueChange={this.props.setStateFilter}
                >
                  {options.map((item, i) => (
                    <NB.Picker.Item key={i} label={item.label} value={item.label} />
                  ))}
                </NB.Picker>
              </NB.ListItem>
              <NB.ListItem style={[styles.alignItemsCenter, styles.noBorder]}>
                <NB.H3>Select a Region</NB.H3>
              </NB.ListItem>
              <NB.ListItem style={styles.noBorder}>
                <RegionCol label='Northwest' region={filters.get('regionFilter')} onSelect={() => this.props.setRegionFilter('Northwest')} />
                <RegionCol label='Southeast' region={filters.get('regionFilter')} onSelect={() => this.props.setRegionFilter('Southeast')} />
              </NB.ListItem>
              <NB.ListItem style={styles.noBorder}>
                <RegionCol label='Midwest' region={filters.get('regionFilter')} onSelect={() => this.props.setRegionFilter('Midwest')} />
                <RegionCol label='Mountain' region={filters.get('regionFilter')} onSelect={() => this.props.setRegionFilter('Mountain')} />
              </NB.ListItem>
              <NB.ListItem style={styles.noBorder}>
                <RegionCol label='Southwest' region={filters.get('regionFilter')} onSelect={() => this.props.setRegionFilter('Southwest')} />
                <RegionCol label='Pacific Northwest' region={filters.get('regionFilter')} onSelect={() => this.props.setRegionFilter('Pacific Northwest')} />
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

States.propTypes = {
  filters: PropTypes.instanceOf(Immutable.Map),
  states: PropTypes.instanceOf(Immutable.Map),
  toggleStateModal: PropTypes.func,
  setFilteredDataRequest: PropTypes.func,
  setRegionFilter: PropTypes.func,
  setStateFilter: PropTypes.func
}

const mapStateToProps = state => ({
  filters: state.filters,
  states: state.states
})

const mapDispatchToProps = dispatch => bindActionCreators({
  toggleStateModal: () => actions.toggleStateModal(),
  setRegionFilter: regionFilter => actions.setRegionFilter(regionFilter),
  setStateFilter: stateFilter => actions.setStateFilter(stateFilter),
  setFilteredDataRequest: () => actions.setFilteredDataRequest()
}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(States)
