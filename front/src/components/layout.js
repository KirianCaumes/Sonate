import React, { Component } from 'react'
import Header from './header'

export default class Layout extends Component {
    render() {
        return (
            <div id={this.props.init ? 'content' : null}>
                <Header />
                {this.props.children}
            </div>
        )
    }
}