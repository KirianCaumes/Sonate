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
import Content from 'react-bulma-components/lib/components/content';

export default class PickMode extends Component {
    constructor() {
        super()
    }
    componentDidMount() {

    }

    render() {
        return (
            <Container>
                <Columns>
                    <Columns.Column>
                        <Card>
                            <Card.Header>
                                <Card.Header.Title>Choisissez un mode de jeu</Card.Header.Title>
                            </Card.Header>
                            <Card.Content>
                                <Content>
                                    <Link
                                        to={{
                                            pathname: '/select/byname',
                                            title: "Selectionner chanson",
                                            url: "http://localhost:5000/api/song/byname/"
                                        }}
                                    >
                                        <Button color="primary" className="is-fullwidth">Une chanson</Button>
                                    </Link>
                                    <br />
                                    <Link
                                        to={{
                                            pathname: '/select/byband',
                                            title: "Chanson aléatoire pour un artiste",
                                            url: "http://localhost:5000/api/song/byband/"
                                        }}
                                    >
                                        <Button color="primary" className="is-fullwidth">Plusieurs chansons aléatoire pour un artiste</Button>
                                    </Link>
                                    <br />
                                    <Link
                                        to={{
                                            pathname: '/select/byalbum',
                                            title: "Chanson aléatoire pour un artiste",
                                            url: "http://localhost:5000/api/song/byband/"
                                        }}
                                    >
                                        <Button color="primary" className="is-fullwidth">Plusieurs chansons aléatoire pour un artiste et un album</Button>
                                    </Link>
                                </Content>
                            </Card.Content>
                        </Card>
                    </Columns.Column>
                </Columns>
            </Container>
        );
    }
}
