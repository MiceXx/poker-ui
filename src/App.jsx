import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';

import './App.css';

import Navigation from './components/Navigation';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Navigation />
      </BrowserRouter>
    );
  }
}

export default App;
