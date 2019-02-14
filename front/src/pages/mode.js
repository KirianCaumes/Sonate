import React, { Component } from 'react';
import '../App.css';
import { Link } from "react-router-dom"
import $ from 'jquery'
import 'react-bulma-components/dist/react-bulma-components.min.css'
import { Columns, Loader, Button } from 'react-bulma-components'
import {
    Field,
    Control,
    Label,
    Input,
    Textarea,
    Select,
    Checkbox,
    Radio,
    Help,
} from 'react-bulma-components/lib/components/form';
import Card from 'react-bulma-components/lib/components/card';
import Container from 'react-bulma-components/lib/components/container';


export default class PickMode extends Component {
    constructor() {
        super()
    }
    componentDidMount() {

    }

    render() {
        return (
            <div>
                <Container>
                    <Link to="/" >
                        <Button color="primary">Home</Button>
                    </Link>
                    <br />
                    <Link
                        to={{
                            pathname: '/select',
                            title: "Selectionner chanson",
                            url: "http://localhost:5000/api/song/byname/"
                        }}
                    >
                        <Button color="primary">Selectionner chanson</Button>
                    </Link>
                    <br />
                    <Link
                        to={{
                            pathname: '/select',
                            title: "Chanson aléatoire pour un artiste",
                            url: "http://localhost:5000/api/song/byband/"
                        }}
                    >
                        <Button color="primary">Chanson aléatoire pour un artiste</Button>
                    </Link>
                </Container>
            </div>
        );
    }
}
