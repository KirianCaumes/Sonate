import React, { Component } from 'react';
import './App.css';
import $ from 'jquery'

class App extends Component {
    constructor() {
        super()
        this.state = {
            lyrics: null,
            song: null,
            band: null,
            hasLoad: false
        }
    }
    componentDidMount() {
        $.ajax({
            crossDomain: true,
            url: "http://localhost:5000/api/getsong?search=come%20clarity",
            method: "GET",
            success: (x) => {
                console.log(x)
                this.setState({
                    lyricsTranslated: x.lyricsTranslated.replace(/\n/g, "<br>"),
                    lyrics: x.lyrics.replace(/\n/g, "<br>"),
                    song: x.song,
                    artist: x.artist,
                    hasLoad: true
                })
            },
            error: (x) => {}
        });
    }
    render() {
        return (
            <div className="App">
                {
                    this.state.hasLoad ?
                            <section>
                                <div className="column" id="column1">
                                    <div className="content">
                                        <h2>Lyrics traduits :</h2>
                                        <p id="lyrics" dangerouslySetInnerHTML={{ __html:  this.state.lyricsTranslated}} />
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
                                </div>
                            </section>
                        :
                        <h1>Chargement...</h1>
                }

            </div>
        );
    }
}

export default App;
