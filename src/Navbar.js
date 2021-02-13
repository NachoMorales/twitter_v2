import { Link } from 'react-router-dom';
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

const Navbar = () => {
    const { currentUser } = useAuth()
    const profileInfo = GetUserDoc(currentUser.uid)
    const [loaded, setLoaded] = useState(false)
    const [users, setUsers] = useState([])

    // TODO: -Get people that user doesn't follow   -Map
    function getNotFollows() {
        if (!profileInfo.following) {
            return
        }

        var follows = profileInfo.following
        var promises = []
        var docs = []

        follows.push(currentUser.uid)

        promises.push(
            database.users
            .where(firebase.firestore.FieldPath.documentId(),'not-in',follows)
            .onSnapshot((querySnapshot) => {
                querySnapshot.forEach(function(doc) {
                    docs.push(database.formatDoc(doc))
                })
            })
        )

        Promise.all(promises).then(() => {
            setUsers(docs)
            setLoaded(true)
        })
    }

    useEffect(() => {
        if (profileInfo.following && !loaded) getNotFollows();
    }, [profileInfo.user])




    return ( 
        <div>
            <header id="navbarDiv">
                <nav className="navbar">
                    <Link to="/home">
                        <FontAwesomeIcon icon={faTwitter} className="twitterIcon" />
                    </Link>
                    <div className="newLinks">
                        <Link to="/home"><FontAwesomeIcon icon={faHome} className="navIcon" /><p>Home</p></Link>
                    </div>
                    <div className="newLinks">
                        <Link to={`/user/${currentUser.uid}`}><FontAwesomeIcon icon={faUser} className="navIcon" /><p>Profile</p></Link>
                    </div>
                    <Tweetear />
                </nav>
            </header>
            <footer id="rightSideInfo">
                <div id="rightSideDiv">
                    <div id="whoToFollow">
                        <div id="top">
                            Who to follow
                        </div>
                        { !loaded && <div className="loading"></div>}
                        { loaded && <div> { users.map(user => (
                            <div className="followMap" id="list" key={user.id}>
                                <Link to={`/user/${user.id}`} style={{ textDecoration: 'none' }} >
                                    <img id="profilePicture" src={user.profilePicture} alt="profile_picture" style={{ float: 'left' }} />
                                    <h3> {user.name} </h3>
                                    <h5> {user.user} </h5>
                                </Link>
                            </div>
                        )) }</div> }
                    </div>
                </div>
            </footer>
        </div>
     );
}
 
export default Navbar;