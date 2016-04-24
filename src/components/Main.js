/* eslint-disable no-alert, no-console */

require('normalize.css/normalize.css');
require('styles/App.css');

import React from 'react'
import {SiteSuggest} from './site_suggest'
import 'whatwg-fetch'
const Plotly = require('react-plotlyjs');

class AppComponent extends React.Component {

  handleSuggestSelect(event, value) {
    console.log('yoooo, I am here', value);
  }

  getData(ids) {
    const ids_str = ids.join(',')
    const url = 'http://localhost:13373/?facility_id=' + ids_str
    fetch(url)
      .then(res => res.json())
      .then(res => {
        this.setState({
          data: res
        })
      })
  }

  constructor() {
    super()
    this.getData = this.getData.bind(this);
    this.state = {
      data: []
    }
    this.getData([2332])
  }

  render() {

    return (
      <div>
        <h1>Burn Campfire Burn</h1>
        <SiteSuggest onSuggestSelect={this.handleSuggestSelect}
            placeholder="Your latest job" hitsPerPage={8}/>
        <Plotly className="whatever" data={this.state.data}/>

      </div>
    );
  }
}

AppComponent.defaultProps = {
};

export default AppComponent;
