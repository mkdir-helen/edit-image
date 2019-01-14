import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import Gallery from './components/Gallery';
import Home from './components/Home';
import Nav from './components/Nav';
import Login from './components/Login';
import Register from './components/Register';
import Edit from './components/Edit';
import Photo from './components/Photo';
import EditPremium from './components/EditPremium';
require('dotenv').config();

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      active: false,
      dots: false,
      username: ''
    }
  }
  componentDidMount = () => {
    this.handleActiveUser();
    setInterval(this.handleActiveUser, 1000);
  }
  handleGetUsername = () => {
    fetch(`/username`)
      .then(res => res.json())
      .then(res => {
        console.log(res);
        this.setState({
          username: res.username
        })
      })
  }
  handleActiveUser = () => {
    fetch(`/active`)
      .then(r => r.json())
      .then(result => {
        console.log(result);
        this.setState({
          active: result
        }, this.handleGetUsername)
      })
  }
  handleLogOut = () => {
    fetch(`/logout`,
      { method: 'POST' }
    )
      .then(r => r.json())
      .then(result => {
        console.log(result);
        this.setState({
          active: false,
          dots: false
        }, () => {
          this.props.history.push('/');
        })
      })
  }
  showMenu = (e) => {
    e.preventDefault();
    if (!this.state.dots) {
      this.setState({
        dots: true
      })
    } else {
      this.setState({
        dots: false
      })
    }
  }
  render() {
    return (
      <div className="App">
        <Route path='/' render={(props) => {
          return (<Nav active={this.state.active}
            username={this.state.username}
            dots={this.state.dots}
            handleGetUsername={this.handleGetUsername}
            handleActiveUser={this.handleActiveUser}
            handleLogOut={this.handleLogOut}
            showMenu={this.showMenu}
            {...props} />)
        }} />
        <Route path='/' exact component={Home} />
        <Route path='/gallery' render={(props) => {
          return (<Gallery active={this.state.active}
            username={this.state.username}
            handleGetUsername={this.handleGetUsername}
            handleActiveUser={this.handleActiveUser}
            {...props} />)
        }} />
        <Route path='/login' component={Login} />
        <Route path='/register' component={Register} />
        <Route path='/edit' component={Edit} />
        <Route path='/photo/:photoID' component={Photo} />
        <Route path='/editspecial/:photoID' component={EditPremium} />
      </div>
    );
  }
}

export default App;
