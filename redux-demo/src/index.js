import React from 'react';
import ReactDOM from 'react-dom';
import store from './redux/store'


import App from './App';

ReactDOM.render(
  <App />,
  document.getElementById('root')
);


// 当 Redux 中的状态发生改变，重新渲染 APP 组件，引起全局渲染，保证数据变动实时生效
// store.subscribe(() => {
//   ReactDOM.render(
//     <App />,
//     document.getElementById('root')
//   );
// })