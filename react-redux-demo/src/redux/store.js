import {createStore, applyMiddleware, combineReducers} from 'redux'
import thunk from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'

import countReducer from './reducers/count'
import personReducer from './reducers/person'

const combinedReducers = combineReducers({
  count: countReducer,
  persons: personReducer
})

export default createStore(combinedReducers, composeWithDevTools(applyMiddleware(thunk)))