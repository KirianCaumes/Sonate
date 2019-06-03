import React, { Component } from 'react'
import { Columns, Button, Content, Card, Container, Icon } from 'react-bulma-components'
import { Field, Control, Help } from 'react-bulma-components/lib/components/form'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { history } from '../components/history'
import Request from '../helpers/request'

export default class Register extends Component {
    constructor(props) {
        super(props)
        this.state = {
            loginValid: {
                username: true,
                password: true,
                password2: true,
            },
            data: {
                username: '',
                password: '',
                password2: ''
            },
            errorMessage: '',
            successMessage: ''
        }
        document.title = "Sonate ♪ Enregistrement"
    }

    componentDidMount() {
        localStorage.setItem('sonateToken', '')
    }

    register() {
        Request.send('POST', ['user', 'register'], { username: this.state.data.username, password: this.state.data.password, password2: this.state.data.password2 },
            data => {
                this.setState({
                    loginValid: {
                        username: true,
                        password: true,
                        password2: true
                    },
                    successMessage: data.message,
                    errorMessage: ''
                })
            },
            err => {
                this.setState({
                    loginValid: {
                        username: false,
                        password: false,
                        password2: false
                    },
                    errorMessage: err.responseJSON ? err.responseJSON.error : err,
                    successMessage: ''
                })
                console.error(err)
            })

    }

    render() {
        return (
            <Container>
                <Columns className="is-vcentered" style={{ height: 'calc(100vh - 3.25rem)', display: 'flex' }}>
                    <Columns.Column >
                        <Card style={{ maxWidth: '450px', margin: '0 auto' }}>
                            <Card.Header>
                                <Card.Header.Title>Inscrivez vous à Sonate !</Card.Header.Title>
                            </Card.Header>
                            <Card.Content>
                                <Content>
                                    <Field>
                                        <Control iconLeft>
                                            <input
                                                className={`input ${!this.state.loginValid.username ? 'is-danger' : ''}`}
                                                type="text"
                                                placeholder="Pseudo"
                                                onChange={(e) => this.setState({ data: { ...this.state.data, username: e.target.value } })}
                                                value={this.state.data.username}
                                                onKeyPress={e => { if (e.key === 'Enter') this.register(); }}
                                                disabled={false}
                                                ref={(input) => { this.usernameInput = input }}
                                            />
                                            <Icon align="left"><FontAwesomeIcon icon="user" /></Icon>
                                        </Control>
                                    </Field>

                                    <Field>
                                        <Control iconLeft>
                                            <input
                                                className={`input ${!this.state.loginValid.password ? 'is-danger' : ''}`}
                                                type="password"
                                                placeholder="Mot de passe"
                                                onChange={(e) => this.setState({ data: { ...this.state.data, password: e.target.value } })}
                                                value={this.state.data.password}
                                                onKeyPress={e => { if (e.key === 'Enter') this.register(); }}
                                                disabled={false}
                                                ref={(input) => { this.passwordInput = input }}
                                            />
                                            <Icon align="left"><FontAwesomeIcon icon="key" /></Icon>
                                        </Control>
                                    </Field>

                                    <Field>
                                        <Control iconLeft>
                                            <input
                                                className={`input ${!this.state.loginValid.password2 ? 'is-danger' : ''}`}
                                                type="password"
                                                placeholder="Confirmez"
                                                onChange={(e) => this.setState({ data: { ...this.state.data, password2: e.target.value } })}
                                                value={this.state.data.password2}
                                                onKeyPress={e => { if (e.key === 'Enter') this.register(); }}
                                                disabled={false}
                                                ref={(input) => { this.password2Input = input }}
                                            />
                                            <Icon align="left"><FontAwesomeIcon icon="key" /></Icon>
                                        </Control>
                                        <Help color="danger">{this.state.errorMessage}</Help>
                                        <Help color="success">{this.state.successMessage}</Help>
                                    </Field>
                                    <Columns>
                                        <Columns.Column style={{ paddingBottom: 0 }}>
                                            <Button
                                                color="primary"
                                                className="is-fullwidth"
                                                onClick={this.register.bind(this)}
                                            >
                                                {/* <FontAwesomeIcon icon="sign-in-alt" style={{ marginRight: '5px' }} /> */}
                                                S'inscrire
                                            </Button>
                                        </Columns.Column>
                                        <Columns.Column >
                                            <Button
                                                color="primary"
                                                className="is-fullwidth"
                                                onClick={() => history.push('/login')}
                                            >
                                                {/* <FontAwesomeIcon icon="sign-in-alt" style={{ marginRight: '5px' }} /> */}
                                                Se connecter
                                            </Button>
                                        </Columns.Column>
                                    </Columns>
                                </Content>
                            </Card.Content>
                        </Card>
                    </Columns.Column>
                </Columns>
            </Container>
        )
    }
}