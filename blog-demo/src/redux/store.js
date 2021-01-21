import {createStore, applyMiddleware, combineReducers} from 'redux'
import thunk from 'redux-thunk'

import calculatorReducer from './reducers/calculator'
import bookshelfReducer from './reducers/bookshelf'

const combinedReducers = combineReducers(
  {
    result: calculatorReducer,
    books: bookshelfReducer,
  }
)

export default createStore(combinedReducers, applyMiddleware(thunk))