// 引入 UI 组件
import CountUI from '../../components/Count'
// 连接 UI 组件
import {connect} from 'react-redux'

import {
  createIncreaseAction,
  createDecreaseAction,
  createIncreaseAsyncAction
} from '../../redux/actions/count'

// 函数的返回值必须是对象，key-value 对应 UI 组件 props 的 key-value
function mapStateToProps(state) {
  return {count: state}
}

// 函数的返回值包含要传给 UI 组件的行为，用于操作状态
function mapDispatchToProps(dispatch) {
  return {
    increase: number => dispatch(createIncreaseAction(number)),
    decrease: number => dispatch(createDecreaseAction(number)),
    increaseAsync: (number, time) => dispatch(createIncreaseAsyncAction(number, time))
  }
}

// connect 函数用于连接 Redux 和 UI 组件，返回一个容器组件

// 标准写法
// export default connect(mapStateToProps, mapDispatchToProps)(CountUI)

// 简写
// export default connect(
//   state => ({count: state}), 
//   {
//     increase: number => dispatch(createIncreaseAction(number)),
//     decrease: number => dispatch(createDecreaseAction(number)),
//     increaseAsync: (number, time) => dispatch(createIncreaseAsyncAction(number, time))
//   }
// )(CountUI)

// 极限简写
// 只需要传递 Action，React-Redux 会自动分发(dispatch)
export default connect(
  state => ({count: state}), 
  {
    increase: createIncreaseAction,
    decrease: createDecreaseAction,
    increaseAsync: createIncreaseAsyncAction
  }
)(CountUI)


