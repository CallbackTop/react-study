import React, { Component } from 'react'
import axios from 'axios'
import PubSub from 'pubsub-js'

export default class Search extends Component {

  search = () => {
    const {keywordNode: {value: keyword}} = this
    PubSub.publish('searchAction', {isFirst: false, isLoading: true})
    // this.props.updateAppState({isFirst: false, isLoading: true})
    axios.get(`/api/search/users2?q=${keyword}`).then(
      response => {
        PubSub.publish('searchAction', {isLoading: false, items: response.data.items})
        // this.props.updateAppState({isLoading: false, items: response.data.items})
      },
      error => {
        PubSub.publish('searchAction', {isLoading: false, err: error.message})
        // this.props.updateAppState({isLoading: false, err: error.message})
      }
    )
  }

  // 使用 Fetch API 获取数据
  searchByFetch = async () => {
    const {keywordNode: {value: keyword}} = this
    PubSub.publish('searchAction', {isFirst: false, isLoading: true})
    try {
      const response = await fetch(`/api/search/users2?q=${keyword}`)
      const data = await response.json()
      PubSub.publish('searchAction', {isLoading: false, items: data.items})
    } catch (error) {
      PubSub.publish('searchAction', {isLoading: false, err: error.message})
    }
  }

  render() {
    return (
      <section className="jumbotron">
        <h3 className="jumbotron-heading">Search Github Users</h3>
        <div>
          <input ref={c => this.keywordNode = c} type="text" placeholder="enter the name you search"/>&nbsp;
          <button onClick={this.searchByFetch}>Search</button>
        </div>
      </section>
    )
  }
}
