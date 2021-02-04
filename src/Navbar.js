import { Link } from 'react-router-dom';
import GetUserDoc from './GetUserDoc';
import Tweetear from './Tweetear';

const Navbar = () => {
    return ( 
        <nav className="navbar">
            <h1>Twitter v2</h1>
            <div className="links">
                <Link to="/home">Home</Link>
                <Link to={`/user/${(GetUserDoc('user').user)}`}>Profile</Link>
                <Tweetear />
            </div>
        </nav>
     );
}
 
export default Navbar;