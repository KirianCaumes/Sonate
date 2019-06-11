import React, { Component } from 'react'
import $ from 'jquery'
import { Columns, Loader, Button, Content, Card, Container, Image, Media, Heading, Icon, Modal } from 'react-bulma-components'
import { Field, Control, Label, Help } from 'react-bulma-components/lib/components/form'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import Timer from '../components/timer'
import Popover from '../components/popover'

import Request from "../helpers/request"
import Similarity from "../helpers/similarity"
import Layout from '../components/layout';
import Clue from '../components/clue';
import ProgressiveDisplay from '../components/progressiveDisplay';

export default class Game extends Component {
    constructor(props) {
        super(props)
        document.title = "Sonate ♪ Jeu"
        this.settings = window.constants.settings.find(x => x.name === this.props.match.params.modeId)
        this.countries = window.constants.countries
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
            timeOutAnswer: {
                title: null,
                artist: null
            },
            error: false,
            errorMessage: "",
            time: this.props.location.time || "00:59:59",
            songs: this.props.location.songs || 999,
            hints: {
                country: {
                    name: null,
                    flag: null
                },
                band: null,
                styles: [],
                members: [],
                labels: [],
                letters: '',
                art: null
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
        clearTimeout(this.state.timeOutAnswer.title)
        clearTimeout(this.state.timeOutAnswer.artist)
    }

    //Main function : get a song, it's cover and it's clues
    getSong() {
        $("html, body").animate({ scrollTop: 0 }, 500);
        this.setState({
            song: { url: null, lyricsTranslated: null, lyrics: null, title: null, artist: null, albums: [] },
            loading: true,
            answer: { title: "", artist: "" },
            answerValid: { title: false, artist: false },
            answerWrong: { title: false, artist: false },
            showAnswer: false,
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
                                        this.setState({
                                            hints: {
                                                country: {
                                                    name: data.country && this.countries.find(x => x.en === data.country.toLowerCase()) ? this.countries.find(x => x.en === data.country.toLowerCase()).fr : null,
                                                    flag: data.flag || null
                                                },
                                                band: data.band || null,
                                                styles: data.styles || [],
                                                members: data.members || [],
                                                labels: data.labels || [],
                                                letters: this.state.song.title,
                                                art: this.state.art
                                            }
                                        }, () => this.generateHints())
                                    }
                                )
                            })
                    } else {
                        this.setState({
                            song: {
                                ...this.state.song,
                                lyricsTranslated: "<i>♪ Cette chanson ne contient pas de paroles ♪</i>"
                            }
                        })
                    }
                }
            },
            (e) => {
                this.setState({ loading: false, error: true, errorMessage: e.responseJSON ? e.responseJSON.error : "La connexion à l'API à été perdue" })
            }
        )

    }

    //Check user's answers
    check() {
        let artist = !this.settings.inputGame.artist || Similarity.isOk(this.state.answer.artist, this.state.song.artist)
        let title = !this.settings.inputGame.title || Similarity.isOk(this.state.answer.title, this.state.song.title)
        this.setState({ answerValid: { artist: artist, title: title } })
        if (artist && this.bandInput) this.bandInput.blur(); if (this.titleInput) this.titleInput.focus()
        if (title && this.titleInput) this.titleInput.blur()
        if (artist && title) {
            if ($(window).width() < '768') $("html, body").animate({ scrollTop: $(document).height() }, 1000);
            this.setState(
                {
                    showAnswer: true,
                    songs: this.state.songs - 1,
                    gameOver: this.state.songs - 1 < 1
                }
            )
        } else {
            this.setState({ answerWrong: { artist: !artist, title: !title } })
        }
    }

    //Show answer 
    showAnswer() {
        if (!this.state.showAnswer) {
            if ($(window).width() < '768') $("html, body").animate({ scrollTop: $(document).height() }, 1000);
            this.setState({ showAnswer: !this.state.showAnswer })
        }
    }

    //Generate unique ints
    generateHints() {
        Object.keys(this.state.hints).forEach(key => (!this.state.hints[key] || !this.state.hints[key].length) && delete this.state.hints[key]) //Delete key when empty value
        let keys = Object.keys(this.state.hints)
        keys = keys.filter(key => this.settings.hint[key]) //Filter by settings of the game
        if (!this.state.art) keys.splice(keys.indexOf("art"), 1)
        let hintsContent = []
        for (let i = 0; i < 2; i++) {
            let key = keys[Math.floor(Math.random() * keys.length)]
            hintsContent.push(key)
            keys.splice(keys.indexOf(key), 1)
        }
        this.setState({ hintsContent: hintsContent })
    }

    render() {
        return (
            <Layout>
                <Container>

                    <Modal show={this.state.error} onClose={() => { this.setState({ error: false }); this.getSong() }}>
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
                                    onClick={() => { this.setState({ error: false }); window.history.back() }}
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
                            <Clue type={this.state.hintsContent[0]} hints={this.state.hints} />
                        </Popover>

                        <Popover
                            title={<FontAwesomeIcon icon="lightbulb" />}
                            pos="left"
                            show={this.state.hintsContent.length && this.state.displayHints[1]}
                            style={{ top: 'calc(50% + 20px)' }}
                        >
                            <Clue type={this.state.hintsContent[1]} hints={this.state.hints} />
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
                                                <ProgressiveDisplay
                                                    lyrics={this.state.song.lyricsTranslated}
                                                    displayHints={(x) => this.setState({ displayHints: x })}
                                                    stop={this.state.showAnswer}
                                                />
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
                                                                won={this.state.songs === 0}
                                                                onDone={(time) => {
                                                                    this.setState({ showAnswer: true, gameOver: true })
                                                                    Request.send('POST', ['scores', 'history'],
                                                                        {
                                                                            level: this.props.match.params.modeId,
                                                                            time: time,
                                                                            songs: { found: this.state.songs, total: this.props.location.songs || '∞' }
                                                                        }
                                                                    )
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
                                                                    disabled={this.state.loading || this.state.answerValid.artist || this.state.showAnswer}
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
                                                                    disabled={this.state.loading || this.state.answerValid.title || this.state.showAnswer}
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
                                            <Button className="is-fullwidth" onClick={this.showAnswer.bind(this)} color="primary" disabled={this.state.loading || this.state.showAnswer}>
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
            </Layout>
        )
    }
}