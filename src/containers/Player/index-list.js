import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import {ListView} from 'react-native'
import Immutable from 'immutable'
import { connect } from 'react-redux'
import {Container, Content, ListItem, Icon, Button, List, Header, Left, Title, Body, Right, Text, Thumbnail, CardItem, Card} from 'native-base'
import * as utils from '../../utils/index'
import mainStyles from '../../styles/index'
import * as actions from '../Filters/action'
import * as config from '../../config/index'

class PlayerList extends Component {
  constructor (props) {
    super(props)
    this._onSelectTeam = this._onSelectTeam.bind(this)
    this.ds = new ListView.DataSource({rowHasChanged: (r1, r2) => !Immutable.is(r1, r2)})
  }

  _onSelectTeam (data) {
  }

  render () {
    const {filters} = this.props
    const dataList = filters.get('data')

    return (
      <Container style={mainStyles.container}>
        <Header>
          <Left>
            <Button transparent onPress={() => this.props.navigation.goBack()}>
              <Icon name='arrow-back' />
            </Button>
          </Left>
          <Body><Title>&nbsp;</Title></Body>
          <Right />
        </Header>
        <Content>
          <Card>
            <CardItem>
              <List
                enableEmptySections
                dataSource={this.ds.cloneWithRows(dataList.toArray())}
                renderRow={data =>
                  <ListItem
                    avatar
                    onPress={() => this._onSelectTeam(data)}>
                    <Left>
                      <Thumbnail square small source={{ uri: config.IMAGE_64(data.get('image')) }} />
                    </Left>
                    <Text style={mainStyles.ml15}>{data.get('name')}</Text>
                  </ListItem>}
              />
            </CardItem>
          </Card>
        </Content>
      </Container>
    )
  }
}

PlayerList.propTypes = {
  filters: PropTypes.instanceOf(Immutable.Map),
  navigation: PropTypes.object
}

const mapStateToProps = state => ({
  filters: state.filters
})

const mapDispatchToProps = dispatch => bindActionCreators({
}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PlayerList)
