import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import acorn from '../images/acorn_boldy.png';
export default class Nav extends Component {
    constructor(props) {
        super(props);
        this.state = {
            active: false,
            dots: false,
            width: window.innerWidth,
            username: ''
        }
    }

    componentDidMount = () => {
        window.addEventListener('resize', this.handleWindowSizeChange);
    }
    componentWillUnmount = () => {
        window.removeEventListener('resize', this.handleWindowSizeChange);
    }
    handleWindowSizeChange = () => {
        this.setState({ width: window.innerWidth });
    }
    handleErrors = (response) => {
        if (!response.ok) {
            throw Error(response.statusText);
        }
        return response;
    }
    // fetch("http://httpstat.us/500")
    //     .then(handleErrors)
    //     .then(response => console.log("ok") )
    //     .catch(error => console.log(error) );

    // handleGetUsername = () => {
    //     // if (this.state.active) {
    //     fetch(`/username`)
    //         .then(res => res.json())
    //         .then(res => {
    //             console.log(res);
    //             this.setState({
    //                 username: res.username
    //             })
    //         })
    // }
    // handleActiveUser = () => {
    //     fetch(`/active`)
    //         .then(r => r.json())
    //         .then(result => {
    //             console.log(result);
    //             this.setState({
    //                 active: result
    //             }, this.handleGetUsername)
    //         })
    // }
    // handleLogOut = () => {
    //     fetch(`/logout`,
    //         { method: 'POST' }
    //     )
    //         .then(r => r.json())
    //         .then(result => {
    //             console.log(result);
    //             this.setState({
    //                 active: false,
    //                 dots: false
    //             })
    //             this.props.history.push('/');
    //         })
    // }
    // showMenu = (e) => {
    //     e.preventDefault();
    //     if (!this.state.dots) {
    //         this.setState({
    //             dots: true
    //         })
    //     } else {
    //         this.setState({
    //             dots: false
    //         })
    //     }
    // }

    render() {
        const isLoggedIn = this.props.active;
        const isMobile = this.state.width < 500;
        const between5and6 = this.state.width >= 500 && this.state.width < 650;
        const welcomeBreak = between5and6 ? <br /> : "";
        return (
            <div className="NavDiv">
                <ul className="NavUl">
                    <div className="acornlogo">
                        <img src={acorn} alt="" />
                    </div>
                    <div className="dots"
                        onClick={this.props.showMenu}
                    >
                    </div>
                    {(this.props.dots || !isMobile) &&
                        (<>
                            {(isLoggedIn && isMobile) && (
                                <>
                                    <hr className="hr" />
                                    <li>
                                        Welcome, {this.props.username}
                                    </li>
                                </>
                            )}
                            <hr className="hr" />
                            <li>
                                <Link to="/" onClick={this.props.handleActiveUser}>Home</Link><hr className="hr" />
                            </li>
                            {isLoggedIn ? (
                                <>
                                    <li>
                                        <Link to="/gallery" onClick={this.props.handleActiveUser}>Gallery</Link><hr className="hr" />
                                    </li>
                                    <li>
                                        <Link to="/"
                                            onClick={this.props.handleLogOut}
                                        >Logout</Link>
                                    </li>
                                </>
                            ) : (
                                    <>
                                        <li>
                                            <Link to="/login"
                                                onClick={this.props.handleActiveUser}
                                            >Login</Link><hr className="hr" />
                                        </li>
                                        <li>
                                            <Link to="/register" onClick={this.props.handleActiveUser}>Register</Link>
                                        </li>
                                    </>
                                )}
                        </>)
                    }
                </ul>
                {(isLoggedIn && !isMobile) && (
                    <div className="bigusername">
                        Welcome, {welcomeBreak} {this.props.username}
                    </div>
                )}
            </div>
        )
    }
}
