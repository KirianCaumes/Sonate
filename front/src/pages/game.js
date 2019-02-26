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
import Modal from 'react-bulma-components/lib/components/modal';
import Section from 'react-bulma-components/lib/components/section';

import DATAS from "../datas/modes.json"
import Request from "../helpers/request"
import Similarity from "../helpers/similarity"

class Game extends Component {
    settings = DATAS.find(x => x.name == this.props.match.params.modeId)
    constructor(props) {
        super(props)
        // if (!this.props.location.title && !this.props.location.artist && !this.props.location.album && !this.props.location.yearAlbum) this.props.history.goBack()
        this.state = {
            song: {
                url: null,
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
            showAnswer: false,
            disableAnswer: false,
            timeOutAnswer: {
                title: null,
                artist: null
            },
            error: false
        }
    }
    componentDidMount() {
        this.getSong()
    }

    componentWillUnmount() {
        clearTimeout(this.state.timeOut)
        clearTimeout(this.state.timeOutAnswer.title)
        clearTimeout(this.state.timeOutAnswer.artist)
    }

    getSong() {
        clearTimeout(this.state.timeOut)
        this.setState({
            song: { url: null, lyricsTranslated: null, lyrics: null, title: null, artist: null, albums: [] },
            lyricsDisplay: "",
            loading: true,
            timeOut: null,
            answer: { title: "", artist: "" },
            answerValid: { title: false, artist: false },
            showAnswer: false,
            disableAnswer: false
        })
        if (!this.settings.infosGame.album) this.setState({ art: null })

        let getParameters = Request.toQueryData({
            song: this.props.location.title || "",
            band: this.props.location.artist || "in flames",
            album: this.props.location.album || "",
            year: this.props.location.yearAlbum || ""
        })

        Request.send('GET', ['song', this.settings.api, getParameters], undefined,
            (data) => {
                this.setState({
                    song: {
                        url: data.url,
                        lyricsTranslated: data.lyricsTranslated ? data.lyricsTranslated.replace(/\n/g, "<br>") : data.lyricsTranslated,
                        lyrics: data.lyricsTranslated ? data.lyrics.replace(/\n/g, "<br>") : data.lyricsTranslated,
                        title: data.title,
                        artist: data.artist,
                        albums: data.albums
                    },
                    loading: false
                })
                if (this.state.song.lyricsTranslated) {
                    this.showText(this.state.song.lyricsTranslated, 0, 80)
                    if (this.state.song.albums.length) {
                        let getParametersArt = Request.toQueryData({
                            band: this.props.location.artist || this.state.song.artist,
                            album: this.props.location.album || this.state.song.albums[0].name,
                            year: this.props.location.yearAlbum || this.state.song.albums[0].year
                        })
                        Request.send('GET', ['getArt', getParametersArt], undefined, (data) => { this.setState({ art: data.artUrl }) })
                    }
                }
            },
            () => {
                this.setState({ loading: false, error: true })
            }
        );

    }

    showText(message, index, interval) {
        if (index < message.length) {
            if (message[index] === "<" && message[index + 1] === "b" && message[index + 2] === "r" && message[index + 3] === ">") {
                this.setState({ lyricsDisplay: this.state.lyricsDisplay + "<br>" })
                index += 4
            } else {
                this.setState({ lyricsDisplay: this.state.lyricsDisplay + message[index++] })
            }
            this.setState({ timeOut: setTimeout(() => { this.showText(message, index, interval); }, interval) })
        }
    }

    check() {
        console.log("lol")
        this.state.answerValid.artist = !this.settings.inputGame.artist || Similarity.isOk(this.state.answer.artist, this.state.song.artist)
        this.state.answerValid.title = !this.settings.inputGame.title || Similarity.isOk(this.state.answer.title, this.state.song.title)
        if (this.state.answerValid.artist && this.state.answerValid.title) {
            this.setState({ showAnswer: true, disableAnswer: true })
        } else {

        }
    }

    showAnswer() {
        if (!this.state.showAnswer) this.setState({ showAnswer: !this.state.showAnswer, disableAnswer: true })
    }

    render() {
        return (
            <Container>

                
                <Modal show={this.state.error}>
                    <Modal.Card>
                        <Modal.Card.Head showClose={false}>
                            <Modal.Card.Title>Erreur</Modal.Card.Title>
                        </Modal.Card.Head>
                        <Modal.Card.Body>
                            <p>La chanson n'à pas été trouvée.</p>
                        </Modal.Card.Body>
                        <Modal.Card.Foot>
                            <Button
                                onClick={() => { window.history.back() }}
                                color="primary"
                            >
                                <FontAwesomeIcon icon="eye" style={{ marginRight: '5px' }} />
                                Retour
                            </Button>
                            <Button
                                onClick={() => { this.setState({ error: false }); this.getSong() }}
                                color="primary"
                            >
                                <FontAwesomeIcon icon="eye" style={{ marginRight: '5px' }} />
                                Réessayer
                            </Button>
                        </Modal.Card.Foot>
                    </Modal.Card>
                </Modal>


                <Columns>
                    <Columns.Column>
                        <Card>
                            <Card.Header>
                                <Card.Header.Title>Paroles de la chanson</Card.Header.Title>
                            </Card.Header>
                            <Card.Content>
                                <Content>
                                    {
                                        this.state.loading
                                            ?
                                            <Loader style={{ width: 50, height: 50, margin: '0 auto' }} />
                                            :
                                            <p dangerouslySetInnerHTML={{ __html: this.state.lyricsDisplay  }} />
                                    }
                                </Content>
                            </Card.Content>
                        </Card>
                    </Columns.Column>
                    <Columns.Column>
                        <Card>
                            <Card.Header>
                                <Card.Header.Title>Temps restant</Card.Header.Title>
                            </Card.Header>
                            <Card.Content>
                                <Content>
                                    <p>00:00:00</p>
                                </Content>
                            </Card.Content>
                        </Card>
                        <Card>
                            <Card.Header>
                                <Card.Header.Title>Votre réponse</Card.Header.Title>
                            </Card.Header>
                            <Card.Content>
                                <Content style={{ marginBottom: '.75rem' }}>
                                    <Columns>
                                        {
                                            this.settings.inputGame.artist ?
                                                <Columns.Column>
                                                    <Field>
                                                        <Label>Groupe</Label>
                                                        <Control iconLeft iconRight>
                                                            <Input
                                                                type="text"
                                                                placeholder="Groupe"
                                                                onChange={(e) => {
                                                                    this.setState({ answer: { artist: e.target.value, title: this.state.answer.title } })
                                                                    clearInterval(this.state.timeOutAnswer.artist)
                                                                    this.state.timeOutAnswer.artist = setTimeout(() => { this.check() }, 500)
                                                                }}
                                                                onKeyPress={e => { if (e.key == 'Enter') this.check(); }}
                                                                value={this.state.answer.artist}
                                                                disabled={this.state.loading || this.state.answerValid.artist || this.state.disableAnswer}
                                                                color={this.state.answerValid.artist ? "success" : ''}
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
                                                :
                                                ''
                                        }
                                        {
                                            this.settings.inputGame.title ?
                                                <Columns.Column>
                                                    <Field>
                                                        <Label>Titre</Label>
                                                        <Control iconLeft iconRight>
                                                            <Input
                                                                type="text"
                                                                placeholder="Titre"
                                                                onChange={(e) => {
                                                                    this.setState({ answer: { title: e.target.value, artist: this.state.answer.artist } })
                                                                    clearInterval(this.state.timeOutAnswer.title)
                                                                    this.state.timeOutAnswer.title = setTimeout(() => { this.check() }, 500)
                                                                }}
                                                                onKeyPress={e => { if (e.key == 'Enter') this.check(); }}
                                                                value={this.state.answer.title}
                                                                disabled={this.state.loading || this.state.answerValid.title || this.state.disableAnswer}
                                                                color={this.state.answerValid.title ? "success" : ''}
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
                                                :
                                                ''
                                        }
                                    </Columns>
                                </Content>
                                <Columns>
                                    {
                                        this.settings.name != "byname" ?
                                            <Columns.Column>
                                                <Button className="is-fullwidth" onClick={this.getSong.bind(this)} color={`primary ${this.state.loading ? 'is-loading' : ''}`}>
                                                    <FontAwesomeIcon icon="redo-alt" style={{ marginRight: '5px' }} />
                                                    Recommencer
                                                    </Button>
                                            </Columns.Column>
                                            :
                                            ''
                                    }
                                    <Columns.Column>
                                        <Button className="is-fullwidth" onClick={this.showAnswer.bind(this)} color="primary" disabled={this.state.loading || this.state.disableAnswer}>
                                            <FontAwesomeIcon icon="eye" style={{ marginRight: '5px' }} />
                                            Réponse
                                        </Button>
                                    </Columns.Column>
                                </Columns>
                            </Card.Content>
                        </Card>
                        <Card>
                            <Card.Content>
                                <Media>

                                    <Media.Item position="left">
                                        <a href={this.settings.infosGame.album || this.state.showAnswer ? this.state.song.url : null} target="_blank">
                                            <Image
                                                size={128}
                                                src={this.settings.infosGame.album || this.state.showAnswer ? this.state.art : null}
                                                style={{ background: 'rgba(0,0,0,0.15)', boxShadow: '0 2px 3px rgba(10, 10, 10, 0.1), 0 0 0 1px rgba(10, 10, 10, 0.1)', overflow: 'hidden' }}
                                            />
                                        </a>
                                    </Media.Item>
                                    <Media.Item>
                                        <Heading size={4} style={{ textTransform: 'uppercase' }}>
                                            {this.settings.infosGame.artist || this.state.showAnswer ? this.state.song.artist || this.props.location.artist || '?' : '?'}
                                        </Heading>
                                        <Heading subtitle size={5} style={{ textTransform: 'capitalize' }}>
                                            {this.settings.infosGame.title || this.state.showAnswer ? this.state.song.title : '?'}
                                        </Heading>
                                        <Heading subtitle size={6} style={{ textTransform: 'capitalize' }}>
                                            {this.settings.infosGame.album ?
                                                this.props.location.album + " - " + this.props.location.yearAlbum
                                                :
                                                this.state.showAnswer && this.state.song.albums.length ?
                                                    this.state.song.albums.map((album) => <span key={album.name}>{album.name} - {album.year}<br /></span>)
                                                    :
                                                    '?'
                                            }
                                        </Heading>
                                    </Media.Item>
                                </Media>
                            </Card.Content>
                        </Card>
                    </Columns.Column>
                </Columns>



            </Container >
        );
    }
}

export default Game;
