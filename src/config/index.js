export const FIREBASE_CONFIG = {
  apiKey: 'AIzaSyCb0gR6Rp6PcOSJ3_58hjX_dw5J3V9ukkU',
  authDomain: 'projectarchibald-1b093.firebaseapp.com',
  databaseURL: 'https://projectarchibald-1b093.firebaseio.com',
  projectId: 'projectarchibald-1b093',
  storageBucket: 'projectarchibald-1b093.appspot.com',
  messagingSenderId: '755420044257'
}

export const COLORS = {
  orange: '#e65d09'
}

export const PLACEHOLDER_IMAGE = 'iVBORw0KGgoAAAANSUhEUgAAAMgAAADIBAMAAABfdrOtAAAAG1BMVEXMzMyWlpbFxcWqqqqcnJyjo6OxsbG3t7e+vr6pf3+GAAAACXBIWXMAAA7EAAAOxAGVKw4bAAABTElEQVR4nO3UT07CQByG4Q8phSUtRV2WyAFK4gFaMyYuhRO0N6CJiVu4uTNTgw5h1XZh4vssfsnMl7TzXwIAAAAAAAAAAAAAAACA/+Pu+TWXPrLjd7l4MgfdDHqIsipVnFQPXflRmSS/GfTQFPFKm5dF1pUL29sUt4I+9rkytUftTr5IbaG2lmapJmUQDGDswrg/nWtf7Po9uj5FpaJlEAzwKTuTStoUvkiLdex2YH50M/kdDDJfuaFv3n2x7X1bdoFduCAYokntXOywfbHtc9Id2DjJw2CAaXYKBzxdd8HuTWPN5K46KFz6qDuv23WusfZktpI/x23ti220lavaF9dBf637VnAdzDaVPw7XQX92mAoudnwfu+/P3J/GuvGVMSZ4orb2duRuZ4wpx3q7Eit4bJvaL+HE9i/HeoUBAAAAAAAAAAAAAAAA/AFffMdIP+g1B4cAAAAASUVORK5CYII='
export const IMAGE_OPTIONS = {allowsEditing: true, aspect: [4, 3], quality: 0.5, base64: true}

export const EMPTY_OPTION = { value: 'undefined', label: '-Select-' }

export const TOAST_SUCCESS = {text: 'Success', position: 'bottom', duration: 3000, type: 'success'}
export const TOAST_ERROR = error => {
  return {text: error.message, position: 'bottom', duration: 3000, type: 'danger'}
}

export const IMAGE_64 = base64String => `data:image/jpg;base64,${base64String}`

export const AGE_GROUP_OPTIONS = [
  {value: 'undefined', label: '-Select-'},
  {value: '17', label: '17-Under'},
  {value: '16', label: '16-Under'},
  {value: '15', label: '15-Under'},
  {value: '14', label: '14-Under'},
  {value: '13', label: '13-Under'}]

export const REGION_OPTIONS = [
  {value: 'undefined', label: '-Select-'},
  {value: 'Northwest', label: 'Northwest'},
  {value: 'Southeast', label: 'Southeast'},
  {value: 'Midwest', label: 'Midwest'},
  {value: 'Mountain', label: 'Mountain'},
  {value: 'Southwest', label: 'Southwest'},
  {value: 'Pacific Northwest', label: 'Pacific Northwest'}]

export const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

export const REQUIRED_LABEL = '* required fields'
