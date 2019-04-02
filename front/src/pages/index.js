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

export default class Index extends Component {
    constructor(props){
        super(props)        
        document.title = "Sonate ♪ Accueil"
    }
    render() {
        return (
            <Container>
                <Columns>
                    <Columns.Column>
                        <Card>
                            <Card.Content >
                                {/* <Image src={logo} style={{ maxWidth: '350px', margin: '0 auto' }} /> */}
                                <h1 className="title is-3 has-text-centered">♪ Sonate ♪</h1>
                            </Card.Content>
                        </Card>
                        <Card>
                            {/* <Card.Header>
                                <Card.Header.Title>Choisissez un mode de jeu</Card.Header.Title>
                            </Card.Header> */}
                            <Card.Content>
                                <Content>
                                    <h2 className="title is-4"><FontAwesomeIcon style={{ marginRight: '5px' }} icon="compact-disc" />Chanson</h2>
                                    <Columns>
                                        <Columns.Column>
                                            <Link to={{ pathname: '/mode/nom' }} >
                                                <Button color="primary" className="is-fullwidth">Une chanson</Button>
                                            </Link>
                                        </Columns.Column>
                                    </Columns>

                                    <h2 className="title is-4"><FontAwesomeIcon style={{ marginRight: '5px' }} icon="users" />Groupe ou artiste</h2>
                                    <Columns>
                                        <Columns.Column>
                                            <Link to={{ pathname: '/mode/groupe' }} >
                                                <Button color="primary" className="is-fullwidth">Un groupe</Button>
                                            </Link>
                                        </Columns.Column>
                                        <Columns.Column>
                                            <Link to={{ pathname: '/mode/album' }} >
                                                <Button color="primary" className="is-fullwidth">Un groupe & un album</Button>
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
