import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';

export default class Nav extends Component {
  render() {
    return (
      <div className="NavDiv">
        <ul className="NavUl">
            <li>
                <Link to="/">Home</Link>
            </li>
            <li>
                <Link to="/login">Login</Link>
            </li>
            <li>
                <Link to="/register">Register</Link>
            </li>
            <li>
                <Link to="/gallery">Gallery</Link>
            </li>
            <li>
                <Link to="/logout">Logout</Link>
            </li>
        </ul>
      </div>
    )
  }
}
