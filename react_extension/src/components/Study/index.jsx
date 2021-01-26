import {React, useState, useEffect, useCallback} from 'react'

function useCount(initValue) {
  const [count, setCount] = useState(initValue)
  return [count, () => {
    setCount(count => count + 1)
  }]
}

function useInterval(callback, time) {
  useEffect(() => {
    const i = setInterval(callback, time)
    return () => {
      clearInterval(i)
    }
  }, [])
}

export default function Study() {

  const [count, addCount] = useCount(0)
  // const [count, setCount] = useState(0)

  useInterval(() => {
    addCount()
  }, 1000)

  // useEffect(() => {
  //   const i = setInterval(() => {
  //     addCount(count => count + 1)
  //   }, 1000)
  //   return () => {
  //     clearInterval(i)
  //   }
  // }, [])

  return (
    <div>
      <h2>Number：{count}</h2>
      <br/>
      {/* <button onClick={() => setCount(count => count + 1)}>Add</button> */}
    </div>
  )
}
