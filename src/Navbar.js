import { Link } from 'react-router-dom';
import { useAuth } from './AuthContext';
import Tweetear from './Tweetear';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTwitter } from '@fortawesome/free-brands-svg-icons'
import { faHome } from '@fortawesome/free-solid-svg-icons'
import { faUser } from '@fortawesome/free-regular-svg-icons'

const Navbar = () => {
    const { currentUser } = useAuth()

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
                        <div id="list">

                        </div>
                    </div>
                </div>
            </footer>
        </div>
     );
}
 
export default Navbar;