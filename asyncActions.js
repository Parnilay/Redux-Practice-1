let redux = require('redux')
let createStore = redux.createStore
let applyMiddleware = redux.applyMiddleware
let thunkMiddleware = require('redux-thunk').default
let axios = require('axios')

let initialState = {
  loading:false,
  users: [],
  error: ''
}


let FETCH_USERS_REQUEST = 'FETCH_USERS_REQUEST'
let FETCH_USERS_SUCCESS = 'FETCH_USERS_SUCCESS'
let FETCH_USERS_FAILURE = 'FETCH_USERS_FAILURE'

let fetchUsersRequest = () => {
  return {
    type: FETCH_USERS_REQUEST
  }
}

let fetchUsersSuccess = users => {
  return {
    type: FETCH_USERS_SUCCESS,
    payload: users
  }
}

let fetchUsersFailure = error => {
  return {
    type: FETCH_USERS_FAILURE,
    payload: error
  }
}

let reducer =(state= initialState, action) => {
  switch(action.type) {
    case FETCH_USERS_REQUEST:
      return {
        ...state,
        loading: true
    }
    case FETCH_USERS_SUCCESS:
      return {
        loading: false,
        users: action.payload,
        error: ''
      }
      case FETCH_USERS_FAILURE:
        return {
          loading: false,
          users: [],
          error: action.payload
        }
  }
}

let fetchUsers = () => {
  return function(dispatch){
    dispatch(fetchUsersRequest())
    axios.get('https://jsonplaceholder.typicode.com/users')
    .then(response => {
      // response.data is the array of users
      let users = response.data.map(user => user.id)
      let usersName = response.data.map(user => user.username)
      let usersStreet = response.data.map(user => user.address.street)
      dispatch(fetchUsersSuccess(users))
      dispatch(fetchUsersSuccess(usersName))
      dispatch(fetchUsersSuccess(usersStreet))
    })
    .catch(error => {
      // error.message is the error description
      dispatch(fetchUsersFailure(error.message))
    })
  }
}

let store = createStore(reducer, applyMiddleware(thunkMiddleware))
store.subscribe(() => {console.log(store.getState())})
store.dispatch(fetchUsers())
