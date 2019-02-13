import React, { Component } from 'react';
import '../App.css';
import $ from 'jquery'

class Game extends Component {
    constructor() {
        super()
        this.state = {
            lyrics: null,
            song: null,
            band: null,
            lyricsDisplay: "",
            timeOut: null,
            hasLoad: false
        }
    }
    componentDidMount() {
        this.getSong()
    }

    getSong(){
        clearTimeout(this.state.timeOut)
        this.setState({
            lyrics: null,
            song: null,
            band: null,
            lyricsDisplay: "",
            timeOut: null
        })
        let that = this
        $.ajax({
            crossDomain: true,
            url: "http://localhost:5000/api/song/byband/in%20flames",
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
            if (message[index] == "<" && message[index + 1] == "b" && message[index + 2] == "r" && message[index + 3] == ">") {
                this.setState({
                    lyricsDisplay: this.state.lyricsDisplay + "<br>"
                })
                index += 4;
            } else {
                this.setState({
                    lyricsDisplay: this.state.lyricsDisplay + message[index++]
                })
            }
            this.state.timeOut = setTimeout(()=>{ this.showText(message, index, interval); }, interval)
        }
    }

    render() {
        return (
            <div>
                {
                    this.state.hasLoad ?
                        <section>
                            <div className="column" id="column1">
                                <div className="content">
                                    <h2>Lyrics traduits :</h2>
                                    <p id="lyrics" dangerouslySetInnerHTML={{ __html: this.state.lyricsDisplay }} />
                                </div>
                            </div>
                            <div className="column" id="column2">
                                <div className="content">
                                    <h2>Temps restant :</h2>
                                    <p id="timer">00:00:00</p>
                                </div>
                                <div className="content" id="answerDiv">
                                    <h2>Votre réponse</h2>
                                    <div id="myInputs">
                                        <input id="answerInput" type="text" name="artEtTitre" placeholder="Artiste et Titre" />
                                        <button id="confirmButton" type="button">»</button>
                                    </div>
                                    <div id="points" style={{ display: 'none' }} />
                                </div>
                                <div className="">
                                    <button onClick={this.getSong.bind(this)}>Restart</button>
                                </div>
                            </div>
                        </section>
                        :
                        <h1>Chargement...</h1>
                }

            </div>
        );
    }
}

export default Game;
