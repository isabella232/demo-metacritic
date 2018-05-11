import React, { Component } from 'react'
import logo from './logo.svg'
import './App.css'

import { InstantSearch, SearchBox, Hits, Highlight } from 'react-instantsearch/dom'

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>

        <InstantSearch
          appId="6KK7AINE52"
          apiKey="a594543c55acea27cff456287c4b6521"
          indexName="dev_MUSIC"
        >
          <SearchBox />
          <Hits hitComponent={Item} />
        </InstantSearch>
      </div>
    )
  }
}

const Item = ({ hit }) =>
  <div className="item">
    <div><Highlight attribute="name" hit={hit} /></div>
    <div><Highlight attribute="artist" hit={hit} /></div>
    <div>{hit.meta_score}</div>
  </div>

export default App
