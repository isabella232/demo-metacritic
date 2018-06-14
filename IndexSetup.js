const algoliasearch = require('algoliasearch')
const client = algoliasearch('6KK7AINE52', '73ce87f4479c95c4a7b78b21840cab92')

const indexSettings = {
  'dev_MUSIC': {
    hitsPerPage: 10,
    maxValuesPerFacet: 10,
    attributesToIndex: ['name,genres', 'unordered(artist)'],
    numericAttributesToIndex: null,
    attributesToRetrieve: null,
    replicas: ['dev_MUSIC_metascore_desc'],
    attributesForFaceting: ['genres', 'searchable(artist)', 'filterOnly(name)'],
    attributesToSnippet: ['name:6', 'genres:3', 'artist:5'],
    attributesToHighlight: null,
    exactOnSingleWordQuery: 'word',
    customRanking: ['desc(release_week)', 'desc(meta_score)', 'desc(user_score)'],
    removeWordsIfNoResults: 'allOptional',
    snippetEllipsisText: '…',
    alternativesAsExact: ['ignorePlurals', 'singleWordSynonym', 'multiWordsSynonym'],
  },
  'dev_MOVIES': {
    hitsPerPage: 10,
    maxValuesPerFacet: 10,
    attributesToIndex: ['unordered(name)', 'unordered(genres)'],
    numericAttributesToIndex: null,
    attributesToRetrieve: null,
    replicas: [],
    attributesForFaceting: ['genres', 'maturity_rating', 'filterOnly(name)'],
    attributesToSnippet: ['name:6', 'genres:3'],
    attributesToHighlight: null,
    exactOnSingleWordQuery: 'word',
    customRanking: ['desc(release_week)', 'desc(meta_score)', 'desc(user_score)'],
    removeWordsIfNoResults: 'allOptional',
    snippetEllipsisText: '…',
    alternativesAsExact: ['ignorePlurals', 'singleWordSynonym', 'multiWordsSynonym'],
  },
  'dev_TV': {
    hitsPerPage: 10,
    maxValuesPerFacet: 10,
    attributesToIndex: ['unordered(name)', 'unordered(starring)', 'unordered(genres)'],
    numericAttributesToIndex: null,
    attributesToRetrieve: null,
    replicas: [],
    attributesForFaceting: ['genres', 'searchable(starring)', 'filterOnly(name)'],
    attributesToSnippet: ['name:6', 'starring:6', 'genres:2'],
    attributesToHighlight: null,
    exactOnSingleWordQuery: 'word',
    customRanking: ['desc(release_week)', 'desc(meta_score)', 'desc(user_score)'],
    removeWordsIfNoResults: 'allOptional',
    snippetEllipsisText: '…',
    alternativesAsExact: ['ignorePlurals', 'singleWordSynonym', 'multiWordsSynonym'],
  },
  'dev_GAMES': {
    hitsPerPage: 10,
    maxValuesPerFacet: 10,
    attributesToIndex: ['unordered(name)', 'unordered(genres)', 'unordered(platform)', 'unordered(publisher)'],
    numericAttributesToIndex: null,
    attributesToRetrieve: null,
    replicas: [],
    attributesForFaceting: ['genres', 'platform', 'publisher', 'maturity_rating', 'filterOnly(name)'],
    attributesToSnippet: ['name:6', 'genres:2', 'platform:10', 'publisher:10'],
    attributesToHighlight: null,
    exactOnSingleWordQuery: 'word',
    customRanking: ['desc(release_week)', 'desc(meta_score)', 'desc(user_score)'],
    removeWordsIfNoResults: 'allOptional',
    snippetEllipsisText: '…',
    alternativesAsExact: ['ignorePlurals', 'singleWordSynonym', 'multiWordsSynonym'],
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
  index.setSettings(indexSettings[indexName]).then(
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
