import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import NB from 'native-base'

import {toggleUserModal} from '../../containers/Home/action'

class CustomFooter extends Component {
  constructor (props) {
    super(props)
    this.state = {
      tab1: false,
      tab2: false,
      tab3: true,
      tab4: false
    }
  }
  toggleTab1 () {
    this.setState({
      tab1: true,
      tab2: false,
      tab3: false,
      tab4: false
    })
    this.props.toggleUserModal()
  }
  toggleTab2 () {
    this.setState({
      tab1: false,
      tab2: true,
      tab3: false,
      tab4: false
    })
  }
  toggleTab3 () {
    this.setState({
      tab1: false,
      tab2: false,
      tab3: true,
      tab4: false
    })
  }
  toggleTab4 () {
    this.setState({
      tab1: false,
      tab2: false,
      tab3: false,
      tab4: true
    })
  }
  render () {
    return (
      <NB.Footer>
        <NB.FooterTab>
          <NB.Button active={this.state.tab1} onPress={() => this.toggleTab1()}>
            <NB.Icon active={this.state.tab1} name='ios-funnel' />
          </NB.Button>
          <NB.Button active={this.state.tab2} onPress={() => this.toggleTab2()}>
            <NB.Icon active={this.state.tab2} name='camera' />
          </NB.Button>
          <NB.Button active={this.state.tab3} onPress={() => this.toggleTab3()}>
            <NB.Icon active={this.state.tab3} name='compass' />
          </NB.Button>
          <NB.Button active={this.state.tab4} onPress={() => this.toggleTab4()}>
            <NB.Icon active={this.state.tab4} name='contact' />
          </NB.Button>
        </NB.FooterTab>
      </NB.Footer>
    )
  }
}

CustomFooter.propTypes = {
  toggleUserModal: PropTypes.func
}

const mapStateToProps = state => ({
  login: state.login,
  home: state.home,
  dimensions: state.dimensions
})

const mapDispatchToProps = dispatch => bindActionCreators({
  toggleUserModal: () => toggleUserModal()
}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CustomFooter)
