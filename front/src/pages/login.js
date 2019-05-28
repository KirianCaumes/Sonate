import React, { Component } from 'react'
import { Link } from "react-router-dom"
import { Columns, Loader, Button, Content, Card, Container, Image, Media, Heading, Icon, Modal } from 'react-bulma-components'
import { Field, Control, Label, Help } from 'react-bulma-components/lib/components/form'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import Image from 'react-bulma-components/lib/components/image'
// import logo from '../static/music_notes.png'

export default class Login extends Component {
    constructor(props) {
        super(props)
        this.state = {
            loginValid: {
                username: null,
                password: null
            },
            data: {
                username: null,
                password: null
            }
        }
        document.title = "Sonate ♪ Accueil"
    }

    login() {

    }

    render() {
        return (
            <Container>
                <Columns>
                    <Columns.Column>
                        <Card>
                            <Card.Header>
                                <Card.Header.Title>Connectez vous à Sonate !</Card.Header.Title>
                            </Card.Header>
                            <Card.Content>
                                <Content>
                                    <Field>
                                        <Control iconLeft>
                                            <input
                                                className={`input ${this.state.loginValid.username ? 'is-success' : this.state.loginValid.username ? 'is-danger' : ''}`}
                                                type="text"
                                                placeholder="Pseudo"
                                                onChange={(e) => this.setState({ data: { ...this.state.data, username: e.target.value } })}
                                                value={this.state.data.username}
                                                onKeyPress={e => { if (e.key === 'Enter') this.login(); }}
                                                disabled={false}
                                                ref={(input) => { this.usernameInput = input }}
                                            />
                                            <Icon align="left"><FontAwesomeIcon icon="users" /></Icon>
                                        </Control>
                                        <Help color="danger"></Help>
                                    </Field>
                                    
                                    <Field>
                                        <Control iconLeft>
                                            <input
                                                className={`input ${this.state.loginValid.password ? 'is-success' : this.state.loginValid.password ? 'is-danger' : ''}`}
                                                type="password"
                                                placeholder="Mot de passe"
                                                onChange={(e) => this.setState({ data: { ...this.state.data, password: e.target.value } })}
                                                value={this.state.data.password}
                                                onKeyPress={e => { if (e.key === 'Enter') this.login(); }}
                                                disabled={false}
                                                ref={(input) => { this.passwordInput = input }}
                                            />
                                            <Icon align="left"><FontAwesomeIcon icon="users" /></Icon>
                                        </Control>
                                        <Help color="danger"></Help>
                                    </Field>
                                    <Button
                                        color="primary"
                                        className="is-fullwidth"
                                        onClick={this.login.bind(this)}
                                    >
                                        <FontAwesomeIcon icon="play" style={{ marginRight: '5px' }} />
                                        Se connecter
                                    </Button>
                                    {/* <h2 className="title is-4"><FontAwesomeIcon style={{ marginRight: '5px' }} icon="compact-disc" />Chanson</h2> */}

                                </Content>
                            </Card.Content>
                        </Card>
                    </Columns.Column>
                </Columns>
            </Container>
        )
    }
}
