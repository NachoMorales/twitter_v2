import React, { useEffect, useState } from 'react'
import { Link, useHistory, useParams } from 'react-router-dom'
import Navbar from './Navbar'
import GetUserDoc from './GetUserDoc';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { database } from './Firebase'


export default function Following() {
    const { user } = useParams()
    const [error, setError] = useState("");
    const history = useHistory();
    const profileInfo = GetUserDoc(user);
    const [loaded, setLoaded] = useState(false)
    const [follows, setFollows] = useState([])


    function getFollows() {
        if (profileInfo.following.length !== 0) {
            var userDoc = []

            profileInfo.following.forEach(follow => {
                database.users
                .doc(follow)
                .onSnapshot((doc) => {
                    userDoc.push(database.formatDoc(doc))
                })
            })
            setFollows(userDoc)
        } else setError(<div className="notFound">
                            <h3>{profileInfo.user + ' doesn´t have any followers'}</h3>
                            <br/> 
                            <h5>{ 'When someone follows them, they´ll be listed here.' }</h5> 
                        </div>)
        setLoaded(true)
    }

    useEffect(() => {    
        if (profileInfo.following && !loaded) getFollows();
    })



    return (
        <div className="userProfile">
            <Navbar />
            <div className="content">
                <div className="topUser" style={{ borderBottom: 'none' }}>
                    <FontAwesomeIcon onClick={history.goBack} className="goBackButton" icon={faArrowLeft} size='lg' />
                    <div className="info">
                        <h2>{ profileInfo.name }</h2>
                        <h5 style={{ fontWeight: 500 }}>{ profileInfo.user }</h5>
                    </div>
                </div>
                <div className="switch">
                    <Link to={`/user/${user}/followers`}><button>Followers</button></Link>
                    <Link to={`/user/${user}/following`}><button className="active">Following</button></Link>
                </div>
                <div className="follow-list">
                    { error && <div>{error}</div> }
                    { !loaded && <div className="loading"></div>}
                    { loaded && <div> { follows.map(follow => (
                        <div className="followMap" key={follow.id}>
                            <Link to={`/user/${follow.id}`} style={{ textDecoration: 'none' }} >
                                <img id="profilePicture" src={follow.profilePicture} alt="profile_picture" style={{ float: 'left' }} />
                                
                                <h3> {follow.name} </h3>
                                <h5> {follow.user} </h5>
                                <h5 style={{ fontWeight: 500, color: 'black', marginTop: '5px' }}> {follow.bio} </h5>
                            </Link>
                        </div>
                    )) }</div> }
                </div>
            </div>
        </div>
    )
}
