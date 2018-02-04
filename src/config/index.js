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

export const IMAGE_OPTIONS = {allowsEditing: true, aspect: [4, 3], base64: true}

export const EMPTY_OPTION = { value: 'undefined', label: '-Select-' }

export const TOAST_SUCCESS = {text: 'Success', position: 'bottom', duration: 3000, type: 'success'}
export const TOAST_ERROR = error => {
  return {text: error.message, position: 'bottom', duration: 3000, type: 'danger'}
}

export const IMAGE_64 = base64String => `data:image/jpg;base64,${base64String}`

export const FILTERS = {
  status: [
    {value: 'active', label: 'North'},
    {value: 'builtout', label: 'East'},
    {value: 'future', label: 'West'},
    {value: 'future', label: 'South'}],
  listPriceMin: [
    {value: -1, label: 'No min'},
    {value: 25000, label: '$25,000'},
    {value: 50000, label: '$50,000'},
    {value: 75000, label: '$75,000'},
    {value: 100000, label: '$100,000'},
    {value: 125000, label: '$125,000'},
    {value: 150000, label: '$150,000'},
    {value: 175000, label: '$175,000'},
    {value: 200000, label: '$200,000'},
    {value: 300000, label: '$300,000'},
    {value: 400000, label: '$400,000'},
    {value: 500000, label: '$500,000'},
    {value: 600000, label: '$600,000'},
    {value: 700000, label: '$700,000'},
    {value: 800000, label: '$800,000'},
    {value: 900000, label: '$900,000'},
    {value: 1000000, label: '$1,000,000'}
  ],
  listPriceMax: [
    {value: 10000000000, label: 'No max'},
    {value: 25000, label: '$25,000'},
    {value: 50000, label: '$50,000'},
    {value: 75000, label: '$75,000'},
    {value: 100000, label: '$100,000'},
    {value: 125000, label: '$125,000'},
    {value: 150000, label: '$150,000'},
    {value: 175000, label: '$175,000'},
    {value: 200000, label: '$200,000'},
    {value: 300000, label: '$300,000'},
    {value: 400000, label: '$400,000'},
    {value: 500000, label: '$500,000'},
    {value: 600000, label: '$600,000'},
    {value: 700000, label: '$700,000'},
    {value: 800000, label: '$800,000'},
    {value: 900000, label: '$900,000'},
    {value: 1000000, label: '$1,000,000'}
  ],
  lotSizeMin: [
    {value: -1, label: 'No min'},
    {value: 2000, label: '2,000 sqft'},
    {value: 4500, label: '4,500 sqft'},
    {value: 6500, label: '6,500 sqft'},
    {value: 8000, label: '8,000 sqft'},
    {value: 10890, label: '0.25 acre'},
    {value: 14375, label: '0.33 acre'},
    {value: 21780, label: '0.5 acre'},
    {value: 43560, label: '1 acre'},
    {value: 87120, label: '2 acre'},
    {value: 130680, label: '3 acre'}
  ],
  lotSizeMax: [
    {value: 10000000000, label: 'No max'},
    {value: 2000, label: '2,000 sqft'},
    {value: 4500, label: '4,500 sqft'},
    {value: 6500, label: '6,500 sqft'},
    {value: 8000, label: '8,000 sqft'},
    {value: 10890, label: '0.25 acre'},
    {value: 14375, label: '0.33 acre'},
    {value: 21780, label: '0.5 acre'},
    {value: 43560, label: '1 acre'},
    {value: 87120, label: '2 acre'},
    {value: 130680, label: '3 acre'}
  ]
}
