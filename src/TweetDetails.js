import { Link, useHistory, useParams } from "react-router-dom";
import Navbar from "./Navbar";
import { database } from './Firebase'
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { useAuth } from './AuthContext'
import UpdatePictures from './UpdatePictures'
import DeleteTweet from "./DeleteTweet";

const TweetDetails = () => {
    const { id } = useParams();
    const history = useHistory();
    const [tweet, setTweet] = useState([])
    const { currentUser } = useAuth();
    
    useEffect(() => {
        let mounted = true

        const getTweet = async () => {    
            database.tweets.doc(id)
            .onSnapshot((doc) => {
                if (mounted) {
                    var tweetDoc = []
                    tweetDoc = database.formatDoc(doc)
                    setTweet(tweetDoc)
                }
            })
        }
        
        getTweet();
        return () => mounted = false
    }, [id]);
    

    return ( 
        <div>
            <Navbar />
            <div className="tweet-details">
                <div className="goBackDiv">
                    <FontAwesomeIcon onClick={history.goBack} className="goBackButton" icon={faArrowLeft} size='lg' />
                </div>
                { tweet && (
                        <article>
                            { tweet.userId === currentUser.uid && <DeleteTweet tweet={tweet.id} /> }
                            <Link to={`/${tweet.user}`} className="tweetUserInfoLink">
                                <img id="profilePicture" src={UpdatePictures('Profile_Picture', tweet.userId)} alt="profile_picture"/>
                                <div className="tweetUserInfo">
                                    <h3> { tweet.name } </h3>
                                    <br/>
                                    <h5>{ tweet.user }</h5>
                                </div>
                            </Link>
                            <p>{ tweet.tweet }</p>
                            
                            {/* // TODO: Answer Tweet */}
                        </article>
                    )}
            </div>
        </div>
     );
}
 
export default TweetDetails;