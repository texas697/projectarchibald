export const FORM_NOT_VALID = {
  title: 'Error',
  body: 'Form is not valid. Check fields'
}
export const PASS_NO_MATCH = {
  title: 'Passwords',
  body: 'Do not Match'
}
export const ADD_STAFF = name => {
  return {
    title: 'Add New Staff to Master List?',
    body: name
  }
}
export const UPDATE_STAFF = name => {
  return {
    title: 'Update Selected Staff?',
    body: name
  }
}
export const DELETE_STAFF = name => {
  return {
    title: 'Delete Staff from Master List?',
    body: name
  }
}
export const ADD_COACH = name => {
  return {
    title: 'Add Coach?',
    body: name
  }
}
export const UPDATE_COACH = name => {
  return {
    title: 'Update Coach?',
    body: name
  }
}
export const ADD_HS = name => {
  return {
    title: 'Add High School?',
    body: name
  }
}
export const UPDATE_HS = name => {
  return {
    title: 'Update High School?',
    body: name
  }
}
export const UPDATE_TEAM = name => {
  return {
    title: 'Update Team?',
    body: name
  }
}
export const ADD_PLAYER = name => {
  return {
    title: 'Add New Player to Master List?',
    body: name
  }
}
export const UPDATE_PLAYER = name => {
  return {
    title: 'Update Selected Player?',
    body: name
  }
}
export const DELETE_PLAYER = name => {
  return {
    title: 'Delete Player from Master List?',
    body: name
  }
}
export const ADD_ROSTER = {
  title: 'Add Roster?',
  body: ''
}
export const UPDATE_ROSTER = {
  title: 'Update Roster?',
  body: ''
}
export const ROSTER_IN_LIST = {
  title: 'Selected is Already In Roster',
  body: ''
}
export const ROSTER_NO_HS_COACH = {
  title: 'High School and Coach must be filled out',
  body: ''
}
export const ROSTER_NO_PLAYERS = {
  title: 'Roster must have at least 1 player',
  body: ''
}
export const ROSTER_NO_STAFF = {
  title: 'Roster must have at least 1 staff',
  body: ''
}
