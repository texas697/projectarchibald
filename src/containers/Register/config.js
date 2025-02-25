export const INPUT_FIELDS = [{
  label: 'Name*',
  // value: 'Rudy Sanchez',
  value: '',
  id: 'name',
  keyboardType: 'default',
  isValid: true,
  error: 'required field',
  secureTextEntry: false,
  autoCapitalize: 'words',
  placeholder: 'xxxxxxx',
  nextId: 'email',
  returnKeyType: 'next'
}, {
  label: 'Email*',
  // value: 'texas697@gmail.com',
  value: '',
  id: 'email',
  keyboardType: 'email-address',
  isValid: true,
  error: 'email not valid',
  secureTextEntry: false,
  autoCapitalize: 'none',
  placeholder: 'xxxxx@xxxxx.com',
  nextId: 'password',
  returnKeyType: 'next'
}, {
  label: 'Password*',
  // value: 'pass123',
  value: '',
  id: 'password',
  keyboardType: 'default',
  isValid: true,
  error: 'required field',
  secureTextEntry: true,
  autoCapitalize: 'none',
  placeholder: 'xxxxxxx',
  nextId: 'confirmPassword',
  returnKeyType: 'next'
}, {
  label: 'Confirm Password*',
  // value: 'pass123',
  value: '',
  id: 'confirmPassword',
  keyboardType: 'default',
  isValid: true,
  error: 'required field',
  secureTextEntry: true,
  autoCapitalize: 'none',
  placeholder: 'xxxxxxx',
  nextId: 'go',
  returnKeyType: 'go'
}]
