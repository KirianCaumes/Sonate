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
import Content from 'react-bulma-components/lib/components/content';
import Card from 'react-bulma-components/lib/components/card';
import Container from 'react-bulma-components/lib/components/container';
import Image from 'react-bulma-components/lib/components/image';
import Media from 'react-bulma-components/lib/components/media';
import Heading from 'react-bulma-components/lib/components/heading';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Icon from 'react-bulma-components/lib/components/icon'


class Game extends Component {
    constructor(props) {
        super(props)
        this.state = {
            song: {
                lyricsTranslated: null,
                lyrics: null,
                title: null,
                artist: null,
                albums: []
            },
            art: null,
            lyricsDisplay: "",
            timeOut: null,
            loading: true,
            answer: {
                title: "",
                artist: ""
            },
            answerValid: {
                title: false,
                artist: false
            },
            showAnswer: false
        }
    }
    componentDidMount() {
        this.getSong()
    }

    componentWillUnmount() {
        clearTimeout(this.state.timeOut)
    }

    getArt() {
        if (this.state.song.albums.length) {
            let that = this
            $.ajax({
                crossDomain: true,
                url: "http://localhost:5000/api/getArt?band=" + encodeURI(this.state.song.artist).replace(/\&/g, "%26") + "&album=" + encodeURI(this.state.song.albums[0].name).replace(/\&/g, "%26") + "&year=" + encodeURI(this.state.song.albums[0].year).replace(/\&/g, "%26"),
                method: "GET",
                success: (x) => {
                    that.setState({
                        art: x.artUrl
                    })
                },
                error: (x) => { }
            });
        }
    }

    getSong() {
        clearTimeout(this.state.timeOut)
        this.setState({
            song: {
                lyricsTranslated: null,
                lyrics: null,
                title: null,
                artist: null,
                albums: []
            },
            art: null,
            lyricsDisplay: "",
            loading: true,
            timeOut: null,
            answer: {
                title: "",
                artist: ""
            },
            answerValid: {
                title: false,
                artist: false
            },
            showAnswer: false
        })
        let that = this
        $.ajax({
            crossDomain: true,
            url: this.props.location.url && this.props.location.value ? this.props.location.url + encodeURI(this.props.location.value) : "http://localhost:5000/api/song/byband?band=in%20flames",
            method: "GET",
            success: (x) => {
                that.setState({
                    song: {
                        lyricsTranslated: x.lyricsTranslated ? x.lyricsTranslated.replace(/\n/g, "<br>") : x.lyricsTranslated,
                        lyrics: x.lyricsTranslated ? x.lyrics.replace(/\n/g, "<br>") : x.lyricsTranslated,
                        title: x.title,
                        artist: x.artist,
                        albums: x.albums
                    },
                    loading: false
                })
                if (that.state.song.lyricsTranslated) {
                    that.showText(that.state.song.lyricsTranslated, 0, 80)
                    that.getArt()
                }
            },
            error: (x) => { }
        });
    }

    showText(message, index, interval) {
        if (index < message.length) {
            if (message[index] === "<" && message[index + 1] === "b" && message[index + 2] === "r" && message[index + 3] === ">") {
                this.setState({
                    lyricsDisplay: this.state.lyricsDisplay + "<br>"
                })
                index += 4;
            } else {
                this.setState({
                    lyricsDisplay: this.state.lyricsDisplay + message[index++]
                })
            }
            this.setState({ timeOut: setTimeout(() => { this.showText(message, index, interval); }, interval) })
        }
    }

    check() {
        this.state.answerValid.artist = this.similarity(this.state.answer.artist, this.state.song.artist) < 3
        this.state.answerValid.title = this.similarity(this.state.answer.title, this.state.song.title) < 3
        if (this.state.answerValid.artist && this.state.answerValid.title) {
            this.setState({ showAnswer: true })
        }
    }

    //Get similirity between two strings: Levenshtein distance
    similarity(s1, s2) {
        s1 = s1.toLowerCase();
        s2 = s2.toLowerCase();
        var costs = new Array();
        for (var i = 0; i <= s1.length; i++) {
            var lastValue = i;
            for (var j = 0; j <= s2.length; j++) {
                if (i == 0)
                    costs[j] = j;
                else {
                    if (j > 0) {
                        var newValue = costs[j - 1];
                        if (s1.charAt(i - 1) != s2.charAt(j - 1))
                            newValue = Math.min(Math.min(newValue, lastValue),
                                costs[j]) + 1;
                        costs[j - 1] = lastValue;
                        lastValue = newValue;
                    }
                }
            }
            if (i > 0)
                costs[s2.length] = lastValue;
        }
        return costs[s2.length];
    }

    showAnswer() {
        this.setState({ showAnswer: !this.state.showAnswer })
    }

    render() {
        return (
            <div>
                <Container>
                    <Columns>
                        <Columns.Column>
                            <Card>
                                <Card.Content>
                                    <Content>
                                        <h2>Paroles de la chanson</h2>
                                        {
                                            this.state.loading
                                                ?
                                                <Loader style={{ width: 50, height: 50, margin: '0 auto' }} />
                                                :
                                                <p dangerouslySetInnerHTML={{ __html: this.state.song.lyricsTranslated }} />
                                        }
                                    </Content>
                                </Card.Content>
                            </Card>
                        </Columns.Column>
                        <Columns.Column>
                            <Card>
                                <Card.Content>
                                    <Content>
                                        <h2>Temps restant</h2>
                                        <p>00:00:00</p>
                                    </Content>
                                </Card.Content>
                            </Card>

                            <Card>
                                <Card.Content>
                                    <Content>
                                        <h2>Votre réponse</h2>
                                        <Columns>
                                            <Columns.Column>
                                                <Field>
                                                    <Label>Groupe</Label>
                                                    <Control iconLeft iconRight>
                                                        <Input
                                                            type="text"
                                                            placeholder="Groupe"
                                                            onChange={(e) => this.setState({ answer: { artist: e.target.value, title: this.state.answer.title } })}
                                                            value={this.state.answer.artist}
                                                            disabled={this.state.loading || this.state.answerValid.artist}
                                                            color={this.state.answerValid.artist ? "success" : ''}
                                                            onKeyPress={(e) => e.key == 'Enter' ? this.check() : ''}
                                                        />
                                                        <Icon align="left">
                                                            <FontAwesomeIcon icon="users" />
                                                        </Icon>

                                                        <Icon align="right">
                                                            {this.state.answerValid.artist ? <FontAwesomeIcon icon="check" /> : ''}
                                                        </Icon>
                                                    </Control>
                                                    <Help color="danger"></Help>
                                                </Field>
                                            </Columns.Column>
                                            <Columns.Column>
                                                <Field>
                                                    <Label>Titre</Label>
                                                    <Control iconLeft iconRight>
                                                        <Input
                                                            type="text"
                                                            placeholder="Titre"
                                                            onChange={(e) => this.setState({ answer: { title: e.target.value, artist: this.state.answer.artist } })}
                                                            value={this.state.answer.title}
                                                            disabled={this.state.loading || this.state.answerValid.title}
                                                            color={this.state.answerValid.title ? "success" : ''}
                                                            onKeyPress={e => e.key == 'Enter' ? this.check() : ''}
                                                        />
                                                        <Icon align="left">
                                                            <FontAwesomeIcon icon="font" />
                                                        </Icon>
                                                        <Icon align="right">
                                                            {this.state.answerValid.title ? <FontAwesomeIcon icon="check" /> : ''}
                                                        </Icon>
                                                    </Control>
                                                    <Help color="danger"></Help>
                                                </Field>
                                            </Columns.Column>
                                        </Columns>

                                        <Button
                                            color="primary"
                                            onClick={this.check.bind(this)}
                                            disabled={this.state.loading}
                                            className="is-fullwidth"
                                        >
                                            <FontAwesomeIcon icon="plus" style={{ marginRight: '5px' }} />
                                            Check
                                        </Button>
                                    </Content>
                                </Card.Content>
                            </Card>

                            <Card>
                                <Card.Content>
                                    <Content>
                                        <Columns>
                                            <Columns.Column>
                                                <Button className="is-fullwidth" onClick={this.getSong.bind(this)} color={`primary ${this.state.loading ? 'is-loading' : ''}`}>
                                                    <FontAwesomeIcon icon="redo-alt" style={{ marginRight: '5px' }} />
                                                    Recommencer
                                        </Button>
                                            </Columns.Column>
                                            <Columns.Column>
                                                <Button className="is-fullwidth" onClick={this.showAnswer.bind(this)} color="primary" disabled={this.state.loading}>
                                                    <FontAwesomeIcon icon="eye" style={{ marginRight: '5px' }} />
                                                    Réponse
                                        </Button>
                                            </Columns.Column>
                                        </Columns>
                                    </Content>
                                </Card.Content>
                            </Card>

                            {
                                this.state.showAnswer
                                    ?
                                    <Card>
                                        <Card.Content>
                                            <Media>
                                                <Media.Item position="left">
                                                    <Image size={128} src={this.state.art} style={{ background: 'rgba(0,0,0,0.15)', boxShadow: '0 2px 3px rgba(10, 10, 10, 0.1), 0 0 0 1px rgba(10, 10, 10, 0.1)' }} />
                                                </Media.Item>
                                                <Media.Item>
                                                    <Heading size={4}>{this.state.song.artist}</Heading>
                                                    <Heading subtitle size={5}>{this.state.song.title}</Heading>
                                                    <Heading subtitle size={6}>
                                                        {this.state.song.albums.length ? this.state.song.albums.map((album) => <span key={album.name}>{album.name} - {album.year}<br /></span>) : ''}
                                                    </Heading>
                                                </Media.Item>
                                            </Media>
                                        </Card.Content>
                                    </Card>
                                    : ''
                            }


                        </Columns.Column>
                    </Columns>



                </Container>
            </div>
        );
    }
}

export default Game;
