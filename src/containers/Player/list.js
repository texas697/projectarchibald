import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import Immutable from 'immutable'
import { connect } from 'react-redux'
import {Container, Content, ListItem, Icon, Button, List, Header, Left, Title, Body, Right, Text, Thumbnail, CardItem, Card} from 'native-base'
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
      <Container style={mainStyles.container}>
        <Header>
          <Left>
            <Button transparent onPress={() => this.props.navigation.navigate('Home')}>
              <Icon name='arrow-back' />
            </Button>
          </Left>
          <Body><Title>&nbsp;</Title></Body>
          <Right />
        </Header>
        <Content>
          <Card style={{height: visibleHeight - 90}}>
            <CardItem header style={mainStyles.alignItemsCenter}>
              <Text>Search Results</Text>
            </CardItem>
            <CardItem>
              <Body>
                <List>
                  {dataList.map((item, i) => (
                    <ListItem
                      key={i}
                      avatar
                      onPress={() => actions.setPlayer(item)}>
                      <Left>
                        <Thumbnail square small source={{ uri: config.IMAGE_64(item.get('image')) }} />
                      </Left>
                      <Text style={mainStyles.ml15}>{`${item.get('firstName')} ${item.get('lastName')}`}</Text>
                    </ListItem>
                  ))}
                </List>
              </Body>
            </CardItem>
          </Card>
        </Content>
      </Container>
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
