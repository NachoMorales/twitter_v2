import React, { useState } from 'react'
import { useAuth } from './AuthContext'
import { Link, useHistory } from 'react-router-dom'
import Navbar from './Navbar'
import EditProfile from './EditProfile'
import UpdatePictures from './UpdatePictures'
import TweetList from './TweetList'
import GetUserDoc from './GetUserDoc';

export default function Profile() {
    const [error, setError] = useState("");
    const { currentUser, logout } = useAuth();
    const history = useHistory();
    const profileInfo = GetUserDoc()
    const [totalTweets, setTotalTweets] = useState(0)

    async function handleLogout() {
        if (window.confirm('Are you sure you want to log out?')) {
            setError('')
            try {
                await logout()
                history.push('/')
            } catch {
                setError('Failed to log out');
            }
        }
    }

    

    return (
        <div className="userProfile">
            { error && <div>{error}</div> }
            { currentUser && (
            <div>
                <Navbar />
                <div className="topUser">
                    <div className="info">
                        <h2>{ profileInfo.name }</h2>
                        <h4>{ totalTweets } tweets</h4>
                    </div>
                </div>
                <div className="userInfo">
                    <div className="pictures">
                        <img id="headerPicture" src={UpdatePictures('Header_Picture', currentUser.uid)} alt="header"/>
                        <img id="profilePicture" src={UpdatePictures('Profile_Picture', currentUser.uid)} alt="profile_picture"/>
                        <div className="buttons">
                            <button className="logOut" onClick={handleLogout}>Log out</button>
                            <EditProfile />
                        </div>
                    </div>
                    <div className="info">
                        <h2>{ profileInfo.name }</h2>
                        <h3>{ profileInfo.user }</h3>
                        <h3>{ profileInfo.bio }</h3>
                        <h3>Joined on { 'January 2021' }</h3>
                        <h3 className="follows">{ 25 } Following</h3> <h3 className="follows">{ 30 } Followers</h3>
                        <br/> <br/>
                        <strong>Email: {currentUser.email}</strong>
                    </div>
                </div>
                <div className="userTweets">
                    <TweetList user={currentUser.uid} getTotalTweets={total => setTotalTweets(total)} />
                </div>
            </div>)}
            { !currentUser && (
            <div>
                <strong>Error: No user loged in.</strong>
                <br/>
                <Link to="/login" className="links">Log in</Link>
            </div>)}
            
        </div>
    )
}
