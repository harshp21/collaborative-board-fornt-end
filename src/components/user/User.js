import { Avatar, IconButton } from '@material-ui/core'
import React from 'react'
import './user.css'

function User({ user }) {
    return (
        <div className="user-container">
            <div className="user-container__profile">
                <IconButton>
                    <Avatar />
                </IconButton>
            </div>
            <div className="user-container__title">{user.username}</div>
        </div>
    )
}

export default User
