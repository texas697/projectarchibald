import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import {
  Button,
  Footer,
  FooterTab,
  Icon
} from 'native-base'

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
      <Footer>
        <FooterTab>
          <Button active={this.state.tab1} onPress={() => this.toggleTab1()}>
            <Icon active={this.state.tab1} name='ios-funnel' />
          </Button>
          <Button active={this.state.tab2} onPress={() => this.toggleTab2()}>
            <Icon active={this.state.tab2} name='camera' />
          </Button>
          <Button active={this.state.tab3} onPress={() => this.toggleTab3()}>
            <Icon active={this.state.tab3} name='compass' />
          </Button>
          <Button active={this.state.tab4} onPress={() => this.toggleTab4()}>
            <Icon active={this.state.tab4} name='contact' />
          </Button>
        </FooterTab>
      </Footer>
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
