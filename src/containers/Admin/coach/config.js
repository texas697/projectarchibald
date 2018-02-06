export const INPUT_FIELDS = [{
  label: 'Coach Name',
  value: '',
  id: 'name',
  isValid: true,
  error: 'required field',
  keyboardType: 'default',
  placeholder: 'xxxxxxx',
  nextId: 'coachPhone',
  returnKeyType: 'next'
}, {
  label: 'Coach Phone',
  value: '',
  id: 'coachPhone',
  isValid: true,
  error: 'must be 10 digits',
  keyboardType: 'phone-pad',
  placeholder: '9999999999',
  nextId: 'coachEmail',
  returnKeyType: 'next'
}, {
  label: 'Coach Email',
  value: '',
  id: 'coachEmail',
  isValid: true,
  error: 'must be valid email',
  keyboardType: 'email-address',
  placeholder: 'xxxxx@xxxxx.com',
  nextId: 'go',
  returnKeyType: 'go'
}]

export const PATH_COACH = 'coach'
