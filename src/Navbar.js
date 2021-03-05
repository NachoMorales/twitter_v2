import { Link, useHistory } from 'react-router-dom';
import { useAuth } from './AuthContext';
import Tweetear from './Tweetear';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTwitter } from '@fortawesome/free-brands-svg-icons'
import { faHome } from '@fortawesome/free-solid-svg-icons'
import { faUser } from '@fortawesome/free-regular-svg-icons'
import GetUserDoc from './GetUserDoc';
import { useEffect, useState } from 'react';
import { database } from './Firebase';
import firebase from "firebase/app"
import HandleFollow from './HandleFollow';

const Navbar = () => {
    const { currentUser } = useAuth()
    const profileInfo = GetUserDoc(currentUser.uid)
    const [loaded, setLoaded] = useState(false)
    const [users, setUsers] = useState([])
    const history = useHistory()

    function getNotFollows() {
        var follows = profileInfo.following
        // var promises = []
        var docs = []

        follows.push(currentUser.uid)

        // promises.push(
            database.users
            .where(firebase.firestore.FieldPath.documentId(),'not-in',follows)
            .limit(3)
            .onSnapshot((querySnapshot) => {
                docs = []
                querySnapshot.forEach(function(doc) {
                    docs.push(database.formatDoc(doc))
                })
                setUsers(docs)
                setLoaded(true)
            })
            
        // )

        // Promise.all(promises).then(() => {
            // setUsers(docs)
            // setLoaded(true)
        // })
    }

    useEffect(() => {
        if (profileInfo.following && history.location.pathname !== '/connect' && !loaded) getNotFollows();
    }, [profileInfo])

    return ( 
        <div>
            <header id="navbarDiv">
                <nav className="navbar">
                    <div>
                        <Link to="/home">
                            <FontAwesomeIcon icon={faTwitter} className="twitterIcon" />
                        </Link>
                        <div className="newLinks">
                            { history.location.pathname === '/home' && <Link to="/home" className="active">
                                <FontAwesomeIcon icon={faHome} className="navIcon" />
                                <p>Home</p>
                            </Link>}
                            { history.location.pathname !== '/home' && <Link to="/home">
                                <FontAwesomeIcon icon={faHome} className="navIcon" />
                                <p>Home</p>
                            </Link>}
                        </div>
                        <div className="newLinks">
                            { history.location.pathname === `/user/${currentUser.uid}` && <Link to={`/user/${currentUser.uid}`} className="active">
                                <FontAwesomeIcon icon={faUser} className="navIcon" />
                                <p>Profile</p>
                            </Link>}
                            { history.location.pathname !== `/user/${currentUser.uid}` && <Link to={`/user/${currentUser.uid}`}>
                                <FontAwesomeIcon icon={faUser} className="navIcon" />
                                <p>Profile</p>
                            </Link>}
                        </div>
                        <Tweetear />
                    </div>
                    <div className="navProfileInfo">
                        <div className="tweetPicture">
                            <Link to={`/user/${profileInfo.id}`}>
                                <img className="tweetProfilePicture" src={profileInfo.profilePicture} alt="profile_picture"/>
                            </Link>
                        </div>
                        <Link to={`/user/${profileInfo.id}`}>
                            <h3> {profileInfo.name} </h3>
                            <h5> {profileInfo.user} </h5>
                        </Link>
                    </div>
                </nav>
            </header>
            <footer id="rightSideInfo">
                <div id="rightSideDiv">
                    { history.location.pathname !== '/connect' && users.length !== 0 && <div id="whoToFollow">
                        <div id="top">
                            <Link to="/connect" style={{textDecoration: 'none'}} >Who to follow</Link>
                        </div>
                        { !loaded && <div className="loading"></div>}
                        { loaded && <div> { users.map(user => (
                            <div className="followMap" id="list" key={user.id}>
                                <Link to={`/user/${user.id}`} style={{ textDecoration: 'none' }} >
                                    <img id="profilePicture" src={user.profilePicture} alt="profile_picture" style={{ float: 'left' }} />
                                    <h3> {user.name} </h3>
                                    <h5> {user.user} </h5>
                                </Link>
                                <div className="buttons">
                                    <button className="followButton" onClick={() => HandleFollow(user.id, true, currentUser.uid)}>Follow</button>
                                </div>
                            </div>
                        )) }</div> }
                    </div>}
                </div>
            </footer>
        </div>
     );
}
 
export default Navbar;