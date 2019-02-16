import React, { Component } from 'react';
import '../App.css';
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
import Game from './game';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Icon from 'react-bulma-components/lib/components/icon'

import { BrowserRouter as Router, Route, Link } from "react-router-dom"

import DATAS from "../datas/modes.json"

export default class SelectMode extends Component {
    constructor(props) {
        super(props)
        let settings = DATAS.find(x => x.name == this.props.match.params.modeId)
        this.state = {
            pick: null,
            title: "",
            artist: "",
            album: "",
            yearAlbum: "",
            input: {
                title: settings.inputsSelect.title,
                artist: settings.inputsSelect.artist,
                album: settings.inputsSelect.album,
                yearAlbum: settings.inputsSelect.yearAlbum
            }
        }
    }

    send() {
        this.props.history.push({
            pathname: "/game/" + this.props.match.params.modeId,
            title: this.state.title,
            artist: this.state.artist,
            album: this.state.album,
            yearAlbum: this.state.yearAlbum
        })
    }

    render() {
        return (
            <Container>
                <Columns>
                    <Columns.Column>
                        <Card>
                            <Card.Header>
                                <Card.Header.Title>Remplissez précisément les informations</Card.Header.Title>
                            </Card.Header>
                            <Card.Content>
                                <Content>
                                    <Columns>
                                        {
                                            this.state.input.title ?
                                                <Columns.Column>
                                                    <Field>
                                                        <Label>Titre</Label>
                                                        <Control iconLeft>
                                                            <Input
                                                                type="text"
                                                                placeholder="Titre"
                                                                onChange={(e) => this.setState({ title: e.target.value })}
                                                                value={this.state.title}
                                                                onKeyPress={(e) => e.key == 'Enter' ? this.send() : ''}
                                                            />
                                                            <Icon align="left">
                                                                <FontAwesomeIcon icon="users" />
                                                            </Icon>
                                                        </Control>
                                                        <Help color="danger"></Help>
                                                    </Field>
                                                </Columns.Column>
                                                : ''
                                        }
                                        {
                                            this.state.input.artist ?
                                                <Columns.Column>
                                                    <Field>
                                                        <Label>Groupe</Label>
                                                        <Control iconLeft>
                                                            <Input
                                                                type="text"
                                                                placeholder="Groupe"
                                                                onChange={(e) => this.setState({ artist: e.target.value })}
                                                                value={this.state.artist}
                                                                onKeyPress={e => e.key == 'Enter' ? this.send() : ''}
                                                            />
                                                            <Icon align="left">
                                                                <FontAwesomeIcon icon="font" />
                                                            </Icon>
                                                        </Control>
                                                        <Help color="danger"></Help>
                                                    </Field>
                                                </Columns.Column>

                                                : ''
                                        }
                                    </Columns>
                                    <Columns>
                                        {
                                            this.state.input.album ?
                                                <Columns.Column>
                                                    <Field>
                                                        <Label>Album</Label>
                                                        <Control iconLeft>
                                                            <Input
                                                                type="text"
                                                                placeholder="Album"
                                                                onChange={(e) => this.setState({ album: e.target.value })}
                                                                value={this.state.album}
                                                                onKeyPress={(e) => e.key == 'Enter' ? this.send() : ''}
                                                            />
                                                            <Icon align="left">
                                                                <FontAwesomeIcon icon="users" />
                                                            </Icon>
                                                        </Control>
                                                        <Help color="danger"></Help>
                                                    </Field>
                                                </Columns.Column>
                                                : ''
                                        }
                                        {
                                            this.state.input.yearAlbum ?
                                                <Columns.Column>
                                                    <Field>
                                                        <Label>Année de se sortie de l'album</Label>
                                                        <Control iconLeft>
                                                            <Input
                                                                type="text"
                                                                placeholder="Année de l'album"
                                                                onChange={(e) => this.setState({ yearAlbum: e.target.value })}
                                                                value={this.state.yearAlbum}
                                                                onKeyPress={(e) => e.key == 'Enter' ? this.send() : ''}
                                                            />
                                                            <Icon align="left">
                                                                <FontAwesomeIcon icon="users" />
                                                            </Icon>
                                                        </Control>
                                                        <Help color="danger"></Help>
                                                    </Field>
                                                </Columns.Column>
                                                : ''
                                        }
                                    </Columns>

                                    <Button color="primary" className="is-fullwidth" onClick={this.send.bind(this)}>Jouer !</Button>
                                </Content>
                            </Card.Content>
                        </Card>
                    </Columns.Column>
                </Columns>
            </Container>
        );
    }
}
