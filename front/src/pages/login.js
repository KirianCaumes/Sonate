import React, { Component } from 'react'
import { Columns, Button, Content, Card, Container, Icon } from 'react-bulma-components'
import { Field, Control, Help } from 'react-bulma-components/lib/components/form'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { history } from '../components/history'
import Request from '../helpers/request'

export default class Login extends Component {
    constructor(props) {
        super(props)
        this.state = {
            loginValid: {
                username: true,
                password: true
            },
            data: {
                username: '',
                password: ''
            },
            errorMessage: this.props.location && this.props.location.error ? this.props.location.error : ''
        }
        document.title = "Sonate ♪ Connexion"
    }

    componentDidMount() {
        localStorage.setItem('sonateToken', '')
    }

    login() {
        Request.send('POST', ['user', 'login'], { username: this.state.data.username, password: this.state.data.password },
            data => {
                localStorage.setItem('sonateToken', data.token)
                history.push('/')
            },
            err => {
                localStorage.setItem('sonateToken', '')
                this.setState({
                    loginValid: {
                        username: false,
                        password: false
                    },
                    errorMessage: err.responseJSON ? err.responseJSON.error : err
                })
                console.error(err)
            })

    }

    render() {
        return (
            <Container>
                <Columns className="is-vcentered" style={{ height: 'calc(100vh - 3.25rem)', display: 'flex' }}>
                    <Columns.Column>
                        <Card style={{ maxWidth: '450px', margin: '0 auto' }}>
                            <Card.Header>
                                <Card.Header.Title>Connectez vous à Sonate !</Card.Header.Title>
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
                                                onKeyPress={e => { if (e.key === 'Enter') this.login(); }}
                                                disabled={false}
                                                ref={(input) => { this.usernameInput = input }}
                                            />
                                            <Icon align="left"><FontAwesomeIcon icon="user" /></Icon>
                                        </Control>
                                        <Help color="danger"></Help>
                                    </Field>

                                    <Field>
                                        <Control iconLeft>
                                            <input
                                                className={`input ${!this.state.loginValid.password ? 'is-danger' : ''}`}
                                                type="password"
                                                placeholder="Mot de passe"
                                                onChange={(e) => this.setState({ data: { ...this.state.data, password: e.target.value } })}
                                                value={this.state.data.password}
                                                onKeyPress={e => { if (e.key === 'Enter') this.login(); }}
                                                disabled={false}
                                                ref={(input) => { this.passwordInput = input }}
                                            />
                                            <Icon align="left"><FontAwesomeIcon icon="key" /></Icon>
                                        </Control>
                                        <Help color="danger">{this.state.errorMessage}</Help>
                                    </Field>
                                    <Columns>
                                        <Columns.Column style={{ paddingBottom: 0 }}>
                                            <Button
                                                color="primary"
                                                className="is-fullwidth"
                                                onClick={this.login.bind(this)}
                                            >
                                                {/* <FontAwesomeIcon icon="sign-in-alt" style={{ marginRight: '5px' }} /> */}
                                                Se connecter
                                            </Button>
                                        </Columns.Column>
                                        <Columns.Column >
                                            <Button
                                                color="primary"
                                                className="is-fullwidth"
                                                onClick={() => history.push('/register')}
                                            >
                                                {/* <FontAwesomeIcon icon="sign-in-alt" style={{ marginRight: '5px' }} /> */}
                                                S'inscrire
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