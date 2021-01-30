import React, { useEffect, useState } from 'react'
import { useAuth } from './AuthContext'
import { Link, useHistory } from 'react-router-dom'
import { database } from './Firebase'
import userPicture from './avatar.jpg'
import header from './header.jpg'
import Navbar from './Navbar'

export default function Profile() {
    const [error, setError] = useState("");
    const { currentUser, logout } = useAuth();
    const history = useHistory();
    const userId = currentUser.uid;
    const [profileInfo, setProfileInfo] = useState([])

    async function handleLogout() {
        setError('')

        try {
            await logout()
            history.push('/')
        } catch {
            setError('Failed to log out');
        }
    }

    useEffect(() => {
        database.users.doc(userId).get().then(doc => {
            setProfileInfo(database.formatDoc(doc))
        }).catch(() => {
            setError('Failed to load profile info')
        })
    }, [])
    

    return (
        <div className="userProfile">
            { error && <div>{error}</div> }
            { currentUser && (
            <div>
                <Navbar />
                <div className="topUser">
                    <div className="info">
                        <h2>{ profileInfo.name }</h2>
                        <h4>{ 15 } tweets</h4>
                    </div>
                </div>
                <div className="userInfo">
                    <div className="pictures">
                        <img id="headerPicture" src={header} alt="header"/>
                        <img id="profilePicture" src={userPicture} alt="profile_picture"/>
                        <div className="buttons">
                            <button className="logOut" onClick={handleLogout}>Log out</button>
                            <button className="editProfile"><Link className="links" to='/edit-profile'>Edit profile</Link></button>
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
