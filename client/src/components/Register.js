import React, { Component } from 'react';

export default class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            email: '',
            username: '',
            password: '',
            errorMessage: ''
        };
    }
    handleSubmit = (e) => {
        e.preventDefault();
        fetch(`/register`, {
            method: 'POST',
            body: JSON.stringify({
                name: this.state.name,
                email: this.state.email,
                username: this.state.username,
                password: this.state.password
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(r => r.json())
            .then(result => {
                if (result.message === "okay") {
                    console.log(result);
                    this.props.history.push('/gallery');
                } else if (result.message === "email") {
                    this.setState({
                        errorMessage: "An account in that email already exists."
                    })
                } else if (result.message === "username") {
                    this.setState({
                        errorMessage: "An account in that username already exists."
                    })
                } else if (result.message === "empty") {
                    this.setState({
                        errorMessage: "Please fill out everything in the form."
                    })
                }
            })
            .catch(err => {
                console.log(err);
            });
    }
    handleName = (e) => {
        this.setState({ name: e.target.value });
    }
    handleEmail = (e) => {
        this.setState({ email: e.target.value });
    }
    handleUsername = (e) => {
        this.setState({ username: e.target.value });
    }
    handlePassword = (e) => {
        this.setState({ password: e.target.value });
    }
    render() {
        const hasError = this.state.errorMessage !== "";
        return (
            <form action='/register'
                method='POST'
                className='registerForm'
                onSubmit={this.handleSubmit}
            >
                <h1>Sign Up</h1>
                {hasError &&
                    <h4>{this.state.errorMessage}</h4>
                }
                <label>Name: </label>
                <input type='text'
                    name='name'
                    onChange={this.handleName}
                    value={this.state.name}
                />
                <br /><br />
                <label>Email: </label>
                <input type='email'
                    name='email'
                    onChange={this.handleEmail}
                    value={this.state.email}
                />
                <br /><br />
                <label>Username: </label>
                <input type='text'
                    name='username'
                    onChange={this.handleUsername}
                    value={this.state.username}
                />
                <br /><br />
                <label>Password: </label>
                <input type='password'
                    name='password'
                    onChange={this.handlePassword}
                    value={this.state.password}
                />
                <br /><br />
                <button type="submit">Register</button>
            </form>
        );
    }
}





