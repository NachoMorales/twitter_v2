import { Link } from 'react-router-dom';
import Tweetear from './Tweetear';

const Navbar = () => {
    return ( 
        <nav className="navbar">
            <h1>Twitter v2</h1>
            <div className="links">
                <Link to="/home">Home</Link>
                <Link to="/profile">Profile</Link>
                <Tweetear />
            </div>
        </nav>
     );
}
 
export default Navbar;