import React, { useEffect, useState } from 'react';
import { Board } from '../board/board.component';
import './board-container.css';

const BoardContainer = ({ location }) => {

    const [roomName, setRoomName] = useState('');
    const [username, setUsername] = useState('');
    const [userId, setUserId] = useState('');

    useEffect(() => {
        const params = new URLSearchParams(location.search)
        const roomName = params.get('roomName');
        const username = params.get('username');
        const userId = params.get('userId');
        setUserId(userId);
        setRoomName(roomName);
        setUsername(username);
    }, []);

    return (
        <>
            {roomName && username &&
                < div className="container" >
                    <Board roomName={roomName} username={username} userId={userId} />
                </div >}
        </>
    )
}

export { BoardContainer };