import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

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
            { method: 'POST' }
        )
            .then(r => r.json())
            .then(result => {
                console.log(result);
                this.setState({
                    active: false,
                    dots: false
                })
                this.props.history.push('/');
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
        const isLoggedIn = this.state.active;
        return (
            <div className="NavDiv">
                <ul className="NavUl">
                    <div className="dots"
                        onClick={this.showMenu}
                    >
                    </div>
                    {this.state.dots &&
                        (<>
                            <hr className="hr" />
                            <li>
                                <Link to="/" onClick={this.handleActiveUser}>Home</Link><hr className="hr" />
                            </li>
                            {isLoggedIn ? (
                                <>
                                    <li>
                                        <Link to="/gallery" onClick={this.handleActiveUser}>Gallery</Link><hr className="hr" />
                                    </li>
                                    <li>
                                        <Link to="/"
                                            onClick={this.handleLogOut}
                                        >Logout</Link>
                                    </li>
                                </>
                            ) : (
                                    <>
                                        <li>
                                            <Link to="/login"
                                                onClick={this.handleActiveUser}
                                            >Login</Link><hr className="hr" />
                                        </li>
                                        <li>
                                            <Link to="/register" onClick={this.handleActiveUser}>Register</Link>
                                        </li>
                                    </>
                                )}
                        </>)
                    }
                </ul>
            </div>
        )
    }
}
