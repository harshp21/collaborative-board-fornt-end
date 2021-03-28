import React from 'react'
import User from '../user/User'
import './participants.css'
import ForumRoundedIcon from '@material-ui/icons/ForumRounded';
import PeopleIcon from '@material-ui/icons/People';

function Partcipants({ users, roomName }) {
    return (
        <>
            <div className="participants">
                <div className="participants__title">
                    <ForumRoundedIcon /> Room Name:
                </div>
                <div className="participants__sub-title">
                    {roomName}
                </div>
                <div className="participants__title">
                    <PeopleIcon /> Users:
                </div>
                <div className="participants__content">
                    {users.map((user) => {
                        return <User key={user.userId} user={user} />
                    })}
                </div>
            </div>

        </>
    )
}

export default Partcipants
