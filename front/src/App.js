import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import Game from "./pages/game"
import Index from './pages/index';
import SelectMode from './pages/select';
import { library } from '@fortawesome/fontawesome-svg-core'
import { faIgloo, faRedoAlt, faEye, faUsers, faCheck, faFont, faPlus, faMusic, faCalendarDay, faPlay, faClock, faHandPaper, faHandPointer, faChild, faHome, faStopwatch, faChevronLeft, faExclamationTriangle, faCompactDisc } from '@fortawesome/free-solid-svg-icons'
import Header from './components/header';
import Error from './pages/error';

library.add(faIgloo, faRedoAlt, faEye, faUsers, faCheck, faFont, faPlus, faMusic, faCalendarDay, faPlay, faClock, faHandPaper, faHandPointer, faChild, faHome, faStopwatch, faChevronLeft, faExclamationTriangle, faCompactDisc)


class App extends Component {
    constructor() {
        super()
    }
    render() {
        return (
            <Router>
                <div>
                    <Header />
                    <Switch>
                        <Route exact path="/" component={Index} />
                        <Route path="/select/:modeId" component={SelectMode} />
                        <Route path="/game/:modeId" component={Game} />
                        <Route component={Error} />
                    </Switch>
                </div>
            </Router>
        );
    }
}

export default App;
