import React, { Component } from 'react';
import '../App.css';
import { Link } from "react-router-dom"
import 'react-bulma-components/dist/react-bulma-components.min.css'
import Content from 'react-bulma-components/lib/components/content';
import Card from 'react-bulma-components/lib/components/card';
import Container from 'react-bulma-components/lib/components/container';
import { Columns, Loader, Button } from 'react-bulma-components'

class Home extends Component {
    constructor() {
        super()
        this.state = {
            lyrics: null,
            song: null,
            band: null,
            hasLoad: false
        }
    }
    render() {
        return (
            <Container>
                <Columns>
                    <Columns.Column>
                        <Card>
                            <Card.Content>
                                <Content>
                                    <h1>Home sweet home</h1>
                                </Content>
                            </Card.Content>
                        </Card>
                    </Columns.Column>
                </Columns>
            </Container>
        );
    }
}

export default Home;
