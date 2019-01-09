import React, { Component } from 'react';

export default class Login extends Component {
    constructor(props){
        super(props);
        this.state = {
            username: '',
            password: ''
        };
    }
    handleSubmit = (e) => {
        e.preventDefault();
        fetch(`/login`, {
            method: 'POST',
            body: JSON.stringify({
                username: this.state.username,
                password: this.state.password
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(r => r.json())
        .then(result => {
            console.log(result);
        })
        .catch(err => {
            console.log(err);
        });
    }
    handleUsername = (e) => {
        this.setState({username: e.target.value});
    }
    handlePassword = (e) => {
        this.setState({password: e.target.value});
    }
    render(){
        return (
          <form action="/login" 
          method="POST" 
          className="login-container"
          onSubmit={this.handleSubmit}
          >
              <h3>Log in:</h3>
              <label>Username: </label>
              <input type='text' 
              name='username'
              onChange={this.handleUsername}
              value={this.state.username}
               />
              <label>Password: </label>
              <input type='password' 
              name='password'
              onChange={this.handlePassword}
              value={this.state.password}
               />
              <p><button type="submit">Login</button></p>
              <p>Not a member? <a href="/register">Sign up now</a></p> 
          </form>
        );
    }
}
