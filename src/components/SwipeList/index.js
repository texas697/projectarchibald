import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Immutable from 'immutable'
import {
  Button,
  Icon,
  List,
  ListItem,
  Text
} from 'native-base'

class SwipeList extends Component {
  render () {
    const {data} = this.props
    return (
      <List
        enableEmptySections
        dataSource={data}
        renderRow={data =>
          <ListItem style={{ paddingLeft: 20 }}>
            <Text>
              {data.get('name')}
            </Text>
          </ListItem>}
        renderLeftHiddenRow={data =>
          <Button
            full
            onPress={() => this.props.onPress(data)}
            style={{
              backgroundColor: '#CCC',
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <Icon active name='information-circle' />
          </Button>}
        renderRightHiddenRow={(data, secId, rowId, rowMap) =>
          <Button
            full
            danger
            onPress={_ => this.props.onDelete(secId, rowId, rowMap)}
            style={{
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <Icon active name='trash' />
          </Button>}
        leftOpenValue={75}
        rightOpenValue={-75}
      />
    )
  }
}

SwipeList.propTypes = {
  data: PropTypes.ListViewDataSource,
  onDelete: PropTypes.func,
  onPress: PropTypes.func
}
export default SwipeList
