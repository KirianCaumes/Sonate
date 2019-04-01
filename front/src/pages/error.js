import React, { Component } from 'react';
import '../App.css';
import 'react-bulma-components/dist/react-bulma-components.min.css'
import { Columns, Button } from 'react-bulma-components'
import Card from 'react-bulma-components/lib/components/card';
import Container from 'react-bulma-components/lib/components/container';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import Image from 'react-bulma-components/lib/components/image'
// import logo from '../static/music_notes.png'

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
