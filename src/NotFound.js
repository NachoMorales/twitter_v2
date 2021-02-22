import { Link } from "react-router-dom"
import Navbar from "./Navbar";

const NotFound = () => {
    return ( 
        <div>
            <Navbar />
            <div className="content notFound">
                <h3>Sorry, that page doesn´t exist!</h3>
                 <br/>
                <h5>Why not try a search to find something else?</h5>
                <br/>
                <Link to="/home"><button>Homepage</button></Link>
            </div>
        </div>
     );
}
 
export default NotFound;