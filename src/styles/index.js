import { getStatusBarHeight } from 'react-native-status-bar-height'
import { Platform } from 'react-native'
import * as config from '../config/index'

const platform = Platform.OS

export default {
  container: {
    flex: 1,
    width: null,
    height: null,
    backgroundColor: config.COLORS.orange,
    marginTop: getStatusBarHeight()
  },
  scrollContainer: {
    flex: 1,
    width: null,
    height: null,
    backgroundColor: config.COLORS.orange
  },
  labelHeight: {
    lineHeight: 37
  },
  modalHeader: {
    backgroundColor: config.COLORS.orange
  },
  imagePick: {
    width: 200,
    height: 200
  },
  textCenter: {
    textAlign: 'center'
  },
  selectLabel: {
    color: 'grey',
    fontSize: 15,
    paddingLeft: 5
  },
  deleteSlideBtn: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  alignStretch: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'stretch'
  },
  alignItemsCenter: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  alignItemsLeft: {
    justifyContent: 'flex-start',
    alignItems: 'flex-start'
  },
  alignItemsRight: {
    justifyContent: 'flex-end',
    alignItems: 'flex-end'
  },
  alignSelfCenter: {
    alignSelf: 'center'
  },
  alignSelfLeft: {
    alignSelf: 'flex-start'
  },
  alignSelfRight: {
    alignSelf: 'flex-end'
  },
  noBtmBorder: {
    borderBottomWidth: 0
  },
  p0: {
    padding: 0
  },
  p5: {
    padding: 5
  },
  p10: {
    padding: 10
  },
  pl0: {
    paddingLeft: 0
  },
  pl5: {
    paddingLeft: 5
  },
  pr5: {
    paddingRight: 5
  },
  pt5: {
    paddingTop: 5
  },
  pb5: {
    paddingBottom: 5
  },
  pl10: {
    paddingLeft: 10
  },
  pr10: {
    paddingRight: 10
  },
  pt0: {
    paddingTop: 0
  },
  pt10: {
    paddingTop: 10
  },
  pb10: {
    paddingBottom: 10
  },
  pl15: {
    paddingLeft: 15
  },
  pr15: {
    paddingRight: 15
  },
  pt15: {
    paddingTop: 15
  },
  pb15: {
    paddingBottom: 15
  },
  pl20: {
    paddingLeft: 20
  },
  m0: {
    margin: 0
  },
  m5: {
    margin: 5
  },
  m10: {
    margin: 10
  },
  ml0: {
    marginLeft: 0
  },
  ml5: {
    marginLeft: 5
  },
  mr5: {
    marginRight: 5
  },
  mt5: {
    marginTop: 5
  },
  mb5: {
    marginBottom: 5
  },
  ml10: {
    marginLeft: 10
  },
  mr10: {
    marginRight: 10
  },
  mt10: {
    marginTop: 10
  },
  mb10: {
    marginBottom: 10
  },
  ml15: {
    marginLeft: 15
  },
  mr15: {
    marginRight: 15
  },
  mt15: {
    marginTop: 15
  },
  mb15: {
    marginBottom: 15
  }
}