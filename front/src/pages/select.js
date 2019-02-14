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
import Game from './game';

import { BrowserRouter as Router, Route, Link } from "react-router-dom"

export default class SelectMode extends Component {
    constructor(props) {
        super(props)
        this.state = {
            pick: ""
        }
    }

    componentDidMount() {

    }

    render() {
        return (
            <div>
                <Container>
                    <div className="content">
                        <h1>{this.props.location.title}</h1>
                        <Field className="field has-addons">
                            <Control>
                                <Input
                                    type="text"
                                    placeholder=""
                                    onChange={(e) => this.setState({ pick: e.target.value })}
                                    value={this.state.pick}
                                />
                            </Control>
                            <Control>
                                <Link
                                    to={{
                                        pathname: '/game',
                                        value: this.state.pick,
                                        url: this.props.location.url
                                    }}
                                >
                                    <Button color="primary">GO</Button>
                                </Link>
                            </Control>
                        </Field>
                    </div>
                </Container>
            </div>
        );
    }
}
