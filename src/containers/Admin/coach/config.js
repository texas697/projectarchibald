export const INPUT_FIELDS = [{
  label: 'Coach Name',
  value: '',
  id: 'coachName',
  keyboardType: 'default',
  placeholder: 'xxxxxxx',
  nextId: 'coachPhone',
  returnKeyType: 'next'
}, {
  label: 'Coach Phone',
  value: '',
  id: 'coachPhone',
  keyboardType: 'phone-pad',
  placeholder: '9999999999',
  nextId: 'coachEmail',
  returnKeyType: 'next'
}, {
  label: 'Coach Email',
  value: '',
  id: 'coachEmail',
  keyboardType: 'email-address',
  placeholder: 'xxxxx@xxxxx.com',
  nextId: 'go',
  returnKeyType: 'go'
}]

export const PATH_COACH = 'coach'
