import React, { Component } from 'react'
import { Link } from "react-router-dom"
import { Navbar } from 'react-bulma-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import $ from 'jquery'

export default class Header extends Component {
    constructor(props) {
        super(props)
        this.state = {
            open: false
        }
    }

    componentDidMount() {
        document.addEventListener('scroll', this.listenScroll(), false)
    }

    componentWillUnmount() {
        document.removeEventListener('scroll', this.listenScroll(), false)
    }

    listenScroll() {
        window.onscroll = () => {
            if (parseInt($('.infos').css('top'), 10) >= 1 || window.pageYOffset < 52) {
                $('.infos').css('top', 53 - window.pageYOffset)
            } else {
                $('.infos').css('top', 0)
            }
        }
    }

    render() {
        return (
            <Navbar
                color="primary"
                active={this.state.open}
                transparent={false}
            >
                <Navbar.Brand>
                    {/* <Navbar.Item renderAs="a" href="#">
                            <img
                                src="https://bulma.io/images/bulma-logo.png"
                                alt="Bulma: a modern CSS framework based on Flexbox"
                                width="112"
                                height="28"
                            />
                        </Navbar.Item> */}
                    <Navbar.Burger
                        active={this.state.open.toString()}
                        onClick={() =>
                            this.setState({
                                open: !this.state.open
                            })
                        }
                    />
                </Navbar.Brand>
                <Navbar.Menu active={this.state.open.toString()}>
                    <Navbar.Container>
                        <Link to="/" className="navbar-item" onClick={() => this.setState({ open: !this.state.open })}>
                            <FontAwesomeIcon icon="home" style={{ marginRight: '5px' }} />
                            Accueil
                        </Link>
                        <Link to="/history" className="navbar-item" onClick={() => this.setState({ open: !this.state.open })}>
                            <FontAwesomeIcon icon="list" style={{ marginRight: '5px' }} />
                            Historique
                        </Link>
                    </Navbar.Container>
                    <Navbar.Container position="end">
                        <Link to="/login" className="navbar-item" onClick={() => this.setState({ open: !this.state.open })}>
                            <FontAwesomeIcon icon="sign-out-alt" style={{ marginRight: '5px' }} />
                            Déconnexion
                        </Link>
                        {/* <Link to="/mode" className="navbar-item">Mode</Link> */}
                    </Navbar.Container>
                </Navbar.Menu>
            </Navbar>
        );
    }
}