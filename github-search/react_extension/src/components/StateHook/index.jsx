import React from 'react'
import ReactDOM from 'react-dom'
import {nanoid} from 'nanoid'

export default function StateHookDemo() {

  const [sum, setSum] = React.useState(0)
  const [name, setName] = React.useState('tom')
  const [count, setCount] = React.useState(0)

  React.useEffect(() => {
    let timer = setInterval(() => {
      setCount(count => count + 1)
    }, 1000)
    return () => {
      clearInterval(timer)
    }
  }, [])

  // 和 React.createRef() 用法一致
  const myRef = React.useRef()

  function add() {
    setSum(sum + 1)
  }

  function changeName() {
    setName(nanoid())
  }

  function show() {
    alert(myRef.current.value)
  }

  function unmount() {
    ReactDOM.unmountComponentAtNode(document.getElementById('root'))
  }

  return (
    <div>
      <h2>姓名：{name}</h2>
      <h2>当前结果：{sum}</h2>
      <h2>自增计数：{count}</h2>
      <input type="text" ref={myRef} /><br/>
      <button onClick={add}>加一</button>&nbsp;&nbsp;
      <button onClick={changeName}>改名</button>&nbsp;&nbsp;
      <button onClick={unmount}>卸载全部组件</button>&nbsp;&nbsp;
      <button onClick={show}>弹窗输入数据</button>
    </div>
  )
}