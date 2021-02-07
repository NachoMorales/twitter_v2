import React, { useEffect, useState } from 'react'
import { useAuth } from './AuthContext'
import { Link, useHistory, useParams } from 'react-router-dom'
import Navbar from './Navbar'
import EditProfile from './EditProfile'
import UpdatePictures from './UpdatePictures'
import TweetList from './TweetList'
import GetUserDoc from './GetUserDoc';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'

export default function Profile() {
    const { user } = useParams()
    const [error, setError] = useState("");
    const { currentUser, logout } = useAuth();
    const history = useHistory();
    const profileInfo = GetUserDoc(user)
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
            { profileInfo && (
            <div>
                <Navbar />
                <div className="topUser">
                    <FontAwesomeIcon onClick={history.goBack} className="goBackButton" icon={faArrowLeft} size='lg' />
                    <div className="info">
                        <h2>{ profileInfo.name }</h2>
                        <h4>{ totalTweets } tweets</h4>
                    </div>
                </div>
                <div className="userInfo">
                    <div className="pictures">
                        <img id="headerPicture" src={UpdatePictures('Header_Picture', user)} alt="header"/>
                        <img id="profilePicture" src={UpdatePictures('Profile_Picture', user)} alt="profile_picture"/>
                        <div className="buttons">
                            <button className="logOut" onClick={handleLogout}>Log out</button>
                            <EditProfile />
                        </div>
                    </div>
                    <div className="info">
                        { !profileInfo.user && <div className="loading" id="profileInfoLoader"></div>}
                        { profileInfo.user && <div>
                            <h2>{ profileInfo.name }</h2>
                            <h3>{ profileInfo.user }</h3>
                            <h3>{ profileInfo.bio }</h3>
                            <h3>Joined on { 'January 2021' }</h3>
                            <h3 className="follows">{ 25 } Following</h3> <h3 className="follows">{ 30 } Followers</h3>
                            <br/> <br/>
                            <strong>Email: {profileInfo.email}</strong>
                        </div>}
                    </div>
                </div>
                <div className="userTweets">
                    <TweetList user={user} getTotalTweets={total => setTotalTweets(total)} />
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
