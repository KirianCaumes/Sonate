import React, { Component } from 'react'

export default class Layout extends Component {
    render() {
        return (
            <div id={this.props.init ? 'content' : null}>
                {this.props.children}
            </div>
        )
    }
}