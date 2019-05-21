import React, { Component } from 'react'
import $ from 'jquery'
import { Columns, Loader, Button, Content, Card, Container, Image, Media, Heading, Icon, Modal } from 'react-bulma-components'
import { Field, Control, Label, Help } from 'react-bulma-components/lib/components/form'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import Timer from '../components/timer'
import Popover from '../components/popover'

import Request from "../helpers/request"
import Similarity from "../helpers/similarity"

export default class Game extends Component {
    constructor(props) {
        super(props)
        document.title = "Sonate ♪ Jeu"
        this.settings = window.constants.settings.find(x => x.name === this.props.match.params.modeId)
        this.country = window.constants.country
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
            answerWrong: {
                title: false,
                artist: false
            },
            showAnswer: false,
            disableAnswer: false,
            timeOutAnswer: {
                title: null,
                artist: null
            },
            error: false,
            errorMessage: "",
            time: this.props.location.time || "00:59:59",
            songs: this.props.location.songs || 999,
            hints: {
                country: null,
                flag: null,
                band: null,
                styles: [],
                members: [],
                labels: []
            },
            hintsContent: [],
            displayHints: [false, false],
            hasCheck: false
        }
    }
    componentDidMount() {
        if (this.settings) this.getSong()
    }

    componentWillUnmount() {
        clearTimeout(this.state.timeOut)
        clearTimeout(this.state.timeOutAnswer.title)
        clearTimeout(this.state.timeOutAnswer.artist)
    }

    getSong() {
        $("html, body").animate({ scrollTop: 0 }, 500);
        clearTimeout(this.state.timeOut)
        this.setState({
            song: { url: null, lyricsTranslated: null, lyrics: null, title: null, artist: null, albums: [] },
            lyricsDisplay: "",
            loading: true,
            timeOut: null,
            answer: { title: "", artist: "" },
            answerValid: { title: false, artist: false },
            showAnswer: false,
            disableAnswer: false,
            hintsContent: []
        })
        if (!this.settings.infosGame.album) this.setState({ art: null })

        let getParameters = {
            song: this.props.location.title || "",
            band: this.props.location.artist || "in flames",
            album: this.props.location.album || "",
            year: this.props.location.yearAlbum || "",
            lang: this.props.location.lang || "fr",
        }

        Request.send('GET', ['song', this.settings.api], getParameters,
            (data) => {
                if (data.lyrics === "♪" && this.settings.name !== "nom") {
                    this.getSong()
                } else {
                    this.setState({
                        song: {
                            url: data.url,
                            lyricsTranslated: data.lyricsTranslated ? data.lyricsTranslated.replace(/\n/g, "<br>") : data.lyricsTranslated,
                            lyrics: data.lyrics ? data.lyrics.replace(/\n/g, "<br>") : data.lyrics,
                            title: data.title,
                            artist: data.artist,
                            albums: data.albums
                        },
                        loading: false,
                        displayHints: [false, false]
                    })
                    if (this.state.song.lyricsTranslated && data.lyrics !== "♪") {

                        this.showText(this.state.song.lyricsTranslated, 0, 80)
                        this.bandInput ? this.bandInput.focus() : this.titleInput.focus()

                        let getParametersArt = {
                            band: this.props.location.artist || this.state.song.artist,
                            album: this.props.location.album || this.state.song.albums.length ? this.state.song.albums[0].name : null,
                            year: this.props.location.yearAlbum || this.state.song.albums.length ? this.state.song.albums[0].year : null
                        }

                        Request.send('GET', ['song', 'art'], getParametersArt, (data) => this.setState({ art: data.artUrl }))
                            .always(data => {
                                let getParameterClues = { band: this.props.location.artist || this.state.song.artist }
                                Request.send('GET', ['song', 'clues'], getParameterClues,
                                    (data) => {
                                        this.generateHints({
                                            country:
                                                data.country && this.country.find(x => x.en === data.country.toLowerCase())
                                                    ?
                                                    this.country.find(x => x.en === data.country.toLowerCase()).fr
                                                    :
                                                    null,
                                            flag: data.flag || null,
                                            band: data.band || null,
                                            styles: data.styles || [],
                                            members: data.members || [],
                                            labels: data.labels || []
                                        })
                                    }
                                )
                            })
                    } else {
                        this.setState({
                            lyricsDisplay: "<i>♪ Cette chanson ne contient pas de paroles ♪</i>"
                        })
                    }
                }
            },
            (e) => {
                this.setState({ loading: false, error: true, errorMessage: e.responseJSON ? e.responseJSON.error : "La connexion à l'API à été perdue" })
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
            if (index >= message.length * 0.66) {
                this.setState({ displayHints: [true, true] })
            } else if (index >= message.length * 0.33) {
                this.setState({ displayHints: [true, false] })
            }
            this.setState({ timeOut: setTimeout(() => { this.showText(message, index, interval); }, interval) })
        }
    }

    check() {
        let artist = !this.settings.inputGame.artist || Similarity.isOk(this.state.answer.artist, this.state.song.artist)
        let title = !this.settings.inputGame.title || Similarity.isOk(this.state.answer.title, this.state.song.title)
        this.setState({ answerValid: { artist: artist, title: title } })
        if (artist && this.bandInput) this.bandInput.blur(); if (this.titleInput) this.titleInput.focus()
        if (title && this.titleInput) this.titleInput.blur()
        if (artist && title) {
            if ($(window).width() < '768') $("html, body").animate({ scrollTop: $(document).height() }, 1000);
            clearTimeout(this.state.timeOut)
            this.setState(
                {
                    showAnswer: true,
                    disableAnswer: true,
                    lyricsDisplay: this.state.song.lyricsTranslated,
                    songs: this.state.songs - 1,
                    gameOver: this.state.songs - 1 < 1
                }
            )
        } else {
            this.setState({ answerWrong: { artist: !artist, title: !title } })
        }
    }

    showAnswer() {
        if (!this.state.showAnswer) {
            if ($(window).width() < '768') $("html, body").animate({ scrollTop: $(document).height() }, 1000);
            clearTimeout(this.state.timeOut)
            this.setState(
                {
                    showAnswer: !this.state.showAnswer,
                    disableAnswer: true,
                    lyricsDisplay: this.state.song.lyricsTranslated
                }
            )
        }
    }

    generateHints(hints) {
        Object.keys(hints).forEach(key => (!hints[key] || !hints[key].length) && delete hints[key])
        let keys = Object.keys(hints)
        keys.push("letters", "art") // add clues not return by api
        keys.splice(keys.indexOf("flag"), 1) // delete useless clue (same as 'country')
        keys = keys.filter(key => this.settings.hint[key])
        if (!this.state.art) keys.splice(keys.indexOf("art"), 1)
        let hintsContent = []
        for (let i = 0; i < 2; i++) {
            let key = keys[Math.floor(Math.random() * keys.length)]
            let content, title
            switch (key) {
                case "country":
                    title = "Pays d'origine :"
                    content = <p style={{ display: 'flex', justifyContent: 'center' }}><img style={{ width: '30px' }} src={hints.flag || require('../static/flag.png')} alt="flag" />&nbsp;&nbsp;{hints.country}</p>
                    keys.splice(keys.indexOf('country'), 1)
                    keys.splice(keys.indexOf('flag'), 1)
                    break
                case "band":
                    title = "Photo du groupe/artiste :"
                    content = <p><img src={hints.band || ""} alt="band" /></p>
                    keys.splice(keys.indexOf('band'), 1)
                    break
                case "styles":
                    title = "Styles musicaux :"
                    content = <p>{hints.styles.join(' / ')}</p>
                    keys.splice(keys.indexOf('styles'), 1)
                    break
                case "members":
                    title = "Membres actifs :"
                    content = <p>{hints.members.join(' / ')}</p>
                    keys.splice(keys.indexOf('members'), 1)
                    break
                case "labels":
                    title = "Labels discographique :"
                    content = <p>{hints.labels.join(' / ')}</p>
                    keys.splice(keys.indexOf('labels'), 1)
                    break
                case "letters":
                    title = "Titre de la chanson :"
                    let temp = this.state.song.title
                    content = <p>{temp.split(' ').map(x => x.substring(0, 1) + x.replace(/[a-zA-Z]/g, '_').substring(1).substring(0, x.length - 1)).join(' ')}</p>
                    keys.splice(keys.indexOf('letters'), 1)
                    break
                case "art":
                    let transform = ["scaleX(-1)", "rotate(90deg)", "rotate(180deg)", "rotate(-90deg)"]
                    transform = transform[Math.floor(Math.random() * transform.length)]
                    title = "Pochette de l'album :"
                    content = <div style={{ overflow: 'hidden', width: '128px', margin: '0 auto', boxShadow: '0 2px 3px rgba(10, 10, 10, 0.1), 0 0 0 1px rgba(10, 10, 10, 0.1)', transform: transform }}>{this.state.test}<Image size={128} src={this.state.art} style={{ background: 'rgba(0,0,0,0.15)', overflow: 'hidden', margin: '0 auto', filter: 'blur(10px)' }} /></div>
                    keys.splice(keys.indexOf('art'), 1)
                    break
                default:
                    title = "Aucun autre indice disponible 🤷"
                    content = ""
                    break
            }
            hintsContent[i] = <div><h6 className="title is-6" style={{ marginBottom: content ? '.5em' : '0' }}>{title}</h6>{content}</div>
        }
        this.setState({ hintsContent: hintsContent })
    }

    render() {
        return (
            <Container>

                <Modal show={this.state.error} onClose={() => null}>
                    <Modal.Card>
                        <Modal.Card.Head showClose={false}>
                            <Modal.Card.Title>
                                <FontAwesomeIcon icon="exclamation-triangle" style={{ marginRight: '5px' }} />
                                Erreur
                            </Modal.Card.Title>
                        </Modal.Card.Head>
                        <Modal.Card.Body>
                            <p>Un problème est survenu : <br /><b>{this.state.errorMessage}</b></p>
                        </Modal.Card.Body>
                        <Modal.Card.Foot>
                            <Button
                                onClick={() => { window.history.back() }}
                                color="primary"
                            >
                                <FontAwesomeIcon icon="chevron-left" style={{ marginRight: '5px' }} />
                                Retour
                            </Button>
                            <Button
                                onClick={() => { this.setState({ error: false }); this.getSong() }}
                                color="primary"
                            >
                                <FontAwesomeIcon icon="redo-alt" style={{ marginRight: '5px' }} />
                                Réessayer
                            </Button>
                        </Modal.Card.Foot>
                    </Modal.Card>
                </Modal>

                <div style={{ position: 'relative' }}>
                    <Popover
                        title={<FontAwesomeIcon icon="lightbulb" />}
                        pos="left"
                        show={this.state.hintsContent.length && this.state.displayHints[0]}
                        style={{ top: 'calc(50% - 20px)' }}
                    >
                        {this.state.hintsContent[0]}
                    </Popover>

                    <Popover
                        title={<FontAwesomeIcon icon="lightbulb" />}
                        pos="left"
                        show={this.state.hintsContent.length && this.state.displayHints[1]}
                        style={{ top: 'calc(50% + 20px)' }}
                    >
                        {this.state.hintsContent[1]}
                    </Popover>
                </div>


                <Columns>
                    <Columns.Column>
                        <Card className="lyrics">
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
                                            <p dangerouslySetInnerHTML={{ __html: this.state.lyricsDisplay }} />
                                    }
                                </Content>
                            </Card.Content>
                        </Card>
                    </Columns.Column>
                    <Columns.Column>
                        <Columns className="infos">
                            {
                                this.settings && this.settings.inputsOptions.time ?
                                    <Columns.Column>
                                        <Card style={{ marginBottom: '-12.5px' }}>
                                            <Card.Header>
                                                <Card.Header.Title>Temps restant</Card.Header.Title>
                                            </Card.Header>
                                            <Card.Content>
                                                <Content>
                                                    <p>
                                                        <FontAwesomeIcon icon="stopwatch" style={{ marginRight: '5px' }} />
                                                        <Timer
                                                            time={this.state.time}
                                                            play={!this.state.loading && !this.state.showAnswer}
                                                            onDone={() => {
                                                                clearTimeout(this.state.timeOut)
                                                                this.setState({ showAnswer: true, gameOver: true, disableAnswer: true, lyricsDisplay: this.state.song.lyricsTranslated })
                                                            }}
                                                        />
                                                    </p>
                                                </Content>
                                            </Card.Content>
                                        </Card>
                                    </Columns.Column>
                                    : ''
                            }
                            {
                                this.settings && this.settings.inputsOptions.songs ?
                                    <Columns.Column>
                                        <Card style={{ marginBottom: '-12.5px' }}>
                                            <Card.Header>
                                                <Card.Header.Title>Chansons restantes</Card.Header.Title>
                                            </Card.Header>
                                            <Card.Content>
                                                <Content>
                                                    <p>
                                                        <FontAwesomeIcon icon="hand-paper" style={{ marginRight: '5px' }} />
                                                        {this.state.songs} / {this.props.location.songs || '∞'}
                                                    </p>
                                                </Content>
                                            </Card.Content>
                                        </Card>
                                    </Columns.Column>
                                    : ''
                            }

                        </Columns>
                        <Card className="inputs">
                            <Card.Header>
                                <Card.Header.Title>Votre réponse</Card.Header.Title>
                            </Card.Header>
                            <Card.Content>
                                <Content style={{ marginBottom: '.75rem' }}>
                                    <Columns>
                                        {
                                            this.settings && this.settings.inputGame.artist ?
                                                <Columns.Column>
                                                    <Field>
                                                        <Label>Groupe ou artiste</Label>
                                                        <Control iconLeft>
                                                            <input
                                                                className={`input ${this.state.answerValid.artist ? 'is-success' : this.state.answerWrong.artist ? 'is-danger' : ''}`}
                                                                type="text"
                                                                placeholder="Groupe ou artiste"
                                                                onChange={(e) => {
                                                                    this.setState({ answer: { artist: e.target.value, title: this.state.answer.title } })
                                                                    clearInterval(this.state.timeOutAnswer.artist)
                                                                    let temp = this.state.timeOutAnswer
                                                                    temp.artist = setTimeout(() => { this.check() }, 500)
                                                                    let temp2 = this.state.answerWrong
                                                                    temp2.artist = false
                                                                    this.setState({ timeOutAnswer: temp, answerWrong: temp2 })
                                                                }}
                                                                onKeyPress={e => { if (e.key === 'Enter') this.check(); clearInterval(this.state.timeOutAnswer.artist); }}
                                                                value={this.state.answer.artist}
                                                                disabled={this.state.loading || this.state.answerValid.artist || this.state.disableAnswer}
                                                                ref={(input) => { this.bandInput = input }}
                                                            />
                                                            <Icon align="left"><FontAwesomeIcon icon="users" /></Icon>
                                                        </Control>
                                                        <Help color="danger"></Help>
                                                    </Field>
                                                </Columns.Column>
                                                :
                                                ''
                                        }
                                        {
                                            this.settings && this.settings.inputGame.title ?
                                                <Columns.Column>
                                                    <Field>
                                                        <Label>Chanson</Label>
                                                        <Control iconLeft>
                                                            <input
                                                                className={`input ${this.state.answerValid.title ? 'is-success' : this.state.answerWrong.title ? 'is-danger' : ''}`}
                                                                type="text"
                                                                placeholder="Chanson"
                                                                onChange={(e) => {
                                                                    this.setState({ answer: { title: e.target.value, artist: this.state.answer.artist } })
                                                                    clearInterval(this.state.timeOutAnswer.title)
                                                                    let temp = this.state.timeOutAnswer
                                                                    temp.title = setTimeout(() => { this.check() }, 500)
                                                                    let temp2 = this.state.answerWrong
                                                                    temp2.title = false
                                                                    this.setState({ timeOutAnswer: temp, answerWrong: temp2 })
                                                                }}
                                                                onKeyPress={e => { if (e.key === 'Enter') this.check(); clearInterval(this.state.timeOutAnswer.title); }}
                                                                value={this.state.answer.title}
                                                                disabled={this.state.loading || this.state.answerValid.title || this.state.disableAnswer}
                                                                ref={(input) => { this.titleInput = input }}
                                                            />
                                                            <Icon align="left"><FontAwesomeIcon icon="compact-disc" /></Icon>
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
                                        this.settings && this.settings.name !== "nom" ?
                                            <Columns.Column>
                                                <Button
                                                    className={`is-fullwidth ${this.state.loading ? 'is-loading' : ''}`}
                                                    onClick={this.getSong.bind(this)}
                                                    color="primary"
                                                    disabled={this.state.gameOver}
                                                >
                                                    <FontAwesomeIcon icon="redo-alt" style={{ marginRight: '5px' }} />
                                                    <span>Suivante</span>
                                                </Button>
                                            </Columns.Column>
                                            :
                                            ''
                                    }
                                    <Columns.Column>
                                        <Button className="is-fullwidth" onClick={this.showAnswer.bind(this)} color="primary" disabled={this.state.loading || this.state.disableAnswer}>
                                            <FontAwesomeIcon icon="eye" style={{ marginRight: '5px' }} />
                                            <span>Réponse</span>
                                        </Button>
                                    </Columns.Column>
                                </Columns>
                            </Card.Content>
                        </Card>
                        <Card className="answer">
                            <Card.Content>
                                <Media>

                                    <Media.Item position="left">
                                        <a href={(this.settings && this.settings.infosGame.album) || this.state.showAnswer ? this.state.song.url : null} target="_blank" rel="noopener noreferrer">
                                            <Image
                                                size={128}
                                                src={(this.settings && this.settings.infosGame.album) || this.state.showAnswer ? this.state.art : null}
                                                style={{ background: 'rgba(0,0,0,0.15)', boxShadow: '0 2px 3px rgba(10, 10, 10, 0.1), 0 0 0 1px rgba(10, 10, 10, 0.1)', overflow: 'hidden' }}
                                            />
                                        </a>
                                    </Media.Item>
                                    <Media.Item>
                                        <Heading size={4} style={{ textTransform: 'uppercase' }}>
                                            {(this.settings && this.settings.infosGame.artist) || this.state.showAnswer ? this.state.song.artist || this.props.location.artist || '?' : '?'}
                                        </Heading>
                                        <Heading subtitle size={5} style={{ textTransform: 'capitalize' }}>
                                            {(this.settings && this.settings.infosGame.title) || this.state.showAnswer ? this.state.song.title : '?'}
                                        </Heading>
                                        <Heading subtitle size={6} style={{ textTransform: 'capitalize' }}>
                                            {this.settings && this.settings.infosGame.album ?
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