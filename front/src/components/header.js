import React, { Component } from 'react';
import '../App.css';
import { Link } from "react-router-dom"
import 'react-bulma-components/dist/react-bulma-components.min.css'
import { Field, Control } from 'react-bulma-components/lib/components/form';
import Button from 'react-bulma-components/lib/components/button';
import Navbar from 'react-bulma-components/lib/components/navbar'

class Header extends Component {
    constructor(props) {
        super(props)
        this.state = {
            open: false
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
                        active={this.state.open}
                        onClick={() =>
                            this.setState({
                                open: !this.state.open
                            })
                        }
                    />
                </Navbar.Brand>
                <Navbar.Menu active={this.state.open}>
                    <Navbar.Container>
                        <Link to="/" class="navbar-item">Accueil</Link>
                        <Link to="/mode" class="navbar-item">Mode</Link>
                        <Link to="/game" class="navbar-item">Jeu</Link>
                    </Navbar.Container>
                </Navbar.Menu>
            </Navbar>
        );
    }
}

export default Header;
