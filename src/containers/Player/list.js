import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import Immutable from 'immutable'
import { connect } from 'react-redux'
import NB from 'native-base'
import mainStyles from '../../styles/index'
import * as actions from '../Player/redux'
import * as config from '../../config/index'
import {setTeamRoute} from '../Team/redux'

class PlayerList extends Component {
  componentDidMount () {
    this.props.setTeamRoute('PlayerList')
  }

  componentDidUpdate (prevProps) {
    const data = this.props.player.get('data')
    const _data = prevProps.player.get('data')
    if (data !== _data) this.props.navigation.navigate('Player')
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
                      onPress={() => actions.setPlayer(item)}>
                      <NB.Left>
                        <NB.Thumbnail square small source={{ uri: config.IMAGE_64(item.get('image')) }} />
                      </NB.Left>
                      <NB.Text style={mainStyles.ml15}>{`${item.get('firstName')} ${item.get('lastName')}`}</NB.Text>
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

PlayerList.propTypes = {
  player: PropTypes.instanceOf(Immutable.Map),
  filters: PropTypes.instanceOf(Immutable.Map),
  navigation: PropTypes.object,
  setTeamRoute: PropTypes.func,
  dimensions: PropTypes.instanceOf(Immutable.Map)
}

const mapStateToProps = state => ({
  filters: state.filters,
  player: state.player,
  dimensions: state.dimensions
})

const mapDispatchToProps = dispatch => bindActionCreators({
  setTeamRoute: route => setTeamRoute(route)
}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PlayerList)
