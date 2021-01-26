import React, { PureComponent, Fragment } from 'react'

export default class Child extends PureComponent {

  state = {
    items: 'abc'
  }

  render() {
    return (
      <div>
        {
          this.state.items.map((item) => {
            return <Fragment key={item.id}>{item.name}</Fragment>
          })
        }
      </div>
    )
  }
}
