import React, { Component } from 'react'
import 'react-bulma-components/dist/react-bulma-components.min.css'
import './App.css'

import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import { Redirect } from "react-router"

import Game from "./pages/game"
import Index from './pages/index'
import SelectMode from './pages/select'
import Error from './pages/error'
import Login from './pages/login'

import { library } from '@fortawesome/fontawesome-svg-core'
import { faIgloo, faRedoAlt, faEye, faUsers, faCheck, faFont, faPlus, faMusic, faCalendarDay, faPlay, faClock, faHandPaper, faHandPointer, faChild, faHome, faStopwatch, faChevronLeft, faExclamationTriangle, faCompactDisc, faLightbulb, faGlobe, faUser, faKey, faSignInAlt, faSignOutAlt } from '@fortawesome/free-solid-svg-icons'

library.add(faIgloo, faRedoAlt, faEye, faUsers, faCheck, faFont, faPlus, faMusic, faCalendarDay, faPlay, faClock, faHandPaper, faHandPointer, faChild, faHome, faStopwatch, faChevronLeft, faExclamationTriangle, faCompactDisc, faLightbulb, faGlobe, faUser, faKey, faSignInAlt, faSignOutAlt)

require('dotenv').config()

export default class App extends Component {
    constructor(props) {
        super(props)
        if (localStorage.getItem('sonateConstants') && /^[\],:{}\s]*$/.test(localStorage.getItem('sonateConstants').replace(/\\["\\/bfnrtu]/g, '@').replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+-]?\d+)?/g, ']').replace(/(?:^|:|,)(?:\s*\[)+/g, ''))) {
            window.constants = JSON.parse(localStorage.getItem('sonateConstants'))
        } else {
            window.constants = { country: [], googleTradLang: [], levels: [], settings: [] }
        }
    }

    render() {
        return (
            <Router>
                <Switch>
                    <Route exact path="/" component={() => {
                        return localStorage.getItem('sonateToken') ? <Index /> : <Redirect to="/login" />
                    }} />
                    <Route exact path="/mode/:modeId(nom|groupe|album)" component={(props) => { 
                        return localStorage.getItem('sonateToken') ? <SelectMode {...props} /> : <Redirect to="/login" {...props} />
                    }} />
                    <Route exact path="/jeu/:modeId(nom|groupe|album)" component={(props) => {
                        return localStorage.getItem('sonateToken') ? <Game {...props} /> : <Redirect to="/login" {...props} />
                    }} />
                    <Route path="/erreur" component={Error} />
                    <Route path="/login" component={Login} />
                    <Route component={Error} />
                </Switch>
            </Router>
        )
    }
}