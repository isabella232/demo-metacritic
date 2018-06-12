import React, { Component } from 'react'
import logo from './images/metacritic.png'
import './App.css'

import { InstantSearch, Index, SearchBox, Hits, Highlight } from 'react-instantsearch/dom'

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Metacritic search by Algolia</h1>
        </header>

        <InstantSearch
          appId="6KK7AINE52"
          apiKey="a594543c55acea27cff456287c4b6521"
          indexName="dev_MUSIC"
        >
          <SearchBox />
          <div className="results">
            <Index indexName="dev_MUSIC">
              <Hits hitComponent={ItemMusic} />
            </Index>
            <Index indexName="dev_TV">
              <Hits hitComponent={ItemTv} />
            </Index>
            <Index indexName="dev_MOVIES">
              <Hits hitComponent={ItemMovie} />
            </Index>
            <Index indexName="dev_GAMES">
              <Hits hitComponent={ItemGame} />
            </Index>
          </div>
        </InstantSearch>
      </div>
    )
  }
}

const ItemMusic = ({ hit }) =>
  <div className="item">
    <div><Highlight attribute="name" hit={hit} /></div>
    <div><Highlight attribute="artist" hit={hit} /></div>
    <div>{hit.meta_score}</div>
  </div>

const ItemTv = ({ hit }) =>
  <div className="item">
    <div><Highlight attribute="name" hit={hit} /></div>
    <div><Highlight attribute="starring" hit={hit} /></div>
    <div>{hit.meta_score}</div>
  </div>

const ItemMovie = ({ hit }) =>
  <div className="item">
    <div><Highlight attribute="name" hit={hit} /></div>
    <div><Highlight attribute="genre" hit={hit} /></div>
    <div>{hit.meta_score}</div>
  </div>

const ItemGame = ({ hit }) =>
  <div className="item">
    <div><Highlight attribute="name" hit={hit} /></div>
    <div><Highlight attribute="platform" hit={hit} /></div>
    <div>{hit.meta_score}</div>
  </div>

export default App
