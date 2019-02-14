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


class Game extends Component {
    constructor(props) {
        super(props)
        this.state = {
            lyrics: null,
            song: null,
            band: null,
            lyricsDisplay: "",
            timeOut: null,
            hasLoad: false,
            answer: ""
        }
    }
    componentDidMount() {
        console.log(this.props.location.value)
        this.getSong()
    }

    componentWillUnmount(){
        console.log("oui")
        clearTimeout(this.state.timeOut)
    }

    getSong() {
        clearTimeout(this.state.timeOut)
        this.setState({
            lyrics: null,
            song: null,
            band: null,
            lyricsDisplay: "",
            hasLoad: false,
            timeOut: null
        })
        let that = this
        console.log(this.props.location.url+encodeURI(this.props.location.value))
        $.ajax({
            crossDomain: true,
            url: this.props.location.url+encodeURI(this.props.location.value),
            method: "GET",
            success: (x) => {
                that.setState({
                    lyricsTranslated: x.lyricsTranslated.replace(/\n/g, "<br>"),
                    lyrics: x.lyrics.replace(/\n/g, "<br>"),
                    song: x.song,
                    artist: x.artist,
                    hasLoad: true
                })
                that.showText(that.state.lyricsTranslated, 0, 50)

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

    render() {
        return (
            <div>
                <Container>
                    <Card>
                    <div className="content">
                        <h2>Temps restant :</h2>
                        <p id="timer">00:00:00</p>
                    </div>
                    </Card>
                    <Card>
                        <div className="content">
                            <h2>Lyrics traduits :</h2>
                            {!this.state.hasLoad ? <Loader /> : ''}
                            <p dangerouslySetInnerHTML={{ __html: this.state.lyricsDisplay }} />
                        </div>
                    </Card>
                    <Card>
                    <div className="content" id="answerDiv">
                        <h2>Votre réponse</h2>
                        <div id="myInputs">
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
                                    <Button color="primary">»</Button>
                                </Control>
                            </Field>
                        </div>
                        <div id="points" style={{ display: 'none' }} />
                    </div>
                    </Card>
                    <Card>
                    <div className="">
                        <Button onClick={this.getSong.bind(this)} color="primary">Restart</Button>
                    </div>
                    </Card>

                </Container>
            </div>
        );
    }
}

export default Game;
