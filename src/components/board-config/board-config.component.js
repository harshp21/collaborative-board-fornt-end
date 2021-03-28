import React from 'react';
import './board-config.css';
import DeleteOutlineOutlinedIcon from '@material-ui/icons/DeleteOutlineOutlined';
import { IconButton } from '@material-ui/core';
import RadioButtonUncheckedOutlinedIcon from '@material-ui/icons/RadioButtonUncheckedOutlined';
import Crop54SharpIcon from '@material-ui/icons/Crop54Sharp';
import CreateSharpIcon from '@material-ui/icons/CreateSharp';
import PanoramaWideAngleIcon from '@material-ui/icons/PanoramaWideAngle';
import UndoIcon from '@material-ui/icons/Undo';

const BoardConfig = ({ clearBtnHandler, colorChangeHandler, onShapeChange, shapeToDraw, undoDrawing }) => {

    return (
        <div className="board-config" >
            <div className="board-config__items" onClick={() => clearBtnHandler()}>
                <IconButton>
                    <DeleteOutlineOutlinedIcon />
                </IconButton>
            </div>
            <div className={shapeToDraw === 'circle' ? "board-config__items active-item" : "board-config__items"}
                onClick={() => onShapeChange('circle')}>
                <IconButton >
                    <RadioButtonUncheckedOutlinedIcon />
                </IconButton>
            </div>
            <div className={shapeToDraw === 'rectangle' ? "board-config__items active-item" : "board-config__items"}
                onClick={() => onShapeChange('rectangle')}>
                <IconButton >
                    <Crop54SharpIcon />
                </IconButton>
            </div>
            <div className={shapeToDraw === 'line' ? "board-config__items active-item" : "board-config__items"}
                onClick={() => onShapeChange('line')}>
                <IconButton >
                    <CreateSharpIcon />
                </IconButton>
            </div>
            <div className={shapeToDraw === 'ellipse' ? "board-config__items active-item" : "board-config__items"}
                onClick={() => onShapeChange('ellipse')}>
                <IconButton >
                    <PanoramaWideAngleIcon />
                </IconButton>
            </div>
            <div className="board-config__items"
                onClick={() => undoDrawing()}>
                <IconButton >
                    <UndoIcon />
                </IconButton>
            </div>

            <div className="board-config__items">
                <input type="color" onChange={(e) => colorChangeHandler(e)} />
            </div>
        </div >
    )
}

export { BoardConfig }