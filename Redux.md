Redux 是普遍用于 React 项目中的状态管理工具，类似 Vue 使用的 Vuex。使用 Redux 需要记住一条至关重要的原则：**能不用就不用，强行用非死即残**。

![](https://assets.callback.top/2021-01-20-redux-principal.png)

# Redux 工作流程中的协作方

React Components 就是开发者自己编写的组件，需要改变状态时创建一个 Action 分发给 Store，需要获取状态时直接从 Store 拿。

Action Creators 负责创建 Action，实际就是写一堆函数来创建不同的 Action，每个 Action 都是只有两个属性的平平无奇的对象。属性 `type` 表示这个 Action 要干啥，值永远是字符串；属性 `data` 表示做 `type` 表示的这件事需要的数据，值可以是任何类型。

```javascript
{
  type: string
  data: any
}
```

Store 是整个 Redux 的核心。当收到一个 Action 时负责将其维护的状态的当前值和 Action 打包发给 Reducer 进行状态变更，Reducer 变更结束后保存变更结果。

Reducers 是个没有感情的打工人，根据 Store 发过来的 Action 对状态进行对应变更并返回给 Store。

# 简单用一下 Redux

假设有个计算器组件 `Calculator`，它可以加减输入的操作数，最后把计算结果显示出来。在不使用 Redux 的情况下实现如下：

`src/components/Calculator/index.jsx`

```javascript
import React, { Component } from 'react'
export default class Calculator extends Component {
  state = {
    result: 0
  }
  handleIncrease = () => {
    const {result} = this.state
    const value = this.node.value
    this.setState({
      result: result + (value * 1)
    })
  }
  handleDecrease = () => {
    const {result} = this.state
    const value = this.node.value
    this.setState({
      result: result - (value * 1)
    })
  }
  render() {
    return (
      <div>
        <h2>当前计算结果：{this.state.result}</h2>
        <input ref={c => this.node = c} type="text" placeholder="操作数"/>&nbsp;&nbsp;
        <button onClick={this.handleIncrease}>加</button>&nbsp;&nbsp;
        <button onClick={this.handleDecrease}>减</button>
      </div>
    )
  }
}
```

开始 Redux 改造前记得安装一下 Redux，Redux 相关的文件通常放置在 `src/redux` 目录下，这样便于管理。

```shell
yarn add redux
```

上文提到 Action 的 `type` 属性永远是字符串，并且 Reducer 也要接收这个 Action，那么用脚想一下也知道 `type` 会到处用。字符串满天飞最可怕的事情是什么？那肯定是同一个字符串在不同的使用位置出现拼写错误。所以通常会在 `src/redux` 目录下创建一份 JS 文件来专门维护 Action 的 `type` 。在上面的示例中我们要做的 Action 有两个，一个是「加」，一个是「减」。

`src/redux/constants.js`

```javascript
export const CalculatorActionType = {
  INCREASE: 'increase',
  DECREASE: 'decrease',
}
```

通常全局只需要一份常量文件，所以最好按照不同组件创建对象进行维护，避免出现不同组件之间重名的情况，也避免维护的使用看着满屏的常量懵逼。常量名和对应的值随便写，你自己看得懂又不会被合作的同事打就行。

接下来是创建 Action Creator 来生成不同的 Action，实际上就是在一个 JS 文件里面写一堆函数生成 Action 对象。

`src/redux/actions/calculator.js`

```javascript
import {CalculatorActionType} from '../constants' // 引入常量
export const increase = data => ({type: CalculatorActionType.INCREASE, data})
export const decrease = data => ({type: CalculatorActionType.DECREASE, data})
```

返回值是一个对象，用小括号包裹避免把大括号识别为函数体，还用了对象简写等 JS 的骚操作（作为后端表示记住就行，JS 骚操作太多学不完）。

有了 Action 接下来就是召唤打工人 Reducer 进行状态变更。Reducer 按照要求一定要是一个「纯函数」，简单理解就是输入参数不允许在函数体中被改变，返回的一定是个新的东西，具体概念自行 wiki。

`src/redux/reducers/calculator.js`

```javascript
import {CalculatorActionType} from '../constants'
const initState = 0 // 初始化值
export default function calculatorReducer(prevState = initState, action) {
  const {type, data} = action
  switch (type) {
    case CalculatorActionType.INCREASE:
      return prevState + data
    case CalculatorActionType.DECREASE:
      return prevState - data
    default:
      return prevState
  }
}
```

函数名可以随便改无所谓，第一个参数是要变更状态的当前值，即此时此刻 Store 里面保存的状态值，第二个参数就是上面创建的 Action 对象。函数内部就是 switch 不同的 ActionType 做不同的状态变更。需要注意的是，不要在 Reducer 里面去做网络请求和数据计算，这些工作放到业务组件或者 Action Creator 里完成。不要问为什么，记住就行！Reducer 在 Redux 开始工作时会默认调用一次对状态进行初始化，而第一次调用时 `prevState` 是 `undefined`，所以建议直接给一个初始化值避免恶心的 `undefined`。

最后就是创建 Redux 中的资本家 Store。创建 Store 之前一定要有 Reducer，否则资本家没有可以 996 压榨的打工人。Store 全局只需要一份。

`src/redux/store.js`

```javascript
import {createStore} from 'redux'
import calculatorReducer from './reducers/calculator'
export default createStore(calculatorReducer)
```

`createStore()` 返回一个 Store 对象，所以必须要暴露出去，否则没法在组件里用。到这里 Redux 就能用了，接下来就是去组件里使用。将原来基于组件 `state` 的示例改造如下：

`src/components/Calculator/index.jsx`

```javascript
import React, { Component } from 'react'
import store from '../../redux/store'
import {increase, decrease} from '../../redux/actions/calculator'
export default class Calculator extends Component {
  componentDidMount() {
    store.subscribe(() => {
      this.setState({})
    })
  }
  handleIncrease = () => {
    const value = this.node.value
    store.dispatch(increase(value * 1))
  }
  handleDecrease = () => {
    const value = this.node.value
    store.dispatch(decrease(value * 1))
  }
  render() {
    return (
      <div>
        <h2>当前计算结果：{store.getState()}</h2>
        <input ref={c => this.node = c} type="text" placeholder="操作数"/>&nbsp;&nbsp;
        <button onClick={this.handleIncrease}>加</button>&nbsp;&nbsp;
        <button onClick={this.handleDecrease}>减</button>
      </div>
    )
  }
}
```

对操作数的加减运算通过 Store 实例调用 `dispatch()` 函数分发 Action 来完成，Action 的创建调用的也是对应的函数，`value * 1` 是为了把字符串转换成数字。 展示计算结果时调用 `getState()` 函数从 Redux 获取状态值。

在组件挂载钩子 `componentDidMount` 中调用 Store 的 `subscribe()` 函数进行 Store 状态变化的订阅，当 Store 维护的状态发生变化时会触发监听，然后执行一次无意义的组件状态变更，目的是为了触发 `render()` 函数进行页面重新渲染，否则 Store 中维护的状态值无法更新到页面上。

补充一点，Action 分为同步和异步两种。如果返回的是一个对象就表示同步 Action，如果返回的是一个函数就表示异步 Action。

```javascript
export const increaseAsyn = (data, delay) => {
  return (dispatch) => {
    setTimeout(() => {
      dispatch(increase(data))
    }, delay)
  }
}
```

这里用一个定时器来模拟异步任务，实际上这里可以是发起网络请求获取数据。**异步 Action 内部一定是调用同步 Action 来触发状态变更**。异步 Action 需要单独的库支持：

```shell
yarn add redux-thunk
```

然后需要对 Store 配置进行修改：

```javascript
import {createStore, applyMiddleware} from 'redux' // 引入 applyMiddleware
import thunk from 'redux-thunk' // 引入 thunk
import calculatorReducer from './reducers/calculator'
export default createStore(calculatorReducer, applyMiddleware(thunk)) // 应用 thunk
```

# React-Redux

Redux 和 React 其实没有一毛钱关系，只是刚好名字长得像而已。但是 Redux 在 React 项目中使用的非常多，所以 React 官方就基于 Redux 做了层封装，目的是让 Redux 更好用，然而我并不觉得好用了多少。

![](https://assets.callback.top/2021-01-21-react-redux-principle.png)

React-Redux 搞出了「容器组件」和「UI 组件」两个概念。「容器组件」是「UI 组件」的父组件，负责与 Redux 打交道，也就是分发 Action 通知 Store 改变状态值和从 Redux 获取状态值。这样「UI 组件」就完全和 Redux 解耦，原本对 Redux 的直接操作通过「容器组件」代理完成。「容器组件」与「UI 组件」通过 `props` 进行交互。使用前先按照库：

```shell
yarn add react-redux
```

改造流程就两步，创建一个「容器组件」，然后把 Calculator 改造成符合规范的「UI 组件」放在「容器组件」中。

`src/containers/Calculator/index.jsx`

```javascript
import {connect} from 'react-redux'
import Calculator from '../../components/Calculator/index'
export default connect()(Calculator)
```

容器组件通常放在 `src/containers` 目录下，和「UI 组件」的 `src/components` 目录进行区分，当然这不是必须的，你开心就好。「容器组件」的创建就是使用 `connect()` 函数连接「UI 组件」，不要问为什么，记住就行！有了「容器组件」后就不用在 `App.js` 中使用「UI 组件了」，而应该换成「容器组件」。

```javascript
import React, { Component } from 'react'
import store from './redux/store' // 引入 store
import Calculator from './containers/Calculator' // 引入容器组件
export default class App extends Component {
  render() {
    return (
      <div>
        <Calculator store={store}/>
      </div>
    )
  }
}
```

记得引入 Store 并通过 `props` 传递给 Calculator 容器组件，否则没法做状态操作。如果有很多个「容器组件」都需要传递 Store，可以直接在入口文件 `index.js` 中使用 `<Provider>` 组件一把梭，这样就不用在 `App.js` 里写了。

```javascript
import React from 'react';
import ReactDOM from 'react-dom';
import store from './redux/store' // 引入 store
import {Provider} from 'react-redux' // 引入 Provider 组件
import App from './App';
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
```

使用 `<Provider>` 组件还有一个好处是不用使用 `store.subscribe()` 订阅 Redux 状态变更了，`<Provider>` 已经提供了这个功能。

回到容器组件 Calculator 中，`connect()` 函数可以接收两个函数用于将 Redux 维护的状态和变更状态的行为映射到「UI 组件」的 `props` 上。

```javascript
import {connect} from 'react-redux'
import Calculator from '../../components/Calculator/index'
import {increase, decrease} from '../../redux/actions/calculator'

function mapStateToProps(state) {
  return {result: state}
}
function mapDispatchToProps(dispatch) {
  return {
    increase: data => dispatch(increase(data)),
    decrease: data => dispatch(decrease(data)),
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Calculator)
```

`mapStateToProps()` 将 Redux 维护的状态值映射到「UI 组件」（不是「容器组件」）的 `props` 上，你别管怎么映射，照着规范写就行了。返回值是一个对象，`key` 表示映射到 `props` 后的 `key`。也就是你在「UI 组件」里调用 `this.props.xxx` 时那个 `xxx` 的名字。

`mapDispatchToProps()` 将 Redux 操作状态的动作映射到「UI 组件」（不是「容器组件」）的 `props` 上。返回对象的 `key` 和 `mapStateToProps()`  里的 `key` 一个意思。

当然这样写有点麻烦，所以可以来个骚操作简写一波：

```javascript
import {connect} from 'react-redux'
import Calculator from '../../components/Calculator/index'
import {increase, decrease} from '../../redux/actions/calculator'

export default connect(
  state => ({result: state}),
  {
    increase,
    decrease,
  }
)(Calculator)
```

这里骚得有点厉害，稍微解释一下。首先是把 `mapStateToProps()` 和 `mapDispatchToProps()` 两个函数直接放到参数位置，不在外部定义。然后 React-Redux 支持 `mapDispatchToProps()` 里直接写 Action，而不用多余写 `dispatch()`：

```javascript
export default connect(
  state => ({result: state}),
  {
    increase: increase,
    decrease: decrease,
  }
)(Calculator)
```

然后两个创建 Action 的函数的名字刚好和 `key` 一致，所以使用对象简写语法变成了极简版。到这里就把 Redux 维护的状态值和变更状态的动作都映射到「UI 组件」的 `props` 上了，接下来改造「UI 组件」。

`src/components/Calculator/index.jsx`

```javascript
import React, { Component } from 'react'
export default class Calculator extends Component {
  handleIncrease = () => {
    const value = this.node.value
    this.props.increase(value * 1) // 调用 props 上的方法
  }
  handleDecrease = () => {
    const value = this.node.value
    this.props.decrease(value * 1) // 调用 props 上的方法
  }

  render() {
    return (
      <div>
      	{/* 从 props 上取值 */}
        <h2>当前计算结果：{this.props.result}</h2>
        <input ref={c => this.node = c} type="text" placeholder="操作数"/>&nbsp;&nbsp;
        <button onClick={this.handleIncrease}>加</button>&nbsp;&nbsp;
        <button onClick={this.handleDecrease}>减</button>
      </div>
    )
  }
}
```

现在就不需要在「UI 组件」上引入 Store 和 Action 了，直接从 `props` 上调用方法和取值即可。

原来写一个组件只需要一个文件，引入 React-Redux 后现在需要写两个文件，一份「UI 组件」，一份「容器组件」，多少有些麻烦，而且组件多了以后容易把眼睛看瞎。所以可以把「UI 组件」和「容器组件」写到一份文件里。

`src/containers/Calculator/index.jsx`

```javascript
import React, { Component } from 'react'
import {connect} from 'react-redux'
import {increase, decrease} from '../../redux/actions/calculator'
// UI 组件不暴露
class Calculator extends Component {
  handleIncrease = () => {
    const value = this.node.value
    this.props.increase(value * 1)
  }
  handleDecrease = () => {
    const value = this.node.value
    this.props.decrease(value * 1)
  }
  render() {
    return (
      <div>
        <h2>当前计算结果：{this.props.result}</h2>
        <input ref={c => this.node = c} type="text" placeholder="操作数"/>&nbsp;&nbsp;
        <button onClick={this.handleIncrease}>加</button>&nbsp;&nbsp;
        <button onClick={this.handleDecrease}>减</button>
      </div>
    )
  }
}
// 只暴露容器组件
export default connect(
  state => ({result: state}),
  {
    increase,
    decrease,
  }
)(Calculator)
```

关键点就一个，不要暴露「UI 组件」，只暴露「容器组件」。凡是需要和 Redux 交互数据的组件都放 `src/containers` 目录下，其他不需要和 Redux 交互的都放 `src/components` 目录下。

# Redux 管理多个状态

上面的例子中 Redux 都只管理了一个数字类型的状态，实际开发中 Redux 肯定要管理各种类型五花八门的状态。比如现有另外一个书架组件 BookShelf，它需要委托 Redux 管理所有的书籍。按照套路，先在定义所有操作书籍的 ActionType。

`src/redux/constants.js`

```javascript
export const CalculatorActionType = {
  INCREASE: 'increase',
  DECREASE: 'decrease',
}
export const BookShelfActionType = {
  ADD: 'add' // 添加图书
}
```

然后创建 Action Creator 生成 Action：

```javascript
import {BookShelfActionType} from '../constants'
export const add = data => ({type: BookShelfActionType.ADD, data})
```

然后写 Reducer 的状态变更逻辑：

```javascript
import {BookShelfActionType} from '../constants'
const initState = [
  {id: '001', title: 'React 从入门到入土', auther: '子都'}
]
export default function bookshelfReducer(prevState = initState, action) {
  const {type, data} = action
  switch (type) {
    case BookShelfActionType.ADD:
      return [data, ...prevState] // 这里用了展开运算符
    default:
      return prevState
  }
}
```

上文已经说过，`store.js` 全局只会有一份，这时候出现了两个 Reducer 就需要做一些处理。

```javascript
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
```

使用 `combineReducers()` 函数将多份 Reducer 合并为一个，使用合并后的 Reducer 创建 Store。这里要注意 `combineReducers()` 函数中的对象参数，这里的概念绕不清那基本就废了。

首先要明确，**每个 Reducer 只能管理一个状态**，这里的「一个」可以是一个数字、数组、对象、字符串等等，反正只能是「一个」。那么 `combineReducers()` 中，`key` 就是你给状态取的名字，而 `value` 就是管理这个状态的 Reducer。这里的命名会影响你在「UI 组件」通过 `props` 获取状态值时的 `key`。

多个 Reducer 合并后，Calculator 「容器组件」的取值就不能直接取 state，而是取 state 上的 result：

```javascript
export default connect(
  state => ({result: state.result}), // 从 state 上取 result
  {
    increase,
    decrease,
  }
)(Calculator)
```

