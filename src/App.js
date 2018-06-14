import React, { Component } from 'react'
import logo from './images/metacritic.png'
import placeholder from './images/placeholder.jpg'
import './App.css'

import {
  Configure,
  Hits,
  Index,
  InstantSearch,
  SearchBox,
  Snippet,
} from 'react-instantsearch/dom'

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
          <Configure hitsPerPage={10} />
          <SearchBox />
          <div className="Results-container">
            <Index indexName="dev_MUSIC">
              <h2 className="Section-title">Music</h2>
              <Hits hitComponent={ItemMusic} />
            </Index>
            <Index indexName="dev_TV">
              <h2 className="Section-title">TV</h2>
              <Hits hitComponent={ItemTv} />
            </Index>
            <Index indexName="dev_MOVIES">
              <h2 className="Section-title">Movies</h2>
              <Hits hitComponent={ItemMovie} />
            </Index>
            <Index indexName="dev_GAMES">
              <h2 className="Section-title">Games</h2>
              <Hits hitComponent={ItemGame} />
            </Index>
          </div>
        </InstantSearch>
      </div>
    )
  }
}

const ItemMusic = ({ hit }) =>
  <ItemSkeleton hit={hit} attributesToDisplay={['name', 'artist', 'genres']} />

const ItemTv = ({ hit }) =>
  <ItemSkeleton hit={hit} attributesToDisplay={['name', 'starring', 'genres']} />

const ItemMovie = ({ hit }) =>
  <ItemSkeleton hit={hit} attributesToDisplay={['name', 'genre']} />

const ItemGame = ({ hit }) =>
  <ItemSkeleton hit={hit} attributesToDisplay={['name', 'platform', 'publisher', 'genres']} />

const ItemSkeleton = ({ hit, attributesToDisplay }) =>
  <div className="Result-item Result-item-game">
    <div className="Result-item-image"><CustomImg url={hit.image} name={hit.name} /></div>
    <div className="Result-item-content">
      {attributesToDisplay.map(attr => <div><Snippet attribute={attr} hit={hit} /></div>)}
      <div className="Result-item-content-scores">
        <Metascore value={hit.meta_score} />
        <Metascore value={hit.user_score} user={true} />
      </div>
    </div>
  </div>

const CustomImg = ({ url, name }) => {
  return url
  ? <img src={'https://res.cloudinary.com/hilnmyskv/image/fetch/' + url} alt={name}/>
  : <img src={placeholder} alt={name}/>
}

const Metascore = ({ value, user }) => {
  let rank = 'low'
  if (!value) {
    rank = 'tbd'
  }
  else if (value > 60 || (user && value > 6)) {
    rank = 'high'
  }
  else if (value > 39 || (user && value > 3.9)) {
    rank = 'medium'
  }
  return <span className={'metascore ' + rank}>{rank === 'tbd' ? rank : value}</span>
}

export default App
