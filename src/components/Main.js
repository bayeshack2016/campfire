/* eslint-disable no-alert, no-console */

require('normalize.css/normalize.css');
require('styles/App.css');

import React from 'react'
import {SiteSuggest} from './site_suggest'
import 'whatwg-fetch'
const Plotly = require('react-plotlyjs');

const API_KEY = '6A7F1BDCC2E94496BAAAEBCDC8B17CE3'
const BASE_URL = 'https://ridb.recreation.gov/api/v1/'

class AppComponent extends React.Component {

  handleSuggestSelect(event, value) {
    console.log('yoooo, I am here', value);
    this.getData(value.ids)
  }

  getData(ids) {
    const BACKEND_URL = 'https://qkynjt4nkd.execute-api.us-east-1.amazonaws.com/prod'
    const data = {
      facilityIds: ids
    }
    fetch(BACKEND_URL, {method: 'post', body: JSON.stringify(data)})
      .then(res => res.json())
      .then(res => {
        this.setState({
          data: res.map(d => { return {x: d.dates, y: d.fills}})
        })
      })
  }

  constructor() {
    super()
    this.getData = this.getData.bind(this);
    this.handleSuggestSelect = this.handleSuggestSelect.bind(this);
    this.state = {
      data: []
    }
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
