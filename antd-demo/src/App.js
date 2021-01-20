import React, { Component } from 'react'

import { Button } from 'antd';

export default class App extends Component {
  render() {
    return (
      <div>
        <Button style={{marginTop: '100px', marginLeft: '100px'}} type="primary">Button</Button>
      </div>
    )
  }
}
