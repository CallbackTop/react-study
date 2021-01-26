import React from 'react'

function StudyRef() {

  const inputRef = React.useRef()

  function getFocus() {
    inputRef.current.focus()
  }

  return (
    <div>
      <input ref={inputRef} type="text"/>
      <button onClick={() => getFocus()}>Click to focus</button>
    </div>
  )
}

// 借用 Ref 来保存变化前的值
export default function RefSavePrevValue() {

  const [count, setCount] = React.useState(0)
  const beforeRef = React.useRef()

  function add() {
    beforeRef.current = count
    setCount(count => count + 1)
  }

  return (
    <div>
      <h2>Current: {count}</h2>
      <h2>Before: {beforeRef.current}</h2>
      <button onClick={() => add()}>Add</button>
    </div>
  )

}
