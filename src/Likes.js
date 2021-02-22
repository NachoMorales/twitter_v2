import React, { useEffect, useState } from 'react'
import { useAuth } from './AuthContext'
import { Link, useHistory, useParams } from 'react-router-dom'
import Navbar from './Navbar'
import EditProfile from './EditProfile'
import TweetList from './TweetList'
import GetUserDoc from './GetUserDoc';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { faCalendarAlt } from '@fortawesome/free-regular-svg-icons'
import moment from 'moment'
import { database } from './Firebase'
import firebase from "firebase/app"

export default function Profile() {
    const { user } = useParams()
    const [error, setError] = useState("");
    const { currentUser, logout } = useAuth();
    const history = useHistory();
    const profileInfo = GetUserDoc(user);
    const [totalTweets, setTotalTweets] = useState(0);
    const [follow, setFollow] = useState(false)
    const [loaded, setLoaded] = useState(false)

    function handleFollow() {
        if (!follow) {
            database.users
            .doc(currentUser.uid)
            .update({
                following: firebase.firestore.FieldValue.arrayUnion(user)
            }).then(() => {
                setFollow(true)
            })
            database.users
            .doc(user)
            .update({
                followers: firebase.firestore.FieldValue.arrayUnion(currentUser.uid)
            }).then(() => {
                setFollow(true)
            })

        } else if (follow) {
            database.users
            .doc(currentUser.uid)
            .update({
                following: firebase.firestore.FieldValue.arrayRemove(user)
            }).then(() => {
                setFollow(false)
            })
            database.users
            .doc(user)
            .update({
                followers: firebase.firestore.FieldValue.arrayRemove(currentUser.uid)
            }).then(() => {
                setFollow(false)
            })
        }
    }


    function getStatus() {
        if (profileInfo.followers.length !== 0) {
            profileInfo.followers.forEach(follower => {
                if (follower === currentUser.uid) setFollow(true)
            })
        } else setFollow(false)
        setLoaded(true)
    }
    

    useEffect(() => {
        if (user !== currentUser.uid && profileInfo.followers && !loaded) {
            getStatus();
        } 
    }, [profileInfo])


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
            <Navbar />
            <div className="content">
                <div className="goBackDiv topUser">
                    <FontAwesomeIcon onClick={history.goBack} className="goBackButton" icon={faArrowLeft} size='lg' />
                    <div className="info">
                        <h2>{ profileInfo.name }</h2>
                        <h4>{ totalTweets } Likes</h4>
                    </div>
                </div>
                <div className="userInfo">
                    <div className="pictures">
                        {profileInfo.headerPicture && <img id="headerPicture" src={profileInfo.headerPicture} alt="header"/>}
                        {!profileInfo.headerPicture && <div id="headerPicture"></div>}
                        <img id="profilePicture" src={profileInfo.profilePicture} alt="profile_picture"/>
                        { user === currentUser.uid && 
                        <div className="buttons">
                            <button className="logOut" onClick={handleLogout}>Log out</button>
                            <EditProfile />
                        </div>}
                        { user !== currentUser.uid && 
                        <div className="buttons">
                            {!follow && <button className="editProfile" onClick={handleFollow}>Follow</button>}
                            {follow && <button className="followBtn" onClick={handleFollow}><span>Following</span></button>}
                        </div>}
                    </div>
                    <div className="info">
                        { !profileInfo && <div className="loading" id="profileInfoLoader"></div>}
                        { profileInfo.createdAt && <div>
                            <h2>{ profileInfo.name }</h2>
                            <h3>{ profileInfo.user }</h3>
                            <h3>{ profileInfo.bio }</h3>
                            <h3><FontAwesomeIcon icon={faCalendarAlt} size='lg' style={{ opacity: 0.7 }} /> Joined { moment(profileInfo.createdAt.toDate()).format('MMMM YYYY') }</h3>
                            <h3 className="follows"><Link to={`/user/${user}/following`} style={{ textDecoration: "none" }}><strong>{ profileInfo.following.length }</strong> Following</Link></h3>
                            <h3 className="follows"><Link to={`/user/${user}/followers`} style={{ textDecoration: "none" }}><strong>{ profileInfo.followers.length }</strong> Followers</Link></h3>
                            <br/> 
                            <br/>
                            <strong>Email: {profileInfo.email}</strong>
                        </div>}
                    </div>
                    <div className="switch" id="switchTweets">
                        <Link to={`/user/${user}`}><button>Tweets</button></Link>
                        <Link to={`/user/${user}/with_replies`}><button>Tweets & replies</button></Link>
                        <Link to={`/user/${user}/media`}><button>Media</button></Link>
                        <Link to={`/user/${user}/likes`}><button className="active">Likes</button></Link>
                    </div>
                </div>
                
                <div className="userTweets">
                    <TweetList userId={user} getTotalTweets={total => setTotalTweets(total)} filter={'likes'} />
                </div>
            </div>
        </div>
    )
}
