import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import acorn from '../images/acorn_white.png';
export default class Nav extends Component {
    constructor(props) {
        super(props);
        this.state = {
            active: false,
            dots: false,
            width: window.innerWidth
        }
    }

    componentDidMount = () => {
        window.addEventListener('resize', this.handleWindowSizeChange);
        this.handleActiveUser();
        setInterval(this.handleActiveUser, 1000);
    }
    componentWillUnmount = () => {
        window.removeEventListener('resize', this.handleWindowSizeChange);
    }
    handleWindowSizeChange = () => {
        this.setState({ width: window.innerWidth });
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
        const isMobile = this.state.width <= 500;
        return (
            <div className="NavDiv">
                <ul className="NavUl">
                    <div className="acornlogo">
                        <img src={acorn} alt="" />
                    </div>
                    <div className="dots"
                        onClick={this.showMenu}
                    >
                    </div>
                    {(this.state.dots || !isMobile) &&
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
