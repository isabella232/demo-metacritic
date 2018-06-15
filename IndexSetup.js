const algoliasearch = require('algoliasearch')
const client = algoliasearch('6KK7AINE52', '73ce87f4479c95c4a7b78b21840cab92')

const commonSettings = {
  hitsPerPage: 10,
  maxValuesPerFacet: 10,
  attributesToHighlight: null,
  exactOnSingleWordQuery: 'word',
  removeWordsIfNoResults: 'allOptional',
  snippetEllipsisText: '…',
  alternativesAsExact: ['ignorePlurals', 'singleWordSynonym', 'multiWordsSynonym'],
}

const indexSettings = {
  'dev_MUSIC': {
    attributesToIndex: ['name,genres', 'unordered(artist)'],
    numericAttributesToIndex: null,
    replicas: ['dev_MUSIC_metascore_desc'],
    attributesForFaceting: ['genres', 'searchable(artist)', 'filterOnly(name)'],
    attributesToSnippet: ['name:6', 'genres:3', 'artist:5'],
    customRanking: ['desc(release_week)', 'desc(meta_score)', 'desc(user_score)'],
  },
  'dev_MOVIES': {
    attributesToIndex: ['unordered(name)', 'unordered(genres)'],
    numericAttributesToIndex: null,
    replicas: ['dev_MOVIES_metascore_desc'],
    attributesForFaceting: ['genres', 'maturity_rating', 'filterOnly(name)'],
    attributesToSnippet: ['name:6', 'genres:3'],
    customRanking: ['desc(release_week)', 'desc(meta_score)', 'desc(user_score)'],
  },
  'dev_TV': {
    attributesToIndex: ['unordered(name)', 'unordered(starring)', 'unordered(genres)'],
    numericAttributesToIndex: null,
    replicas: ['dev_TV_metascore_desc'],
    attributesForFaceting: ['genres', 'searchable(starring)', 'filterOnly(name)'],
    attributesToSnippet: ['name:6', 'starring:6', 'genres:2'],
    customRanking: ['desc(release_week)', 'desc(meta_score)', 'desc(user_score)'],
  },
  'dev_GAMES': {
    attributesToIndex: ['unordered(name)', 'unordered(genres)', 'unordered(platform)', 'unordered(publisher)'],
    numericAttributesToIndex: null,
    replicas: ['dev_GAMES_metascore_desc'],
    attributesForFaceting: ['genres', 'platform', 'publisher', 'maturity_rating', 'filterOnly(name)'],
    attributesToSnippet: ['name:6', 'genres:2', 'platform:10', 'publisher:10'],
    customRanking: ['desc(release_week)', 'desc(meta_score)', 'desc(user_score)'],
  },
}

const queryRules = [
  {
    "condition": {
      "pattern": "{facet:name}",
      "anchoring": "is"
    },
    "consequence": {
      "params": {
        "automaticOptionalFacetFilters": [
          "name"
        ]
      }
    },
    "description": "Boost name",
    "objectID": "boost-name"
  }
]

Object.keys(indexSettings).forEach(indexName => {
  const index = client.initIndex(indexName)
  const settings = Object.assign({}, commonSettings, indexSettings[indexName])
  index.setSettings(settings).then(
    (res, err) => {
      if (err) console.warn(err)
      console.log(res)
    }
  )
  queryRules.forEach(queryRule => {
    index.saveRule(queryRule).then(
      (res, err) => {
        if (err) console.warn(err)
        console.log(res)
      }
    )
  })
})
