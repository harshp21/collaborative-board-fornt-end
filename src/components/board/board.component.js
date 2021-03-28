import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import './board.css';
import io from 'socket.io-client';
import { BoardConfig } from '../board-config/board-config.component';
import rough from "roughjs/bundled/rough.esm";
import Partcipants from '../participants/Partcipants';

const Board = ({ roomName, username, userId }) => {

    const socketInstanceRef = useRef(null);
    const [elementType, setElementType] = useState('circle');
    const [elements, setElements] = useState([]);
    const [drawing, setDrawing] = useState(false);
    const [strokeColor, setStrokeColor] = useState('black');
    const [roomUsers, setRoomUsers] = useState([]);

    const generator = rough.generator();

    useEffect(() => {
        socketInstanceRef.current = initializeSocketConnection();
        initializeSocketEvents();
        initializeCanvas();

        return () => {
            socketInstanceRef.current.emit('leave-room');
            socketInstanceRef.current.disconnect();
        }
    }, []);

    useLayoutEffect(() => {
        const canvas = document.getElementById("board");

        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        const roughCanvas = rough.canvas(canvas);
        elements.length !== 0 && elements.forEach(({ roughElement }) => roughCanvas.draw(roughElement))

    }, [elements])

    const createElement = (x1, y1, x2, y2, type) => {
        switch (type) {
            case 'circle':
                return drawCircle(x1, y1, x2, y2);
            case 'rectangle':
                return drawRectangle(x1, y1, x2, y2);
            case 'line':
                return drawLine(x1, y1, x2, y2);
            case 'ellipse':
                return drawEllipse(x1, y1, x2, y2);
            default:
                return drawLine(x1, y1, x2, y2);
        }
    }

    const initializeSocketConnection = () => {
        return io.connect("http://localhost:5000");
    }

    const initializeSocketEvents = () => {
        socketInstanceRef.current.emit('join-room', { userId, username, roomName });
        socketInstanceRef.current.on('canvas-data', (room) => {
            renderCanvas(room.canvasElements);
        })
        socketInstanceRef.current.on('clear-canvas', () => {
            clearCanvas();
        })
        socketInstanceRef.current.on('room-joined', (room) => {
            setRoomUsers(room.users);
            renderCanvas(room.canvasElements);
        })
        socketInstanceRef.current.on('room-users', (room) => {
            console.log(room);
            setRoomUsers(room.users);
        })
    }

    const initializeCanvas = () => {
        let canvas = document.getElementById('board');
        let sketch = document.getElementById('sketch');

        // computing width and height on basis of parent element
        let sketch_style = getComputedStyle(sketch);
        canvas.width = parseInt(sketch_style.getPropertyValue('width'));
        canvas.height = parseInt(sketch_style.getPropertyValue('height'));

    }

    // render canvas
    const renderCanvas = (canvasElements) => {
        setElements(canvasElements)
    }

    const undoDrawing = () => {
        const elementsCopy = elements.slice(0, elements.length - 1);
        setElements(elementsCopy);
        socketInstanceRef.current?.emit('canvas-data', elementsCopy);
    }

    const drawCircle = (x1, y1, x2, y2) => {
        let radius = Math.sqrt(Math.pow((x1 - x2), 2) + Math.pow((y1 - y2), 2));
        const roughElement = generator.circle(x1, y1, radius, { roughness: 0, stroke: strokeColor });
        return { x1, y1, x2, y2, roughElement }
    }

    const drawLine = (x1, y1, x2, y2) => {
        const roughElement = generator.line(x1, y1, x2, y2, { roughness: 0, stroke: strokeColor });
        return { x1, y1, x2, y2, roughElement }
    }

    const drawEllipse = (x1, y1, x2, y2) => {
        const roughElement = generator.ellipse(x1, y1, x2 - x1, y2 - y1, { roughness: 0, stroke: strokeColor });
        return { x1, y1, x2, y2, roughElement }
    }

    const drawRectangle = (x1, y1, x2, y2) => {
        const roughElement = generator.rectangle(x1, y1, x2 - x1, y2 - y1, { roughness: 0, stroke: strokeColor });
        return { x1, y1, x2, y2, roughElement }
    }

    const clearBtnHandler = () => {
        clearCanvas();
        socketInstanceRef.current.emit('clear-canvas');
    }

    const clearCanvas = () => {
        let canvas = document.getElementById('board');
        const context = canvas.getContext('2d');
        context.clearRect(0, 0, canvas.width, canvas.height);
        setElements([]);
    }

    const colorChangeHandler = (event) => {
        setStrokeColor(event.target.value);
    }

    const onShapeChange = (shape) => {
        setElementType(shape);
    }

    const handleMouseDown = (event) => {
        let canvas = document.getElementById('board');
        setDrawing(true);

        const { clientX, clientY } = event;
        const element = createElement(clientX - canvas.offsetLeft, clientY - canvas.offsetTop, clientX - canvas.offsetLeft, clientY - canvas.offsetTop, elementType);
        setElements(prevState => [...prevState, element]);
    }

    const handleMouseMove = (event) => {
        if (!drawing) return;
        let canvas = document.getElementById('board');

        const { clientX, clientY } = event;
        const index = elements.length - 1;
        const { x1, y1 } = elements[index];
        const updateElements = createElement(x1, y1, clientX - canvas.offsetLeft, clientY - canvas.offsetTop, elementType);
        const elementsCopy = [...elements];
        elementsCopy[index] = updateElements;
        setElements(elementsCopy);
        socketInstanceRef.current?.emit('canvas-data', elementsCopy);
    }

    const handleMouseUp = () => {
        setDrawing(false);
    }

    return (
        <div className="board">
            <div className="board__header">

            </div>
            <BoardConfig clearBtnHandler={clearBtnHandler} colorChangeHandler={colorChangeHandler} onShapeChange={onShapeChange} shapeToDraw={elementType} undoDrawing={undoDrawing} />
            <div className="board__container">
                <div className="board__container_participants">
                    <Partcipants users={roomUsers} roomName={roomName} />
                </div>
                <div className="sketch" id="sketch">
                    <canvas id="board"
                        onMouseDown={handleMouseDown}
                        onMouseMove={handleMouseMove}
                        onMouseUp={handleMouseUp} />

                </div>
            </div>
        </div>

    )
}
export { Board };