import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import Home from "./pages/home"
import Game from "./pages/game"

class App extends Component {
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
            <Router>
                <div>
                    <Route exact path="/" component={Home} />
                    <Route path="/game" component={Game} />
                </div>
            </Router>
        );
    }
}

export default App;
