import * as React from "react";
import { Component, ClassAttributes } from "react";

const formattedSeconds = (sec: number) =>
    Math.floor(sec / 60) + ':' + ('0' + sec % 60).slice(-2);

// This file fixes the error messages to get it to work. 
interface StopwatchProps extends ClassAttributes<Stopwatch> {
    initialSeconds: number;
}
class Stopwatch extends Component<StopwatchProps, any> {
    incrementer: any
    laps: any[]
    constructor(props: StopwatchProps) {
        super(props);
        this.state = {
            secondsElapsed: props.initialSeconds,
            lastClearedIncrementer: null,
        }
        this.laps = [];
    }

    // The second issue was that the handleStartClick and the other functions were not bound to the component. 
    // There are two ways to fix this:
    // 1. Use arrow functions
    // 2. Bind the functions in the constructor via a format like this.handleStartClick = this.handleStartClick.bind(this);
    // Current industry standard for react component is recommended to use arrow functions for the methods.
    handleStartClick = () => {
        if (this.incrementer == null) {
            this.incrementer = setInterval(() =>
                this.setState({
                    secondsElapsed: this.state.secondsElapsed + 1,
                }), 1000);
                this.setState({});   
        }
    }
    handleStopClick = () => {
        clearInterval(this.incrementer);
        this.setState({
            lastClearedIncrementer: this.incrementer,
        });
    }
    handleResetClick = () => {
        clearInterval(this.incrementer);
        this.laps = [];
        this.setState({
            secondsElapsed: 0,
        });
    }
    handleLapClick = () => {
        this.laps = this.laps.concat([this.state.secondsElapsed]);
        this.forceUpdate();
    }
    handleDeleteClick = (index: number) => () => {
        this.laps.splice(index, 1);
        this.forceUpdate();
    }
    render() {
        const {
            secondsElapsed,
            lastClearedIncrementer,
        } = this.state;
        return (
            <div className="stopwatch">
                <h1 className="stopwatch-timer">{formattedSeconds(secondsElapsed)}</h1>
                {(secondsElapsed === 0 || this.incrementer === lastClearedIncrementer ? <button type="button" className="start-btn"
                    onClick={this.handleStartClick}>start</button>
                    : <button type="button" className="stop-btn"
                        onClick={this.handleStopClick}>stop</button>
                )}
                {(secondsElapsed !== 0 && this.incrementer !== lastClearedIncrementer ? <button type="button" onClick={this.handleLapClick}>lap</button> : null
                )}
                {(secondsElapsed !== 0 && this.incrementer === lastClearedIncrementer ? <button type="button" onClick={this.handleResetClick}>reset</button> : null
                )}
                <div className="stopwatch-laps">
                    {this.laps && this.laps.map((lap, i) =>
                        // The key is important to avoid react warnings.
                        <Lap index={i + 1} key={i} lap={lap} onDelete={this.handleDeleteClick(i)} />)} </div>
            </div>
        );
    }
}

// The third issue was that the onDelete function was not being passed the correct arguments. The correct way to do this is to make onDelete return void. This issue was highlighted in line 73 by the compiler.  
const Lap = (props: { index: number, lap: number, onDelete: () => void }) => (<div key={props.index} className="stopwatch-lap">
    <strong>{props.index}</strong>/ {formattedSeconds(props.lap)} <button onClick={props.onDelete} > X </button>
</div>
);


export default Stopwatch; 