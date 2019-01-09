import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Link} from 'react-router-dom';
import Gallery from './components/Gallery';
import Home from './components/Home';
import Nav from './components/Nav';
import Login from './components/Login';
import Register from './components/Register';
import Edit from './components/Edit';
import Photo from './components/Photo';

class App extends Component {
  render() {
    return (
      <Router>
      <div className="App">
        <Route path='/' component={Nav} />
        <Route path='/' exact component={Home} />
        <Route path='/gallery' component={Gallery} />
        <Route path='/login' component={Login} />
        <Route path='/register' component={Register} />
        <Route path='/edit' component={Edit} />
        <Route path='/photo/:photoID' component={Photo} />
      </div>
      </Router>
    );
  }
}

export default App;
