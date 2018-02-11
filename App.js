import React from 'react'
import Setup from './src/boot/setup'
console.ignoredYellowBox = ['Setting a timer']
export default class App extends React.Component {
  render () {
    return <Setup />
  }
}
