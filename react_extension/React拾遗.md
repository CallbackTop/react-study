# setState 的用法

`setState()` 函数用于更新组件的状态，有对象式和函数式两种写法。

```javascript
// 对象式
this.setState({
  count: this.state.count + 1
})
// 函数式
this.setState((state, props) => {
  count: state.count + 1
})
```

函数式写法可以直接从参数接收到当前组件的 `state` 和 `props`，更方便对状态进行处理。无论哪种写法，`setState()` 的第二个参数都可以接收一个回调函数。

```javascript
this.setState({
  count: this.state.count + 1
}, () => { // 回调函数
  console.log(this.state.count)
})
```

`setState()` 对状态的更新是**异步**的，回调函数会在状态变更完成后触发。也就是说如果直接在 `setState()` 调用之后去输出一个状态值，那么很有可能拿到的还是变更之前的值。

# Hooks

Hooks 是 `16.8` 版本开始推出的针对**函数式组件**的功能。函数式组件没有 `this`，所以无法操作 `state` 、`refs` 和生命周期钩子，而 Hooks 解决了这些问题。实际使用来看，并没有类组件写着舒服，所以还是老实用类组件吧！

## State Hook

```javascript
export default function Demo() {
  const [name, setName] = React.useState('zidu')
  
  changeName() {
    // 操作 state
    setName('CallbackZidu')
  }
  
  return (
  	<div>
    	<h2>用户名：{name}</h2>
			<button onClick={changeName}>改名</button>
    </div>
  )
}
```

使用 `React.useState()` 可以创建出一个 `state`，示例中使用的是数组解构赋值语法，`name` 就是这个状态的名字，`setName` 就是操作这个状态的函数。如果你有多个状态需要维护，就需要多次使用 `React.useState()` 来创建这些状态，当然你也可以直接创建一个对象类型的状态来统一管理，但是这里有个大坑。

通过 `React.useState()` 拿到的 `setXxx` 函数对于状态改变的处理逻辑是不同于 `setState()` 函数的。在 `setState()` 函数中允许只改变多个状态中某些状态的值。也就是说 `setState()` 函数拿到返回的对象后会和之前的 `state` 进行合并。但是 `setXxx` 不会合并，而是做替换操作。

```javascript
const [all, setAll] = React.useState({
  name: 'zidu',
  age: 27
})

setAll({
  // 尽管不变更 name 的值，但是这里还是要用原来的值进行赋值，否则函数执行完后 name 就不存在了。
  name: all.name,
  age: 28
})
```

## Effect Hook

Effect Hook 就是使用函数来模拟组件的生命周期，但是也只能模拟出三个生命周期，而且为了区别出不同的生命周期，写法有点绕。

```javascript
React.useEffect(() => {
  console.log('只传一个函数，模拟 componentDidUpdate 生命周期钩子')
})
```

如果 `React.useEffect()` 只接收到了一个箭头函数作为参数，那么箭头函数就是 `componentDidUpdate` 生命周期钩子。

```javascript
React.useEffect(() => {
  console.log('第二个参数是空数组，模拟 componentDidUpdate 生命周期钩子')
}, [])
```

如果接收到的第二个参数是空数组，那么箭头函数就是 `componentDidMount` 生命周期钩子。

```javascript
React.useEffect(() => {
  console.log('数组有元素，模拟 componentDidUpdate 和 componentDidUpdate 两个生命周期钩子')
}, [name])
```

如果如果接收到的第二个参数不是空数组，那么箭头函数就是 `componentDidMount` 生命周期钩子，并且在每次 `name` 状态的值发生变化时作为 `componentDidUpdate` 生命周期钩子被触发。

```javascript
React.useEffect(() => {
  // do something...
  return () => {
    console.log('返回一个箭头函数，模拟 componentWillUnmount 生命周期钩子')
  }
}, [name])
```

如果在第一个参数里返回箭头函数，那么返回的箭头函数就是 `componentWillUnmount` 生命周期钩子。

## Refs Hook

Refs Hook 的使用和 `React.createRef()` 的用法是一样的。

```javascript
export default function demo() {
  // 创建一个 Ref 钩子
  const myRef = React.useRef()
  
  function getText() {
    alert(myRef.current.value)
  }
  
  return (
  	<div>
    	<input type="text" ref={myRef} /><br/>
    </div>
  )
}
```

# 组件懒加载

组件懒加载可以避免在第一次打开网页时就把暂时还没有用到的组件都加载完毕，这样可以提高页面加载速度，组件会在真正需要渲染时才会被加载。

创建 A 组件：

```javascript
export default class A extends Component {
  render() {
    return (
      <div>
      	<h2>我是 A</h2>
      </div>
    )
  }
}
```

创建 B 组件：

```javascript
export default class B extends Component {
  render() {
    return (
      <div>
      	<h2>我是 B</h2>
      </div>
    )
  }
}
```

创建一个 Loading 组件，作用下面说：

```javascript
export default class Loading extends Component {
  render() {
    return (
      <div>
        <h2 style={{backgroundColor: 'orange'}}>Loding...</h2>
      </div>
    )
  }
}
```

```javascript
import React, { Component, lazy, Suspense } from 'react'
import {NavLink, Route} from 'react-router-dom'
// 同步加载 Loading 组件
import Loading from './Loading'
// 懒加载 A 和 B
const A = lazy(() => import('./A'))
const B = lazy(() => import('./B'))
export default class Main extends Component {
	render() {
    return (
      <div>
        <ul>
          <NavLink to="/a">Home</NavLink>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <NavLink to="/b">About</NavLink>
        </ul>
        <hr/>
        <Suspense fallback={<Loading/>}>
          <Route path="/a" component={A} />
          <Route path="/b" component={B} />
        </Suspense>
      </div>
    )
  }
}
```

 `lazy()` 函数用于实现组件的懒加载，接收一个函数提供要加载的组件，`import()` 导入函数和关键字 `import` 的作用是一样的。需要注意的是使用了懒加载后就必须要使用 `<Suspense>` 组件对懒加载组件进行包裹，并且通过 `fallback` 属性指定**如果懒加载组件加载过程中和加载失败时的兜底显示组件**，也就是示例中的 `Loading` 组件，并且这个组件只能同步加载。

# Fragment

`<Fragment>` 实际是一个占位组件，在编码时看上去是一个组件，但在渲染时会被忽略。比如我们通常在 `render()` 的返回内容最外层套一个 `<div>` 标签，如果你不想渲染出来的结构有太多不必要的 `<div>`，那么就可以用 `<Fragment>` 来替换。还有在遍历渲染列表时，也可以用来替代不必要的结构。

```javascript
import React, { Component, Fragment } from 'react'

export default class FragmentDemo extends Component {
  render() {
    return (
      <Fragment>
        <h2>Fragment 标签在编译时会被丢弃掉，可以避免多组件时嵌套出太多层 div</h2>
        <h2>Fragment 可以接收一个 key 属性，这在遍历的时候可以用，避免产生太多外层元素</h2>
      </Fragment>
    )
  }
}
```

# PureComponent

之前在创建类式组件时都是继承 `React.Component`，当多个组件嵌套并且子组件使用了父组件通过 `props` 传递过来的值时，如果父组件改变了 `state`，无论子组件使用的那个状态是否出现变动，子组件都会随着父组件的渲染被重新渲染。

```javascript
import React, { Component } from 'react'
export default class A extends Component {
  state = {
    name: 'zidu',
    age: 27
  }
  changeName = () => {
    this.setState({
      name: 'CallbackZidu'
    })
  }
  render() {
    console.log('组件 A 发生渲染')
    const {name, age} = this.state
    return (
      <div>
        <h2>组件 A</h2>
        <h2>名字：{name}</h2>
        <br/>
        <button onClick={this.changeName}>改名</button>
        <hr/>
        <B age={age}/>
      </div>
    )
  }
}

class B extends Component {
  render() {
    console.log('组件 B 发生渲染')
    return (
      <div>
        <h2>组件 B</h2>
        <h2>年龄：{this.props.age}</h2>
      </div>
    )
  }
}
```

很明显这种子组件的被动渲染是没有必要的，这时候就可以让子组件继承 `React.PureComponent` 来避免这种情况发生。`React.PurComponent` 实际重写了 `shouldComponentUpdate` 生命周期钩子，在内部判断了 `state` 和 `props` 是否发生变动，以此决定是否允许组件执行状态更新。**为了方便起见，所有组件都可以去继承 React.PurComponent，而不用再继承 React.Component**。

# RenderProps

名称有点高端，看着有点懵逼，实际上就是和 Vue 的 Slot 一样的插槽技术，只是语法不同而已。直接看示例：

```javascript
import React, { PureComponent } from 'react'
import OtherComponent from '../OtherComponent'
export default class RenderPropsDemo extends PureComponent {
  render() {
    return (
      <div>
        <h2>这是 RenderPropsDemo 组件</h2>
        {/* 通过传入一个函数返回要插入的组件 */}
        <A render={() => <OtherComponent/>}/>
      </div>
    )
  }
}

/**
 * 使用 this.props.render() 在 JSX 中预留要插入其他 DOM 的位置
 * 类似 Vue 的 Slot 技术
 * 函数名 render 是自定义的，改什么名字都可以
 */
class A extends PureComponent {
  render() {
    return (
      <div>
        <h2>这是 A 组件</h2>
        {this.props.render()}
      </div>
    )
  }
}
```

在需要插入其他组件的地方直接写 `this.props.render()` 即可，之后插入的组件就会出现在这个位置。当然这个 `props` 上的 `render` 名字可以随便改，通常都叫这个。插入组件的时候直接在 `props` 上传入一个箭头函数，返回要插入组件的标签即可。

# Context

父子组件之间通信可以走 `props`，兄弟组件之间通信可以走发布订阅，那么祖孙组件之间通信就可以用 Context，当然用发布订阅也可以，而且更舒服。

![](https://assets.callback.top/2021-01-22-react_context.png)

比如现在 A 组件要把一些数据传递给 C 组件使用，那就可以使用 `React.createContext()` 创建一个 Context。

```javascript
import React, { Component } from 'react'
import './index.css'
// 创建一个 Context
const NameContext = React.createContext()
export default class ContextDemo extends Component {
  state = {
    name: 'zidu',
    age: 27
  }
  render() {
    const {name, age} = this.state
    return (
      <div className="parent">
        <h2>A 组件</h2>
        <h2>名称：{name}</h2>
				{/* 使用 Provider 包括下一级组件 */}
        <NameContext.Provider value={name}>
          <B />
        </NameContext.Provider>
      </div>
    )
  }
}

class B extends Component {
  render() {
    return (
      <div className="child">
        <h2>B 组件</h2>
        <h2>显示点东西打酱油</h2>
        <C/> 
      </div>
    )
  }
}

function C() {
  return (
    <div className="grand">
      <h2>C 组件</h2>
      <h2>使用 Consumer 标签接收名称：
    		{/* Consumer 内的箭头函数参数就是从 A 组件传递过来的数据 */}
        <NameContext.Consumer>
          {
            value => {
              return value.name
            }
          }
        </NameContext.Consumer>
      </h2>
      <D/>
    </div>
  )
}
```

C 组件接收的时候也可以不写 `<Consumer>` 标签，改用编程方式要简单一些：

```javascript
class C extends Component {
	// 声明要使用的 Context
  static contextType = NameContext
  render() {
    return (
      <div className="grand-grand">
        <h2>C 组件</h2>
        <h2>使用 contextType 接收名称：{this.context.name}</h2>
      </div>
    )
  }
}
```

Context 一般在封装组件时使用，写业务时较少用，了解一下就行。祖孙组件之间的通信要么走 Redux，要么走发布订阅，用起来都比 Context 舒服。

# 错误边界

子组件可能由于请求数据失败或者拿到的数据和约定的格式不符等情况导致渲染失败，这时候异常就会层层往外传递导致整个页面渲染失败出现错误信息。错误边界就是将子组件的渲染错误限制在一定范围内，并使用特定内容去替换错误信息。

比如在 A 组件里使用了 B 组件，为了避免 B 出现渲染失败出现上述情况就可以做如下措施：

```javascript
state = {
  childLoadSuccess: true
}
// 特定函数，记住就行
static getDerivedStateFromError(error) {
  return {
    childLoadSuccess: false
  }
}
render() {
  return (
    <div>
    {
    	this.state.childLoadSuccess ? <B/> : <h4>B组件发生了异常  </h4>
    }
  	</div>
  )
}
```

定义一个状态 `childLoadSuccess` 用来标志 B 组件是否渲染出错，当 B 组件渲染出错时触发 `getDerivedStateFromError` 函数，在函数内部返回一个对象将 `childLoadSuccess` 改掉。这样当 A 组件在渲染时就可以通过 `childLoadSuccess` 的状态决定渲染 B 组件还是备用组件或信息。另外还有一个生命周期钩子 `componentDidCatch` 也可以使用，当出现异常时会被触发，可以在这里向服务器提交错误报告。