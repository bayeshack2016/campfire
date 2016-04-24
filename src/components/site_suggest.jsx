import React from 'react'
import ReactDOM from 'react-dom';
import algoliasearch from 'algoliasearch/reactnative'
import autocomplete from 'autocomplete.js/dist/autocomplete.min'


// An autocomplete input using Algolia as a backend.
// TODO: Contribute to autocomplete.js.
class AlgoliaSuggest extends React.Component {

  componentDidMount() {
    const {
      algoliaApp,
      algoliaApiKey,
      algoliaIndex,
      displayKey,
      hitsPerPage,
      onSuggestSelect,
      suggestionTemplate
    } = this.props
    const algoliaClient = algoliasearch(algoliaApp, algoliaApiKey);
    autocomplete(ReactDOM.findDOMNode(this), {hint: false}, [
      {
        source: autocomplete.sources.hits(
            algoliaClient.initIndex(algoliaIndex), {hitsPerPage: hitsPerPage}),
        displayKey: displayKey,
        templates: {
          suggestion: suggestionTemplate
        }
      }
    ]).on('autocomplete:selected', onSuggestSelect);
  }

  render() {
    return <input {...this.props}/>
  }
}

// A Job autocomplete input.
class SiteSuggest extends React.Component {
  renderSuggestion (suggestion) {
    return suggestion._highlightResult.name.value
  }

  render() {
    return <AlgoliaSuggest {...this.props} algoliaIndex="campfire" algoliaApp="ONKZUHX1KO"
                       algoliaApiKey="eb9efc65898095897ac405d287bc5023"
                       displayKey="name"
                       suggestionTemplate={this.renderSuggestion}/>
  }
}

export {SiteSuggest}
