import { Link } from 'react-router-dom';
import { useAuth } from './AuthContext';
import Tweetear from './Tweetear';

const Navbar = () => {
    const { currentUser } = useAuth()

    return ( 
        <nav className="navbar">
            <h1>Twitter v2</h1>
            <div className="links">
                <Link to="/home">Home</Link>
                <Link to={`/user/${currentUser.uid}`}>Profile</Link>
                <Tweetear />
            </div>
        </nav>
     );
}
 
export default Navbar;