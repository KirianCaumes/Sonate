import React, { Component } from 'react'
import { Columns, Button, Container, Card } from 'react-bulma-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default class Error extends Component {
    render() {
        return (
            <Container>
                <Columns>
                    <Columns.Column>
                        <Card>
                            <Card.Content >
                                <h1 className="title is-3 has-text-centered">Erreur 404</h1>
                                <Button
                                    onClick={() => this.props.history.push('/')}
                                    color="primary"
                                    style={{ margin: '0 auto', display: 'block' }}
                                >
                                    <FontAwesomeIcon icon="home" style={{ marginRight: '5px' }} />
                                    Accueil
                                </Button>
                            </Card.Content>
                        </Card>
                    </Columns.Column>
                </Columns>
            </Container >
        );
    }
}
