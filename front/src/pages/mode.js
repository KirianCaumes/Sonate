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

export default class PickMode extends Component {
    constructor() {
        super()
        this.state = {
            tabs: {
                song: true,
                artist: false,
                artist: false
            }
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
                            <Card.Header>
                                <Card.Header.Title>Choisissez un mode de jeu</Card.Header.Title>
                            </Card.Header>
                            <Card.Content>
                                <Content>
                                    <Tabs
                                        fullwidth={false}
                                        align={'centered'}
                                    >
                                        <Tabs.Tab
                                            active={this.state.tabs.song ? true : false}
                                            onClick={() => { this.setState({ tabs: { song: true, artist: false, top: false } }) }}
                                        >
                                            <FontAwesomeIcon style={{ marginRight: '5px' }} icon="users" />
                                            Chanson
                                        </Tabs.Tab>
                                        <Tabs.Tab
                                            active={this.state.tabs.artist ? true : false}
                                            onClick={() => { this.setState({ tabs: { song: false, artist: true, top: false } }) }}
                                            className="has-text-primary"
                                        >
                                            <FontAwesomeIcon style={{ marginRight: '5px' }} icon="users" />
                                            Groupe
                                        </Tabs.Tab>
                                        <Tabs.Tab
                                            active={this.state.tabs.top ? true : false}
                                            onClick={() => { this.setState({ tabs: { song: false, artist: false, top: true } }) }}
                                            className="has-text-primary"
                                        >
                                            <FontAwesomeIcon style={{ marginRight: '5px' }} icon="users" />
                                            TOP
                                        </Tabs.Tab>
                                    </Tabs>
                                    {
                                        this.state.tabs.song ?
                                            <Columns>
                                                <Columns.Column>
                                                    <Link to={{ pathname: '/select/byname' }} >
                                                        <Button color="primary" className="is-fullwidth">Une chanson</Button>
                                                    </Link>
                                                </Columns.Column>
                                            </Columns>
                                            :
                                            ''
                                    }
                                    {
                                        this.state.tabs.artist ?
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
                                            :
                                            ''
                                    }
                                    {
                                        this.state.tabs.top ?
                                            <Columns>
                                                <Columns.Column>
                                                    Nothing...
                                                </Columns.Column>
                                            </Columns>
                                            :
                                            ''
                                    }
                                </Content>
                            </Card.Content>
                        </Card>
                    </Columns.Column>
                </Columns>
            </Container>
        );
    }
}
