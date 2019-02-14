import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from "react-router-dom"
import Home from "./pages/home"
import Game from "./pages/game"
import PickMode from './pages/mode';
import SelectMode from './pages/select';

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
                    <Route path="/mode" component={PickMode} />
                    <Route path="/select" component={SelectMode} />
                    <Route path="/game" render={(props) => <Game {...props} />} />
                    {/* <Route path="/game" component={Game} /> */}
                </div>
            </Router>
        );
    }
}

export default App;
