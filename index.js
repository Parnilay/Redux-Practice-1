let redux = require("redux");
let reduxLogger = require('redux-logger');

let createStore = redux.createStore;
let combineReducers = redux.combineReducers;
let applyMiddleware = redux.applyMiddleware;
let logger = reduxLogger.createLogger();
let BUY_CAKE ='BUY_CAKE'
let BUY_ICECREAM ='BUY_ICECREAM'

function buyCake(){
  return {
    type: BUY_CAKE
    //info: 'First Redux Action'
  }
}

function buyIceCream(){
  return {
    type: BUY_ICECREAM
    //info: 'Second Redux Action'
  }
}

// (previousState, action) => newState

let cakeInitialState = {
  numOfCakes: 10
}

let iceCreamInitialState = {
  numOfIceCreams: 20
}

let cakeReducer = (state=cakeInitialState, action) => {
  switch(action.type){
    case BUY_CAKE: return {
      ...state,
      numOfCakes: state.numOfCakes - 1
    }
    default: return state
  }
}

let iceCreamReducer = (state=iceCreamInitialState, action) => {
  switch(action.type){
    case BUY_ICECREAM: return {
      ...state,
      numOfIceCreams: state.numOfIceCreams - 1
    }
    default: return state
  }
}

let rootReducer = combineReducers({
  cake: cakeReducer,
  iceCream: iceCreamReducer
})

let store = createStore(rootReducer, applyMiddleware(logger))
console.log("Initial state", store.getState())
let unsubscribe = store.subscribe(() => {})
store.dispatch(buyCake())
store.dispatch(buyCake())
store.dispatch(buyCake())
store.dispatch(buyIceCream())
store.dispatch(buyCake())
unsubscribe()
