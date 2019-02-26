import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from "react-router-dom"
import Game from "./pages/game"
import PickMode from './pages/mode';
import SelectMode from './pages/select';
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faIgloo, faRedoAlt, faEye, faUsers, faCheck, faFont, faPlus, faMusic, faCalendarDay, faPlay, faClock, faHandPaper } from '@fortawesome/free-solid-svg-icons'
import Header from './components/header';

library.add(faIgloo, faRedoAlt, faEye, faUsers, faCheck, faFont, faPlus, faMusic, faCalendarDay, faPlay, faClock, faHandPaper)


class App extends Component {
    constructor() {
        super()
    }
    render() {
        return (
            <Router>
                <div>
                    <Header/>                
                    <Route exact path="/" component={PickMode} />
                    <Route path="/select/:modeId" component={SelectMode} />
                    <Route path="/game/:modeId" component={Game} />
                    {/* <Route path="/game" component={Game} /> */}
                </div>
            </Router>
        );
    }
}

export default App;
