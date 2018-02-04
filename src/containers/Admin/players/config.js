export const INPUT_FIELDS = [{
  label: 'Player Name',
  value: '',
  id: 'playerName',
  keyboardType: 'default',
  placeholder: 'xxxxxxx',
  nextId: 'gradYear',
  returnKeyType: 'next'
}, {
  label: 'Grad Year',
  value: '',
  id: 'gradYear',
  keyboardType: 'numeric',
  placeholder: '9999',
  nextId: 'height',
  returnKeyType: 'next'
}, {
  label: 'Height',
  value: '',
  id: 'height',
  keyboardType: 'numeric',
  placeholder: "9'99",
  nextId: 'weight',
  returnKeyType: 'next'
}, {
  label: 'Weight',
  value: '',
  id: 'weight',
  keyboardType: 'numeric',
  placeholder: '999',
  nextId: 'phone',
  returnKeyType: 'next'
}, {
  label: 'Phone',
  value: '',
  id: 'phone',
  keyboardType: 'phone-pad',
  placeholder: '9999999999',
  nextId: 'parent',
  returnKeyType: 'next'
}, {
  label: 'Parent Name',
  value: '',
  id: 'parent',
  keyboardType: 'default',
  placeholder: 'xxxxxxx',
  nextId: 'parentPhone',
  returnKeyType: 'next'
}, {
  label: 'Parent Phone',
  value: '',
  id: 'parentPhone',
  keyboardType: 'phone-pad',
  placeholder: '9999999999',
  nextId: 'twitter',
  returnKeyType: 'next'
}, {
  label: 'Twitter',
  value: '',
  id: 'twitter',
  keyboardType: 'twitter',
  placeholder: 'xxxxxxx',
  nextId: 'snapchat',
  returnKeyType: 'next'
}, {
  label: 'Snapchat',
  value: '',
  id: 'snapchat',
  keyboardType: 'default',
  placeholder: 'xxxxxxx',
  nextId: 'instagram',
  returnKeyType: 'next'
}, {
  label: 'Instagram',
  value: '',
  id: 'instagram',
  keyboardType: 'default',
  placeholder: 'xxxxxxx',
  nextId: 'email',
  returnKeyType: 'next'
}, {
  label: 'Player Email',
  value: '',
  id: 'email',
  keyboardType: 'email-address',
  placeholder: 'xxxxx@xxxxx.com',
  nextId: '',
  returnKeyType: 'go'
}]

export const PATH_PLAYER = 'player'
