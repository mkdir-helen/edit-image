import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';

export default class Nav extends Component {
  render() {
    return (
      <div>
        <ul>
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
                <Link to="/edit">Edit</Link>
            </li>
            <li>
                <Link to="/crop">Crop</Link>
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
