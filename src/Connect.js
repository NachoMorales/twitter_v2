import { Link, useHistory } from 'react-router-dom';
import { useAuth } from './AuthContext';
import GetUserDoc from './GetUserDoc';
import { useEffect, useState } from 'react';
import { database } from './Firebase';
import firebase from "firebase/app"
import Navbar from './Navbar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'

const Connect = () => {
    const { currentUser } = useAuth()
    const profileInfo = GetUserDoc(currentUser.uid)
    const [loaded, setLoaded] = useState(false)
    const [users, setUsers] = useState([])
    const [error, setError] = useState('')
    const history = useHistory()

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
                if (docs.length !== 0) setError('')
                setUsers(docs)
                setLoaded(true)
            })
        )

        Promise.all(promises).then(() => {
            if (docs.length === 0) {
                setError(<div className="notFound">
                        <h3>{'You follow everyone!'}</h3>
                        <br/>
                        <Link to={'/home'}>
                            <button>Home</button>
                        </Link> 
                    </div>)
            }
        })
    }

    
    useEffect(() => {
        if (profileInfo.following && !loaded) getNotFollows();
    }, [profileInfo.user])

    return ( 
        <div className="userProfile">
            <Navbar />
            <div className="content">
                <div className="topUser" style={{ borderBottom: 'none' }}>
                    <FontAwesomeIcon onClick={history.goBack} className="goBackButton" icon={faArrowLeft} size='lg' style={{ margin: '10px' }} />
                </div>
                <div className="follow-list">
                    { error && <div>{error}</div> }
                    { !loaded && <div className="loading"></div>}
                    { loaded && <div> { users.map(user => (
                        <div className="followMap" key={user.id}>
                            <Link to={`/user/${user.id}`} style={{ textDecoration: 'none' }} >
                                <img id="profilePicture" src={user.profilePicture} alt="profile_picture" style={{ float: 'left' }} />
                                
                                <h3> {user.name} </h3>
                                <h5> {user.user} </h5>
                                <h5 style={{ fontWeight: 500, color: 'black', marginTop: '5px' }}> {user.bio} </h5>
                                {/* TODO:
                                <button>Follow</button> */}
                            </Link>
                        </div>
                    )) }</div> }
                </div>
            </div>
        </div>
     );
}
 
export default Connect;