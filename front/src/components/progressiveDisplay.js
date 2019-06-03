import React, { Component } from 'react'

export default class ProgressiveDisplay extends Component {
    constructor(props) {
        super(props)
        this.state = {
            lyricsDisplay: '',
        }
        this.timeOut = null
    }

    componentDidMount() {
        this.showText(this.props.lyrics, 0, 80)
    }

    componentDidUpdate(prevProps) {
        if (prevProps.lyrics !== this.props.lyrics) {
            console.log("coucou")
            this.showText(this.props.lyrics, 0, 80)
        }
        if (prevProps.stop !== this.props.stop) {
            clearTimeout(this.timeOut)
            this.setState({
                lyricsDisplay: this.props.lyrics
            })
        }
    }

    componentWillUnmount() {
        clearTimeout(this.timeOut)
    }

    //Progressively displays the text
    showText(message, index, interval) {
        if (index < message.length) {
            if (message[index] === "<" && message[index + 1] === "b" && message[index + 2] === "r" && message[index + 3] === ">") {
                this.setState({ lyricsDisplay: this.state.lyricsDisplay + "<br>" })
                index += 4
            } else {
                this.setState({ lyricsDisplay: this.state.lyricsDisplay + message[index++] })
            }
            if (index >= message.length * 0.66) {
                this.props.displayHints([true, true])
            } else if (index >= message.length * 0.33) {
                this.props.displayHints([true, false])
            }
            this.timeOut = setTimeout(() => { this.showText(message, index, interval); }, interval)
        }
    }

    render() {
        return (
            <p dangerouslySetInnerHTML={{ __html: this.state.lyricsDisplay }} />
        )
    }
}