import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import {Platform} from 'react-native'
import Immutable from 'immutable'
import { connect } from 'react-redux'
import {Container, Content, Text, Card, List, ListItem, Right, Icon, Button, Picker, Label} from 'native-base'
import mainStyles from '../../styles/index'
import * as actions from './action'
import * as config from '../../config/index'
import styles from '../Home/styles'

const platform = Platform.OS
const Item = Picker.Item
class AgeGroup extends Component {
  render () {
    if (platform !== 'ios') config.AGE_GROUP_OPTIONS.unshift(config.EMPTY_OPTION)
    return (
      <Container>
        <Content>
          <Card>
            <List>
              <ListItem
                icon onPress={() => this.props.toggleAgeGroupModal()}
                style={[mainStyles.alignItemsRight, mainStyles.modalHeader, mainStyles.pl0, mainStyles.ml0]}>
                <Right>
                  <Icon name='ios-close-circle' />
                </Right>
              </ListItem>
              <ListItem style={[styles.alignItemsCenter, styles.noBorder]}>
                <Label style={mainStyles.selectLabel}>Select Age Group</Label>
              </ListItem>
              <ListItem style={mainStyles.alignStretch}>
                <Picker
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
                </Picker>
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
