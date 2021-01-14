import React, { Component } from 'react';
import './board-config.css';

class BoardConfig extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="board-config">
                <div className="clear-btn" onClick={this.props.clearBtnHandler}>
                    clear
                    </div>
                <div className="color-picker-container">
                    <input type="color" onChange={this.props.colorChangeHandler} />
                </div>
            </div>
        )
    }
}

export { BoardConfig }