import React from 'react';
import ReactDOM from 'react-dom';
import store from './redux/store'
import {Provider} from 'react-redux'

import App from './App';

ReactDOM.render(
  // Provider 自动分析需要 store 的容器组件，将 store 传入，避免去每个容器组件手动传 store
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);