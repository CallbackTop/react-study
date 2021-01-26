import React from 'react'

function reducer(state, action) {
  const {type, data} = action
  switch (type) {
    case 'add':
      return state + data.num
    case 'sub':
      return state - data.num
    default:
      return state
  }
}

export default function Counter() {

  const [count, dispatch] = React.useReducer(reducer, 0)

  return (
    <div>
      <h2>Count: {count}</h2>
      <button onClick={() => dispatch({type: 'add', data: {num: 1}})}>+1</button>
      <button onClick={() => dispatch({type: 'add', data: {num: 2}})}>+2</button>
      <button onClick={() => dispatch({type: 'sub', data: {num: 1}})}>-1</button>
      <button onClick={() => dispatch({type: 'sub', data: {num: 2}})}>-2</button>
    </div>
  )
}
