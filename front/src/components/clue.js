import React, { Component } from 'react'
import { Image } from 'react-bulma-components'

export default class Clue extends Component {
    constructor(props) {
        super(props)
        this.state = {
            title: '',
            content: ''
        }
    }

    componentDidUpdate(prevProps) {
        if (prevProps.type !== this.props.type) {
            let hints = this.props.hints
            switch (this.props.type) {
                case "country":
                    this.setState({
                        title: "Pays d'origine :",
                        content: <p style={{ display: 'flex', justifyContent: 'center' }}><img style={{ width: '30px' }} src={hints.country.flag || require('../static/flag.png')} alt="flag" />&nbsp;&nbsp;{hints.country.name}</p>
                    })
                    break
                case "band":
                    this.setState({
                        title: "Photo du groupe/artiste :",
                        content: <p><img src={hints.band || ""} alt="band" /></p>
                    })
                    break
                case "styles":
                    this.setState({
                        title: "Styles musicaux :",
                        content: <p>{hints.styles.join(' / ')}</p>
                    })
                    break
                case "members":
                    this.setState({
                        title: "Membres actifs :",
                        content: <p>{hints.members.join(' / ')}</p>
                    })
                    break
                case "labels":
                    this.setState({
                        title: "Labels discographique :",
                        content: <p>{hints.labels.join(' / ')}</p>
                    })
                    break
                case "letters":
                    this.setState({
                        title: "Titre de la chanson :",
                        content: <p>{hints.letters.split(' ').map(x => x.substring(0, 1) + x.replace(/[a-zA-Z]/g, '_').substring(1).substring(0, x.length - 1)).join(' ')}</p>
                    })
                    break
                case "art":
                    let transform = ["scaleX(-1)", "rotate(90deg)", "rotate(180deg)", "rotate(-90deg)"]
                    transform = transform[Math.floor(Math.random() * transform.length)]
                    this.setState({
                        title: "Pochette de l'album :",
                        content: <div style={{ overflow: 'hidden', width: '128px', margin: '0 auto', boxShadow: '0 2px 3px rgba(10, 10, 10, 0.1), 0 0 0 1px rgba(10, 10, 10, 0.1)', transform: transform }}><Image size={128} src={hints.art} style={{ background: 'rgba(0,0,0,0.15)', overflow: 'hidden', margin: '0 auto', filter: 'blur(10px)' }} /></div>
                    })
                    break
                default:
                    this.setState({
                        title: "Aucun autre indice disponible 🤷",
                        content: ""
                    })
                    break
            }
        }
    }

    render() {
        return (
            <div>
                <h6 className="title is-6" style={{ marginBottom: this.state.content ? '.5em' : '0' }}>
                    {this.state.title}
                </h6>
                {this.state.content}
            </div>
        )
    }
}