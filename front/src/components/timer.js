import React from 'react';

export default class Timer extends React.Component {
    constructor(props) {
        super(props)
        let a = this.props.time.split(':')
        this.state = {
            timeRemaining: (+a[0]) * 60 * 60 + (+a[1]) * 60 + (+a[2]),
            isOn: this.props.play,
            timer: {
                sec: 0,
                min: 0
            },
            won: this.props.won
        }
        this.timerInterval = null
    }

    componentDidUpdate(prevProps) {
        if (prevProps.play !== this.state.isOn || prevProps.won !== this.state.won) {
            this.setState({
                isOn: prevProps.play,
                won: prevProps.won
            }, () => {
                if (prevProps.won) this.props.onDone(this.state.timeRemaining)
            })
        }
    }

    componentDidMount() {
        this.setState({
            timer: {
                sec: parseInt(this.state.timeRemaining % 60, 10),
                min: parseInt(this.state.timeRemaining / 60, 10)
            },
            timeRemaining: this.state.timeRemaining-1
        })
        this.timerInterval = setInterval(() => {
            if (this.state.isOn){
                this.setState({
                    timer: {
                        sec: parseInt(this.state.timeRemaining % 60, 10),
                        min: parseInt(this.state.timeRemaining / 60, 10)
                    },
                    timeRemaining: this.state.timeRemaining-1
                })
                if (this.state.timeRemaining < 0 ){
                    this.stopTimer()
                    this.props.onDone(0)
                }
            }        
        }, 1000);
    }

    componentWillUnmount(){
        clearInterval(this.timerInterval)
    }

    stopTimer() {
        this.setState({ isOn: false })
        clearInterval(this.timerInterval)
    }

    render() {
        return (
            <span>{ 
                (this.state.timer.min >= 10 ? this.state.timer.min : '0' + this.state.timer.min) + 
                ':' + 
                (this.state.timer.sec >= 10 ? this.state.timer.sec : '0' + this.state.timer.sec)
            }</span>
        )
    }
}