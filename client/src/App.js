import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Link} from 'react-router-dom';
import Gallery from './components/Gallery';
import Home from './components/Home';
import Nav from './components/Nav';

class App extends Component {
  render() {
    return (
      <Router>
      <div className="App">
        <Route path='/' exact component={Home} />
        <Route path='/' component={Nav} />
        <Route path='/gallery' component={Gallery} />
      </div>
      </Router>
    );
  }
}

export default App;
