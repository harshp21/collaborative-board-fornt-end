import React, { Component } from 'react';
import { Board } from '../board/board.component';
import './board-container.css';

class BoardContainer extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            < div className="container" >
                <Board></Board>
            </div >
        )
    }
}

export { BoardContainer };