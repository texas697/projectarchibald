import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import {Platform} from 'react-native'
import Immutable from 'immutable'
import { connect } from 'react-redux'
import {Container, Content, Text, Card, List, ListItem, Right, Icon, Button, Picker, H3, Col} from 'native-base'
import mainStyles from '../../styles/index'
import * as actions from './action'
import * as config from '../../config/index'
import styles from '../Home/styles'
const platform = Platform.OS
const Item = Picker.Item

const RegionCol = ({onSelect, label, region}) => (
  <Col style={styles.thumbCol}>
    <Text
      onPress={onSelect}
      style={[mainStyles.textCenter, {color: region === label ? config.COLORS.orange : '#000'}]}>{label}
    </Text>
  </Col>
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
    if (platform !== 'ios') {
      options.unshift(config.EMPTY_OPTION)
    }
    return (
      <Container>
        <Content>
          <Card>
            <List>
              <ListItem
                icon onPress={() => this.props.toggleStateModal()}
                style={[mainStyles.alignItemsRight, mainStyles.modalHeader, mainStyles.pl0, mainStyles.ml0]}>
                <Right>
                  <Icon name='ios-close-circle' />
                </Right>
              </ListItem>
              <ListItem style={[styles.alignItemsCenter, styles.noBorder]}>
                <H3>Select State</H3>
              </ListItem>
              <ListItem style={mainStyles.alignStretch}>
                <Picker
                  placeholder='-Select State-'
                  textStyle={{color: '#000'}}
                  iosHeader='Select one'
                  mode='dropdown'
                  selectedValue={filters.get('stateFilter')}
                  onValueChange={this.props.setStateFilter}
                >
                  {options.map((item, i) => (
                    <Item key={i} label={item.label} value={item.label} />
                  ))}
                </Picker>
              </ListItem>
              <ListItem style={[styles.alignItemsCenter, styles.noBorder]}>
                <H3>Select a Region</H3>
              </ListItem>
              <ListItem style={styles.noBorder}>
                <RegionCol label='Northwest' region={filters.get('regionFilter')} onSelect={() => this.props.setRegionFilter('Northwest')} />
                <RegionCol label='Southeast' region={filters.get('regionFilter')} onSelect={() => this.props.setRegionFilter('Southeast')} />
              </ListItem>
              <ListItem style={styles.noBorder}>
                <RegionCol label='Midwest' region={filters.get('regionFilter')} onSelect={() => this.props.setRegionFilter('Midwest')} />
                <RegionCol label='Mountain' region={filters.get('regionFilter')} onSelect={() => this.props.setRegionFilter('Mountain')} />
              </ListItem>
              <ListItem style={styles.noBorder}>
                <RegionCol label='Southwest' region={filters.get('regionFilter')} onSelect={() => this.props.setRegionFilter('Southwest')} />
                <RegionCol label='Pacific Northwest' region={filters.get('regionFilter')} onSelect={() => this.props.setRegionFilter('Pacific Northwest')} />
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
