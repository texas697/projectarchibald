export const INPUT_FIELDS = [{
  label: 'First Name*',
  value: '',
  id: 'firstName',
  isValid: true,
  error: 'required field',
  keyboardType: 'default',
  placeholder: 'xxxxxxx',
  nextId: 'lastName',
  returnKeyType: 'next'
}, {
  label: 'Last Name*',
  value: '',
  id: 'lastName',
  isValid: true,
  error: 'required field',
  keyboardType: 'default',
  placeholder: 'xxxxxxx',
  nextId: 'email',
  returnKeyType: 'next'
}, {
  label: 'Email*',
  value: '',
  id: 'email',
  isValid: true,
  error: 'must be valid email',
  keyboardType: 'email-address',
  placeholder: 'xxxxx@xxxxx.com',
  nextId: 'gradYear',
  returnKeyType: 'next'
}, {
  label: 'Grad Year*',
  value: '',
  id: 'gradYear',
  isValid: true,
  error: 'must be 4 digits',
  keyboardType: 'numeric',
  placeholder: '9999',
  nextId: 'height',
  returnKeyType: 'next'
}, {
  label: 'Height*',
  value: '',
  id: 'height',
  isValid: true,
  error: 'must be 3 digits',
  keyboardType: 'numeric',
  placeholder: '999',
  nextId: 'weight',
  returnKeyType: 'next'
}, {
  label: 'Weight*',
  value: '',
  id: 'weight',
  isValid: true,
  error: 'must be 3 digits',
  keyboardType: 'numeric',
  placeholder: '999',
  nextId: 'phone',
  returnKeyType: 'next'
}, {
  label: 'Phone*',
  value: '',
  id: 'phone',
  isValid: true,
  error: 'must be 10 digits',
  keyboardType: 'phone-pad',
  placeholder: '9999999999',
  nextId: 'age',
  returnKeyType: 'next'
}, {
  label: 'Age*',
  value: '',
  id: 'age',
  isValid: true,
  error: 'must be 2 digits',
  keyboardType: 'phone-pad',
  placeholder: '99',
  nextId: 'parentPhone',
  returnKeyType: 'next'
}, {
  label: 'Parent Name*',
  value: '',
  id: 'parent',
  isValid: true,
  error: 'required field',
  keyboardType: 'default',
  placeholder: 'xxxxxxx',
  nextId: 'parentPhone',
  returnKeyType: 'next'
}, {
  label: 'Parent Phone*',
  value: '',
  id: 'parentPhone',
  isValid: true,
  error: 'must be 10 digits',
  keyboardType: 'phone-pad',
  placeholder: '9999999999',
  nextId: 'twitter',
  returnKeyType: 'next'
}, {
  label: 'Twitter',
  value: '',
  id: 'twitter',
  isValid: true,
  keyboardType: 'twitter',
  placeholder: 'xxxxxxx',
  nextId: 'snapchat',
  returnKeyType: 'next'
}, {
  label: 'Snapchat',
  value: '',
  id: 'snapchat',
  isValid: true,
  keyboardType: 'default',
  placeholder: 'xxxxxxx',
  nextId: 'instagram',
  returnKeyType: 'next'
}, {
  label: 'Instagram',
  value: '',
  id: 'instagram',
  isValid: true,
  keyboardType: 'default',
  placeholder: 'xxxxxxx',
  nextId: 'numbers',
  returnKeyType: 'next'
}, {
  label: 'Numbers*',
  value: '',
  id: 'numbers',
  isValid: true,
  error: 'must be 99/99',
  keyboardType: 'default',
  placeholder: '99/99',
  nextId: 'accomplishments',
  returnKeyType: 'next'
}, {
  label: 'Accomplishments',
  value: '',
  id: 'accomplishments',
  isValid: true,
  keyboardType: 'default',
  placeholder: 'xxxxxxx',
  nextId: 'go',
  returnKeyType: 'go'
}]

export const PATH_PLAYER = 'player'
