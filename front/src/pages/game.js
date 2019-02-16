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
            answer: ""
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
            timeOut: null
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
                that.showText(that.state.song.lyricsTranslated, 0, 80)
                that.getArt()
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
        console.log(this.state.answer)
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
                                        <Field className="field has-addons">
                                            <Control>
                                                <Input
                                                    type="text"
                                                    placeholder="Artiste et Titre"
                                                    onChange={(e) => this.setState({ answer: e.target.value })}
                                                    value={this.state.answer}
                                                />
                                            </Control>
                                            <Control>
                                                <Button color="primary" onClick={this.check.bind(this)}>Check</Button>
                                            </Control>
                                        </Field>
                                    </Content>
                                </Card.Content>
                            </Card>

                            <Card>
                                <Card.Content>
                                    <Media>
                                        <Media.Item renderAs="figure" position="left">
                                            <Image renderAs="p" size={128} src={this.state.art} style={{ background: 'rgba(0,0,0,0.15)', boxShadow: '0 2px 3px rgba(10, 10, 10, 0.1), 0 0 0 1px rgba(10, 10, 10, 0.1)' }} />
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

                            <Card>
                                <Card.Content>
                                    <Content>
                                        <Button onClick={this.getSong.bind(this)} color={`primary ${this.state.loading ? 'is-loading' : ''}`}>Restart</Button>
                                    </Content>
                                </Card.Content>
                            </Card>
                        </Columns.Column>
                    </Columns>



                </Container>
            </div>
        );
    }
}

export default Game;
