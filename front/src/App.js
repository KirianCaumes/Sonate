import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import Game from "./pages/game"
import Index from './pages/index';
import SelectMode from './pages/select';
import { library } from '@fortawesome/fontawesome-svg-core'
import { faIgloo, faRedoAlt, faEye, faUsers, faCheck, faFont, faPlus, faMusic, faCalendarDay, faPlay, faClock, faHandPaper, faHandPointer, faChild, faHome, faStopwatch, faChevronLeft, faExclamationTriangle, faCompactDisc, faLightbulb } from '@fortawesome/free-solid-svg-icons'
import Header from './components/header';
import Error from './pages/error';

library.add(faIgloo, faRedoAlt, faEye, faUsers, faCheck, faFont, faPlus, faMusic, faCalendarDay, faPlay, faClock, faHandPaper, faHandPointer, faChild, faHome, faStopwatch, faChevronLeft, faExclamationTriangle, faCompactDisc, faLightbulb)


class App extends Component {
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
