import React, { Component } from 'react'
import 'react-bulma-components/dist/react-bulma-components.min.css'
import './App.css'

import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import { Loader } from 'react-bulma-components'

import Game from "./pages/game"
import Index from './pages/index'
import SelectMode from './pages/select'
import Header from './components/header'
import Error from './pages/error'
import Login from './pages/login'
import Request from "./helpers/request"

import { library } from '@fortawesome/fontawesome-svg-core'
import { faIgloo, faRedoAlt, faEye, faUsers, faCheck, faFont, faPlus, faMusic, faCalendarDay, faPlay, faClock, faHandPaper, faHandPointer, faChild, faHome, faStopwatch, faChevronLeft, faExclamationTriangle, faCompactDisc, faLightbulb, faGlobe } from '@fortawesome/free-solid-svg-icons'

library.add(faIgloo, faRedoAlt, faEye, faUsers, faCheck, faFont, faPlus, faMusic, faCalendarDay, faPlay, faClock, faHandPaper, faHandPointer, faChild, faHome, faStopwatch, faChevronLeft, faExclamationTriangle, faCompactDisc, faLightbulb, faGlobe)

require('dotenv').config()

export default class App extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isInit: false
        }
    }

    componentDidMount() {
        if (localStorage.getItem('constants') && /^[\],:{}\s]*$/.test(localStorage.getItem('constants').replace(/\\["\\/bfnrtu]/g, '@').replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+-]?\d+)?/g, ']').replace(/(?:^|:|,)(?:\s*\[)+/g, ''))) {
            window.constants = JSON.parse(localStorage.getItem('constants'))
            this.setState({ isInit: true })
        } else {
            window.constants = { country: [], googleTradLang: [], levels: [], settings: [] }
        }
        Request.send('GET', ['constants'], {},
            (data) => {
                localStorage.setItem('constants', JSON.stringify(data))
                window.constants = data
                this.setState({ isInit: true })
            })
    }

    render() {
        return (
            <Router>
                <div>
                    {
                        this.state.isInit
                            ?
                            localStorage.getItem('sonateToken')
                                ?
                                <div id='content'>
                                    <Header />
                                    <Switch>
                                        <Route exact path="/" component={Index} />
                                        <Route path="/mode/:modeId(nom|groupe|album)" component={SelectMode} />
                                        <Route path="/jeu/:modeId(nom|groupe|album)" component={Game} />
                                        <Route path="/erreur" component={Error} />
                                        <Route component={Error} />
                                    </Switch>
                                </div>
                                :
                                <Login/>
                            :
                            <Loader style={{ width: '150px', height: '150px', margin: '33vh auto' }} />
                    }

                </div>
            </Router>
        );
    }
}
