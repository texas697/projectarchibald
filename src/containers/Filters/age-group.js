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

const Item = NB.Picker.Item
class AgeGroup extends Component {
  render () {
    return (
      <NB.Container>
        <NB.Content>
          <NB.Card>
            <NB.List>
              <NB.ListItem
                icon onPress={() => this.props.toggleAgeGroupModal()}
                style={[mainStyles.alignItemsRight, mainStyles.modalHeader, mainStyles.pl0, mainStyles.ml0]}>
                <NB.Right>
                  <NB.Icon name='ios-close-circle' />
                </NB.Right>
              </NB.ListItem>
              <NB.ListItem style={[styles.alignItemsCenter, styles.noBorder]}>
                <NB.Label style={mainStyles.selectLabel}>Select Age Group</NB.Label>
              </NB.ListItem>
              <NB.ListItem style={mainStyles.alignStretch}>
                <NB.Picker
                  placeholder='-Select-'
                  textStyle={{color: '#000'}}
                  iosHeader='Select one'
                  mode='dropdown'
                  selectedValue={this.props.filters.get('ageGroupFilter')}
                  onValueChange={this.props.setAgeGroupFilter}
                >
                  {config.AGE_GROUP_OPTIONS.map((item, i) => (
                    <Item key={i} label={item.label} value={item.label} />
                  ))}
                </NB.Picker>
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

AgeGroup.propTypes = {
  filters: PropTypes.instanceOf(Immutable.Map),
  toggleAgeGroupModal: PropTypes.func,
  setFilteredDataRequest: PropTypes.func,
  setAgeGroupFilter: PropTypes.func
}

const mapStateToProps = state => ({
  filters: state.filters
})

const mapDispatchToProps = dispatch => bindActionCreators({
  toggleAgeGroupModal: () => actions.toggleAgeGroupModal(),
  setAgeGroupFilter: ageGroupFilter => actions.setAgeGroupFilter(ageGroupFilter),
  setFilteredDataRequest: () => actions.setFilteredDataRequest()
}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AgeGroup)
