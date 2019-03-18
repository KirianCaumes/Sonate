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
import Tabs from 'react-bulma-components/lib/components/tabs';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default class Index extends Component {
    constructor() {
        super()
        this.state = {
        }
    }
    componentDidMount() {

    }

    render() {
        return (
            <Container>
                <Columns>
                    <Columns.Column>
                        <Card>
                            {/* <Card.Header>
                                <Card.Header.Title>Choisissez un mode de jeu</Card.Header.Title>
                            </Card.Header> */}
                            <Card.Content>
                                <Content>
                                    <h2 className="title is-4"><FontAwesomeIcon style={{ marginRight: '5px' }} icon="users" />Chanson</h2>
                                    <Columns>
                                        <Columns.Column>
                                            <Link to={{ pathname: '/select/byname' }} >
                                                <Button color="primary" className="is-fullwidth">Une chanson</Button>
                                            </Link>
                                        </Columns.Column>
                                    </Columns>

                                    <h2 className="title is-4"><FontAwesomeIcon style={{ marginRight: '5px' }} icon="font" /> Groupe</h2>
                                    <Columns>
                                        <Columns.Column>
                                            <Link to={{ pathname: '/select/byband' }} >
                                                <Button color="primary" className="is-fullwidth">Chansons aléatoires pour un artiste</Button>
                                            </Link>
                                        </Columns.Column>
                                        <Columns.Column>
                                            <Link to={{ pathname: '/select/byalbum' }} >
                                                <Button color="primary" className="is-fullwidth">Chansons aléatoires pour un artiste et un album</Button>
                                            </Link>
                                        </Columns.Column>
                                    </Columns>

                                    <h2 className="title is-4"><FontAwesomeIcon style={{ marginRight: '5px' }} icon="child" /> TOP</h2>
                                    <Columns>
                                        <Columns.Column>
                                            <Button disabled={true} color="primary" className="is-fullwidth">Comming soon...</Button>
                                        </Columns.Column>
                                    </Columns>
                                </Content>
                            </Card.Content>
                        </Card>
                    </Columns.Column>
                </Columns>
            </Container>
        );
    }
}
