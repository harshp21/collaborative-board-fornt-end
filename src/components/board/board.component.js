import React, { Component } from 'react';
import './board.css';
import io from 'socket.io-client';
import { BoardConfig } from '../board-config/board-config.component';

class Board extends Component {

    socket = io("http://localhost:5000", { transport: ['websocket'] });

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.drawOnCanvas();
        this.renderCanvas(localStorage.getItem('myCanvas'));
        this.socket.on('canvas-data', (data) => {
            this.renderCanvas(data);
        })
    }

    // render canvas
    renderCanvas = (data) => {
        let canvas = document.getElementById('board');
        let img = new Image;
        img.onload = function () {
            let ctx = canvas.getContext('2d');
            ctx.drawImage(img, 0, 0);
        }
        img.src = data;
    }

    // draw on canvas
    drawOnCanvas = () => {
        let canvas = document.getElementById('board');
        let sketch = document.getElementById('sketch');

        // getting context of canvas
        let ctx = canvas.getContext('2d');

        // computing width and height on basis of parent element
        let sketch_style = getComputedStyle(sketch);
        canvas.width = parseInt(sketch_style.getPropertyValue('width'));
        canvas.height = parseInt(sketch_style.getPropertyValue('height'));

        // initial values 
        let mouse = { x: 0, y: 0 };
        let last_mouse = { x: 0, y: 0 };
        ctx.lineWidth = 5;
        ctx.lineJoin = 'round';
        ctx.lineCap = 'round';
        ctx.strokeStyle = 'black';

        // Mouse Capturing last poition and current position 
        canvas.addEventListener('mousemove', function (e) {
            last_mouse.x = mouse.x;
            last_mouse.y = mouse.y;

            mouse.x = e.pageX - this.offsetLeft;
            mouse.y = e.pageY - this.offsetTop;
        }, false);

        // add a mousemove listener to paint on click of the mouse btn using mouse down
        canvas.addEventListener('mousedown', function (e) {
            canvas.addEventListener('mousemove', onPaint, false);
        }, false);

        // remove a mousemove listener to paint when the mouse btn is removed
        canvas.addEventListener('mouseup', function () {
            canvas.removeEventListener('mousemove', onPaint, false);
        }, false);


        // draw the line on basis of the co-ordinates calculated on mousemove event 
        let onPaint = () => {
            ctx.beginPath();
            ctx.moveTo(last_mouse.x, last_mouse.y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.closePath();
            ctx.stroke();

            // add the canvas and selected color in local storage to maintain state on refresh
            localStorage.setItem('myCanvas', canvas.toDataURL('image/png', 1));
            this.socket.emit('canvas-data', canvas.toDataURL('image/png', 1));
        };

    }

    clearBtnHandler = () => {
        let canvas = document.getElementById('board');
        localStorage.removeItem('myCanvas');
        const context = canvas.getContext('2d');
        context.clearRect(0, 0, canvas.width, canvas.height);
        this.socket.emit('canvas-data', canvas.toDataURL('image/png', 1));
    }

    colorChangeHandler = (event) => {
        document.getElementById('board').getContext('2d').strokeStyle = event.target.value;
    }


    render() {
        return (
            <>
                <BoardConfig clearBtnHandler={this.clearBtnHandler} colorChangeHandler={this.colorChangeHandler} />
                <div className="board-container">
                    <div className="sketch" id="sketch">
                        <canvas id="board"></canvas>
                    </div>
                </div>
            </>
        )
    }
}
export { Board };