require('normalize.css/normalize.css');
require('styles/App.css');

import React from 'react'
import {SiteSuggest} from './site_suggest'


class AppComponent extends React.Component {

  handleSuggestSelect(event, value) {
    console.log('yoooo, I am here', value);
  }

  render() {
    return (
      <div>
        <h1>Burn Campfire Burn</h1>
        <SiteSuggest onSuggestSelect={this.handleSuggestSelect}
            placeholder="Your latest job" hitsPerPage={8}/>

      </div>
    );
  }
}

AppComponent.defaultProps = {
};

export default AppComponent;
