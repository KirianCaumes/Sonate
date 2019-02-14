import React, { Component } from 'react';
import '../App.css';
import { Link } from "react-router-dom"
import 'react-bulma-components/dist/react-bulma-components.min.css'
import { Button } from 'react-bulma-components'

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
                    <Button color="primary">Home</Button>
                </Link>
                <Link to="/mode" >
                    <Button color="primary">Start a game</Button>
				</Link>
            </div>
        );
    }
}

export default Home;
