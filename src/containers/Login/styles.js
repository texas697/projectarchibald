
const React = require('react-native')
const { StyleSheet } = React

const styles = StyleSheet.create({
  logo: {
    height: 200,
    width: null,
    flex: 1,
    marginTop: 40
  },
  registerBtn: {
    alignSelf: 'flex-end',
    marginBottom: 10
  },
  forgotBtn: {
    alignSelf: 'flex-end'
  },
  contactBtn: {
    alignSelf: 'flex-start',
    marginBottom: 10
  },
  smFont: {
    fontSize: 10
  },
  forgotFont: {
    fontSize: 10,
    color: '#000'
  }
})

export default styles
