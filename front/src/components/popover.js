import React from 'react'
import 'bulma-popover/css/bulma-popver.min.css'
import { Button } from 'react-bulma-components'

export default class Popover extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            style: Object.assign(this.props.style || {}, { position: 'fixed', top: '50%', right: '1px', zIndex: 999, textAlign: 'center', visibility: this.props.show ? 'visible' : 'hidden' }),
            pos: this.props.pos,
            title: this.props.title,
            show: this.props.show || true
        }

    }

    componentWillUpdate(prevProps) {
        if (prevProps.show !== this.state.show) {
            this.setState({
                style: Object.assign({ position: 'fixed', top: '50%', right: '5px', zIndex: 999, textAlign: 'center', visibility: prevProps.show ? 'visible' : 'hidden' }, prevProps.style || {}),
                pos: prevProps.pos,
                title: prevProps.title,
                show: prevProps.show
            })
            if (prevProps.show && !this.state.show) {
                this.hintDiv.animate(
                    [
                        { transform: 'scale3d(0.8,0.8,1)' },
                        { transform: 'scale3d(1.1,1.1,1)' },
                        { transform: 'scale3d(1,1,1)' }
                    ],
                    {
                        duration: 200,
                        iterations: 1
                    }
                )
            }
        }
    }

    render() {
        return (
            <div className={`popover is-popover-${this.state.pos}`} style={this.state.style} ref={(div) => { this.hintDiv = div }}>
                <Button color="primary" className="is-fullwidth popover-trigger">{this.state.title}</Button>
                <div className="popover-content">
                    {this.props.children || <br />}
                </div>
            </div>
        )



    }
}