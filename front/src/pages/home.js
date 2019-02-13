import React, { Component } from 'react';
import '../App.css';
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom"
import Game from "./game"

class Home extends Component {
    constructor() {
        super()
        this.state = {
            lyrics: null,
            song: null,
            band: null,
            hasLoad: false
        }
    }
    render() {
        return (
            <div>
                <h1>Home sweet home</h1>
                <Link to="/" >
                    Home
				</Link>
                <Link to="/game" >
                    Game
				</Link>
            </div>
        );
    }
}

export default Home;
