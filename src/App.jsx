import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import './App.css';

import BottomNavigation from './components/BottomNavigation';
import HoldEmCalculator from './components/HoldemCalculator';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <BottomNavigation />

          <Route exact path="/" component={HoldEmCalculator} />
          <Route path="/holdem" component={HoldEmCalculator} />
          <Route path="/omaha" component={HoldEmCalculator} />
          <Route path="/stud" component={HoldEmCalculator} />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
