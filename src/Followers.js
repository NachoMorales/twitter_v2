import React, { useEffect, useState } from 'react'
//import { useAuth } from './AuthContext'
import { Link, useHistory, useParams } from 'react-router-dom'
import Navbar from './Navbar'
import GetUserDoc from './GetUserDoc';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { database } from './Firebase'
//import firebase from "firebase/app"

export default function Followers() {
    const { user } = useParams()
    const [error, setError] = useState("");
    const history = useHistory();
    const profileInfo = GetUserDoc(user);
    const [loaded, setLoaded] = useState(false)
    const [follows, setFollows] = useState([])
    //const { currentUser } = useAuth();
    //const [follow, setFollow] = useState(true)

    function getFollows() {
        if (profileInfo.followers.length !== 0) {
            var userDoc = []

            profileInfo.followers.forEach(follower => {
                database.users
                .doc(follower)
                .onSnapshot((doc) => {
                    userDoc.push(database.formatDoc(doc))
                })
            })

            setFollows(userDoc)
        } else setError(<div className="notFound"><h3>{profileInfo.user + ' doesn´t have any followers'}</h3> <br/> <h5>{ 'When someone follows them, they´ll be listed here.' }</h5> </div>)

        setLoaded(true)
    }

    useEffect(() => {    
        if (profileInfo.followers && !loaded) getFollows();
    })



    // TODO: Follow button


    // function handleFollow(bool) {

    //     if (bool === true) {
    //         database.users
    //         .doc(currentUser.uid)
    //         .update({
    //             following: firebase.firestore.FieldValue.arrayUnion(user)
    //         })
    //         database.users
    //         .doc(user)
    //         .update({
    //             followers: firebase.firestore.FieldValue.arrayUnion(currentUser.uid)
    //         })

    //     } else {
    //         database.users
    //         .doc(currentUser.uid)
    //         .update({
    //             following: firebase.firestore.FieldValue.arrayRemove(user)
    //         })
    //         database.users
    //         .doc(user)
    //         .update({
    //             followers: firebase.firestore.FieldValue.arrayRemove(currentUser.uid)
    //         })
    //     }
    // }

    // function isFollowing(array) {
    //     console.log('starting function')
    //     var jsx = '';
    //     if (array.length !== 0) {
    //         array.forEach(follower => {
    //             if (follower === currentUser.uid) {
    //                 console.log(follower + currentUser.uid)
    //                 jsx = <button className="followBtn" onClick={() => handleFollow(false)}><span>Following</span></button>
    //             } else {
    //                 console.log('not a match')
    //             }
    //         }).then(() => {
    //             console.log('returning')
    //             return jsx
    //         })
    //     } else {
    //         console.log('no followers')
    //         jsx = <button className="editProfile" onClick={() => handleFollow(true)}>Follow</button>
    //         console.log(jsx)
    //     }
        
    // }
    



    return (
        <div className="userProfile">
            <Navbar />
            <div className="content">
                <div className="topUser" style={{ borderBottom: 'none'}}>
                    <FontAwesomeIcon onClick={history.goBack} className="goBackButton" icon={faArrowLeft} size='lg' />
                    <div className="info">
                        <h2>{ profileInfo.name }</h2>
                        <h5 style={{ fontWeight: 500 }}>{ profileInfo.user }</h5>
                    </div>
                </div>
                <div className="switch">
                    <Link to={`/user/${user}/followers`}><button className="active">Followers</button></Link>
                    <Link to={`/user/${user}/following`}><button>Following</button></Link>
                </div>
                <div className="follow-list">
                    { error && <div>{error}</div> }
                    { !loaded && <div className="loading"></div>}
                    { loaded && <div> { follows.map(follower => (
                        <div className="followMap" key={follower.id}>
                            <Link to={`/user/${follower.id}`} style={{ textDecoration: 'none' }} >
                                <img id="profilePicture" src={follower.profilePicture} alt="profile_picture" style={{ float: 'left' }} />                               
                                <h3> {follower.name} </h3>
                                <h5> {follower.user} </h5>
                                <h5 style={{ fontWeight: 500, color: 'black', marginTop: '5px' }}> {follower.bio} </h5>
                            </Link>
                             
                            {/* { follower.id !== currentUser.uid && <div className="buttons"> {isFollowing(follower.followers)}

                            {follower.followers.forEach(fol => {
                                console.log('for each called')
                                if (fol === currentUser.uid) {
                                    console.log('found')
                                    return <button className="followBtn" onClick={() => handleFollow(follower.id)}><span>Following</span></button>
                                }
                                console.log('not found')
                            }) }

                            { follower.followers.length === 0 && <button className="editProfile" onClick={() => handleFollow(follower.id)}>Follow</button> }
                            </div> } */}
                        </div>
                    )) }</div> }
                </div>
            </div>
        </div>
    )
}
