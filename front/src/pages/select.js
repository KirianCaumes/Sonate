import React, { Component } from 'react';
import '../App.css';
import 'react-bulma-components/dist/react-bulma-components.min.css'
import { Columns, Button } from 'react-bulma-components'
import {
    Field,
    Control,
    Label,
    Input,
    Help,
} from 'react-bulma-components/lib/components/form';

import Card from 'react-bulma-components/lib/components/card';
import Container from 'react-bulma-components/lib/components/container';
import Content from 'react-bulma-components/lib/components/content';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Icon from 'react-bulma-components/lib/components/icon'

import DATAS from "../datas/modes.json"
import LEVELS from "../datas/level.json"

export default class SelectMode extends Component {
    constructor(props) {
        super(props)
        this.settings = DATAS.find(x => x.name === this.props.match.params.modeId)
        this.levels = LEVELS
        this.state = {
            title: undefined,
            artist: undefined,
            album: undefined,
            yearAlbum: undefined,
            time: this.levels.find(x=> x.name === "perso").time,
            songs: this.levels.find(x=> x.name === "perso").songs,
            level: "perso",
            error: {
                title: false,
                artist: false,
                album: false,
                yearAlbum: false,
                time: false,
                songs: false
            }
        }
    }

    send() {
        if ((this.settings.inputsSelect.title && !this.state.title) || (this.settings.inputsSelect.artist && !this.state.artist) || (this.settings.inputsSelect.album && !this.state.album) || (this.settings.inputsSelect.yearAlbum && !this.state.yearAlbum) || (this.settings.inputsSelect.time && !this.state.time) || (this.settings.inputsSelect.songs && !this.state.songs)) {
            this.setState({
                error: {
                    title: this.settings.inputsSelect.title && !this.state.title,
                    artist: this.settings.inputsSelect.artist && !this.state.artist,
                    album: this.settings.inputsSelect.album && !this.state.album,
                    yearAlbum: this.settings.inputsSelect.yearAlbum && !this.state.yearAlbum,
                    time: this.settings.inputsSelect.time && !this.state.time,
                    songs: this.settings.inputsSelect.songs && !this.state.songs
                }
            })
        } else {
            this.setState({
                error: {
                    title: false,
                    artist: false,
                    album: false,
                    yearAlbum: false,
                    time: false,
                    songs: false
                }
            })
            this.props.history.push({
                pathname: "/game/" + this.props.match.params.modeId,
                title: this.state.title,
                artist: this.state.artist,
                album: this.state.album,
                yearAlbum: this.state.yearAlbum,
                time: this.state.time,
                songs: this.state.songs
            })
        }
    }

    render() {
        return (
            <Container>
                <Columns>
                    <Columns.Column>
                        <Card>
                            {/* <Card.Header>
                                <Card.Header.Title>Remplissez précisément les informations</Card.Header.Title>
                            </Card.Header> */}
                            <Card.Content>
                                <Content>
                                    <h2 className="title is-4">Parametres</h2>
                                    <Columns>
                                        {
                                            this.settings.inputsSelect.artist ?
                                                <Columns.Column>
                                                    <Field>
                                                        <Label className="required">Groupe</Label>
                                                        <Control iconLeft>
                                                            <Input
                                                                type="text"
                                                                placeholder="Groupe"
                                                                onChange={(e) => this.setState({ artist: e.target.value })}
                                                                value={this.state.artist}
                                                                onKeyPress={e => e.key === 'Enter' ? this.send() : ''}
                                                                color={this.state.error.artist ? "danger" : ''}
                                                            />
                                                            <Icon align="left">
                                                                <FontAwesomeIcon icon="users" />
                                                            </Icon>
                                                        </Control>
                                                        {this.state.error.artist ? <Help color="danger">Veuillez remplir le champs</Help> : ''}
                                                    </Field>
                                                </Columns.Column>
                                                : ''
                                        }
                                        {
                                            this.settings.inputsSelect.title ?
                                                <Columns.Column>
                                                    <Field>
                                                        <Label className="required">Chanson</Label>
                                                        <Control iconLeft>
                                                            <Input
                                                                type="text"
                                                                placeholder="Chanson"
                                                                onChange={(e) => this.setState({ title: e.target.value })}
                                                                value={this.state.title}
                                                                onKeyPress={(e) => e.key === 'Enter' ? this.send() : ''}
                                                                color={this.state.error.title ? "danger" : ''}
                                                            />
                                                            <Icon align="left">
                                                                <FontAwesomeIcon icon="compact-disc" />
                                                            </Icon>
                                                        </Control>
                                                        {this.state.error.title ? <Help color="danger">Veuillez remplir le champs</Help> : ''}
                                                    </Field>
                                                </Columns.Column>
                                                : ''
                                        }
                                    </Columns>
                                    <Columns>
                                        {
                                            this.settings.inputsSelect.album ?
                                                <Columns.Column>
                                                    <Field>
                                                        <Label>Album</Label>
                                                        <Control iconLeft>
                                                            <Input
                                                                type="text"
                                                                placeholder="Album"
                                                                onChange={(e) => this.setState({ album: e.target.value })}
                                                                value={this.state.album}
                                                                onKeyPress={(e) => e.key === 'Enter' ? this.send() : ''}
                                                                color={this.state.error.album ? "danger" : ''}
                                                            />
                                                            <Icon align="left">
                                                                <FontAwesomeIcon icon="music" />
                                                            </Icon>
                                                        </Control>
                                                        {this.state.error.album ? <Help color="danger">Veuillez remplir le champs</Help> : ''}
                                                    </Field>
                                                </Columns.Column>
                                                : ''
                                        }
                                        {
                                            this.settings.inputsSelect.yearAlbum ?
                                                <Columns.Column>
                                                    <Field>
                                                        <Label>Année de se sortie de l'album</Label>
                                                        <Control iconLeft>
                                                            <Input
                                                                type="text"
                                                                placeholder="Année de l'album"
                                                                onChange={(e) => this.setState({ yearAlbum: e.target.value })}
                                                                value={this.state.yearAlbum}
                                                                onKeyPress={(e) => e.key === 'Enter' ? this.send() : ''}
                                                                color={this.state.error.yearAlbum ? "danger" : ''}
                                                            />
                                                            <Icon align="left">
                                                                <FontAwesomeIcon icon="calendar-day" />
                                                            </Icon>
                                                        </Control>
                                                        {this.state.error.yearAlbum ? <Help color="danger">Veuillez remplir le champs</Help> : ''}
                                                    </Field>
                                                </Columns.Column>
                                                : ''
                                        }
                                    </Columns>

                                </Content>
                                <br />
                                <Content>
                                    <h2 className="title is-4">Options</h2>
                                    <Columns>
                                        <Columns.Column>
                                            <Field>
                                                <Label>Niveau</Label>
                                                <Control iconLeft>
                                                    <div className="select">
                                                        <select defaultValue={this.state.level} onChange={(e) => this.setState({ level: e.target.value, time: this.levels.find(x => x.name === e.target.value).time, songs: this.levels.find(x => x.name === e.target.value).songs })}>
                                                            <option value="short">Court</option>
                                                            <option value="medium">Moyen</option>
                                                            <option value="long">Long</option>
                                                            <option value="perso">Personalisé</option>
                                                        </select>
                                                    </div>
                                                    <Icon align="left">
                                                        <FontAwesomeIcon icon="hand-pointer" />
                                                    </Icon>
                                                </Control>
                                            </Field>
                                        </Columns.Column>
                                        {
                                            this.settings.inputsOptions.time ?
                                                <Columns.Column>
                                                    <Field>
                                                        <Label>Temps maximum</Label>
                                                        <Control iconLeft>
                                                            <Input
                                                                type="time"
                                                                placeholder="Temps"
                                                                onChange={(e) => this.setState({ time: e.target.value })}
                                                                value={this.state.time}
                                                                onKeyPress={e => e.key === 'Enter' ? this.send() : ''}
                                                                color={this.state.error.time ? "danger" : ''}
                                                                disabled={this.state.level !== "perso"}
                                                            />
                                                            <Icon align="left">
                                                                <FontAwesomeIcon icon="clock" />
                                                            </Icon>
                                                        </Control>
                                                        {this.state.error.time ? <Help color="danger">Veuillez remplir le champs</Help> : ''}
                                                    </Field>
                                                </Columns.Column>
                                                : ''
                                        }
                                        {
                                            this.settings.inputsOptions.songs ?
                                                <Columns.Column>
                                                    <Field>
                                                        <Label>Chansons maximum</Label>
                                                        <Control iconLeft>
                                                            <Input
                                                                type="number"
                                                                placeholder="Chansons"
                                                                onChange={(e) => this.setState({ songs: e.target.value })}
                                                                value={this.state.songs}
                                                                onKeyPress={e => e.key === 'Enter' ? this.send() : ''}
                                                                color={this.state.error.songs ? "danger" : ''}
                                                                disabled={this.state.level !== "perso"}
                                                            />
                                                            <Icon align="left">
                                                                <FontAwesomeIcon icon="hand-paper" />
                                                            </Icon>
                                                        </Control>
                                                        {this.state.error.songs ? <Help color="danger">Veuillez remplir le champs</Help> : ''}
                                                    </Field>
                                                </Columns.Column>
                                                : ''
                                        }
                                    </Columns>
                                    <Button
                                        color="primary"
                                        className="is-fullwidth"
                                        onClick={this.send.bind(this)}
                                    >
                                        <FontAwesomeIcon icon="play" style={{ marginRight: '5px' }} />
                                        Jouer !
                                    </Button>
                                </Content>
                            </Card.Content>
                        </Card>
                    </Columns.Column>
                </Columns>
            </Container>
        );
    }
}
