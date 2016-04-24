require('normalize.css/normalize.css');
require('styles/App.css');

import React from 'react'
import {SiteSuggest} from './site_suggest'
const Plotly = require('react-plotlyjs');

class AppComponent extends React.Component {

  handleSuggestSelect(event, value) {
    console.log('yoooo, I am here', value);
  }

  render() {
    var data = [
      {
        x: ['2013-10-04 22:23:00', '2013-11-04 22:23:00', '2013-12-04 22:23:00'],
        y: [1, 3, 6],
        type: 'scatter'
      }
    ];

    return (
      <div>
        <h1>Burn Campfire Burn</h1>
        <SiteSuggest onSuggestSelect={this.handleSuggestSelect}
            placeholder="Your latest job" hitsPerPage={8}/>
        <Plotly className="whatever" data={data}/>

      </div>
    );
  }
}

AppComponent.defaultProps = {
};

export default AppComponent;
