export const ALL_FIELDS_REQUIRED = {
  title: 'Required',
  body: 'All Fields Required'
}
export const PASS_NO_MATCH = {
  title: 'Passwords',
  body: 'Do not Match'
}
export const ADD_STAFF = name => {
  return {
    title: 'Add New Staff to Master List?',
    body: {name}
  }
}
export const UPDATE_STAFF = name => {
  return {
    title: 'Update Selected Staff?',
    body: {name}
  }
}
export const DELETE_STAFF = name => {
  return {
    title: 'Delete Staff from Master List?',
    body: {name}
  }
}
export const UPDATE_COACH = name => {
  return {
    title: 'Update Coach?',
    body: {name}
  }
}
