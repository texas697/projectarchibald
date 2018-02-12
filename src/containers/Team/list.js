import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Immutable from 'immutable'
import { connect } from 'react-redux'
import NB from 'native-base'
import mainStyles from '../../styles/index'
import * as actions from './redux'
import * as config from '../../config/index'

class TeamList extends Component {
  componentDidUpdate (prevProps) {
    const data = this.props.team.get('data')
    const _data = prevProps.team.get('data')
    if (data !== _data) this.props.navigation.navigate('Team')
  }

  render () {
    const {filters, dimensions} = this.props
    const dataList = filters.get('data')
    const visibleHeight = dimensions.get('visibleHeight')
    return (
      <NB.Container style={mainStyles.container}>
        <NB.Header>
          <NB.Left>
            <NB.Button transparent onPress={() => this.props.navigation.navigate('Home')}>
              <NB.Icon name='arrow-back' />
            </NB.Button>
          </NB.Left>
          <NB.Body><NB.Title>&nbsp;</NB.Title></NB.Body>
          <NB.Right />
        </NB.Header>
        <NB.Content>
          <NB.Card style={{height: visibleHeight - 90}}>
            <NB.CardItem header style={mainStyles.alignItemsCenter}>
              <NB.Text>Search Results</NB.Text>
            </NB.CardItem>
            <NB.CardItem>
              <NB.Body>
                <NB.List>
                  {dataList.map((item, i) => (
                    <NB.ListItem
                      key={i}
                      avatar
                      onPress={() => actions.setTeam(item)}>
                      <NB.Left>
                        <NB.Thumbnail square small source={{ uri: config.IMAGE_64(item.get('image')) }} />
                      </NB.Left>
                      <NB.Text style={mainStyles.ml15}>{item.get('name')}</NB.Text>
                    </NB.ListItem>
                  ))}
                </NB.List>
              </NB.Body>
            </NB.CardItem>
          </NB.Card>
        </NB.Content>
      </NB.Container>
    )
  }
}

TeamList.propTypes = {
  team: PropTypes.instanceOf(Immutable.Map),
  filters: PropTypes.instanceOf(Immutable.Map),
  navigation: PropTypes.object,
  dimensions: PropTypes.instanceOf(Immutable.Map)
}

const mapStateToProps = state => ({
  filters: state.filters,
  team: state.team,
  dimensions: state.dimensions
})

export default connect(
  mapStateToProps
)(TeamList)
