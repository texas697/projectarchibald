export const INPUT_FIELDS = [{
  label: 'Coach Name',
  value: '',
  id: 'coachName',
  keyboardType: 'default',
  nextId: 'coachPhone',
  returnKeyType: 'next'
}, {
  label: 'Coach Phone',
  value: '',
  id: 'coachPhone',
  keyboardType: 'phone-pad',
  nextId: 'coachEmail',
  returnKeyType: 'next'
}, {
  label: 'Coach Email',
  value: '',
  id: 'coachEmail',
  keyboardType: 'email-address',
  nextId: '',
  returnKeyType: 'go'
}]

export const PATH_COACH = 'coach'
