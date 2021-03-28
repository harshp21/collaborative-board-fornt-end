import React, { useState } from 'react'
import { useHistory } from 'react-router';
import crypto from 'crypto';
import DeveloperBoardIcon from '@material-ui/icons/DeveloperBoard';
import './home.css'

function Home() {

    const [username, setUsername] = useState('');
    const [roomName, setRoomName] = useState('');

    const history = useHistory();

    const onSelectRoom = () => {
        const id = crypto.randomBytes(32).toString('hex');
        history.push(`/room?username=${username}&roomName=${roomName}&userId=${id}`)
        console.log(username, roomName);
    }
    return (
        <div className="form">
            <div className="form__title">
                <DeveloperBoardIcon /> Collaborative board
            </div>
            <div className="form__input">
                <label htmlFor="username">Username</label>
                <input
                    type="text"
                    name="username"
                    id="username"
                    placeholder="Enter username..."
                    onChange={(e) => setUsername(e.target.value)}
                    value={username}
                />
            </div>
            <div className="form__input">
                <label htmlFor="room">Room</label>
                <select name="room" id="room" onChange={(e) => setRoomName(e.target.value)} value={roomName}>
                    <option value="">--select--</option>
                    <option value="JavaScript">JavaScript</option>
                    <option value="Python">Python</option>
                    <option value="Java">Java</option>
                    <option value="Nodejs">Nodejs</option>
                    <option value="Reactjs">Reactjs</option>
                    <option value="Angularjs">Angularjs</option>
                </select>
            </div>
            <button className="join-btn" onClick={onSelectRoom} disabled={!username || !roomName}>Join Chat</button>
        </div>
    )
}

export default Home
