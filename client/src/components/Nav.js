import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';

export default class Nav extends Component {
    constructor(props) {
        super(props);
        this.state = {
            active: false
        }
    }

    componentDidMount = () => {
        this.handleActiveUser();
        setInterval(this.handleActiveUser, 1000);
    }
    handleActiveUser = () => {
        fetch(`/active`)
        .then(r => r.json())
        .then(result => {
          console.log(result);
          this.setState({
            active: result
          })
        })
    }
    handleLogOut = () => {
        fetch(`/logout`,
        {method: 'POST'}
        )
            .then(r => r.json())
            .then(result => {
                console.log(result);
                this.setState({
                    active: false
                })
                this.props.history.push('/');
            })
    }

  render() {
      const isLoggedIn = this.state.active;
    return (
      <div className="NavDiv">
        <ul className="NavUl">
            <li>
                <Link to="/" onClick={this.handleActiveUser}>Home</Link>
            </li>
            {isLoggedIn ? (
                <>
                    <li>
                        <Link to="/gallery" onClick={this.handleActiveUser}>Gallery</Link>
                    </li>
                    <li>
                        <Link to="/" 
                        onClick={this.handleLogOut}
                        >Logout</Link>
                    </li>
                </>
            ):(
                <>
                    <li>
                        <Link to="/login" 
                        onClick={this.handleActiveUser}
                        >Login</Link>
                    </li>
                    <li>
                        <Link to="/register" onClick={this.handleActiveUser}>Register</Link>
                    </li>
                </>
            )}
        </ul>
      </div>
    )
  }
}
