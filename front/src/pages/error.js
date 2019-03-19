import React, { Component } from 'react';
import '../App.css';
import { Link } from "react-router-dom"
import 'react-bulma-components/dist/react-bulma-components.min.css'
import { Columns, Button } from 'react-bulma-components'
import Card from 'react-bulma-components/lib/components/card';
import Container from 'react-bulma-components/lib/components/container';
import Content from 'react-bulma-components/lib/components/content';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import Image from 'react-bulma-components/lib/components/image'
// import logo from '../static/music_notes.png'

export default class Error extends Component {
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
                            <Card.Content >
                                <h1 className="title is-3 has-text-centered">Erreur 404</h1>
                                <Button
                                    onClick={() => { window.history.back() }}
                                    color="primary"
                                    style={{ margin: '0 auto',  display: 'block' }}
                                >
                                    <FontAwesomeIcon icon="chevron-left" style={{ marginRight: '5px' }} />
                                Retour
                                </Button>
                            </Card.Content>
                        </Card>
                    </Columns.Column>
                </Columns>
            </Container >
        );
    }
}
