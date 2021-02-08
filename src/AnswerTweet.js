import { useState, useRef, useEffect } from "react";
import { database } from './Firebase';
import { useAuth } from './AuthContext';
import GetUserDoc from "./GetUserDoc";
import UpdatePictures from "./UpdatePictures";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faComment } from '@fortawesome/free-regular-svg-icons'
import { Link } from "react-router-dom";

const AnswerTweet = (tweet) => {
    const [body, setBody] = useState('');
    const { currentUser } = useAuth();
    const userId = currentUser.uid
    const [error, setError] = useState("");
    const profileInfo = GetUserDoc()
    const modalSignup = useRef();
    const [loaded, setLoaded] = useState(true);

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoaded(false)

        if (!tweet.answerTo) {
            database.tweets
            .doc(tweet.id)
            .collection('answers')
            .add({
                answerTo: tweet.id,
                tweet: body,
                user: profileInfo.user,
                name: profileInfo.name,
                userId: userId,
                createdAt: database.getCurrentTimestamp(),
            }).then(() => {
                setLoaded(true)
                setBody('')
                handleClick()
            }).catch(() => {
                setError('Failed to upload tweet')
            })
        } else {
            database.tweets
            .doc(tweet.answerTo)
            .collection('answers')
            .doc(tweet.id)
            .collection('answers')
            .add({
                rootTweet: tweet.answerTo,
                answerTo: tweet.id,
                tweet: body,
                user: profileInfo.user,
                name: profileInfo.name,
                userId: userId,
                createdAt: database.getCurrentTimestamp(),
            }).then(() => {
                setLoaded(true)
                setBody('')
                handleClick()
            }).catch(() => {
                setError('Failed to upload tweet')
            })
        }

        
    }

    const handleClick = () => {
        if (modalSignup.current.style.display === 'none' || modalSignup.current.style.display === '') {
            modalSignup.current.style.display = 'block';
        } else {
            modalSignup.current.style.display = 'none';
        }
    }


    return ( 
        <div className="tweetear" id="commentDiv">
            <FontAwesomeIcon className="commentIcon" icon={faComment} onClick={handleClick} />
            <div ref={modalSignup} className="modal">
                <form className="modal-content" id="tweetModal" onSubmit={handleSubmit}>
                    <div id="topTweetModal">
                        <span onClick={handleClick} className="closeTweetModal" title="Close Modal">&times;</span>
                    </div>
                    <div className="container">
                        { !tweet.answerTo && <div className="tweetReply prevTweet">
                            <img id="profilePicture" src={UpdatePictures('Profile_Picture', tweet.userId)} alt="profile_picture"/>    
                            <h5> <b>{ tweet.name }</b> { tweet.user }</h5>
                            <p id="tweetBody">{ tweet.tweet }</p>
                            <h5>Replying to <Link id="link" to={`/user/${tweet.userId}`}>{ tweet.user }</Link></h5>
                        </div>}
                        { tweet.answerTo && <div className="tweetReply prevTweet">
                            <img id="profilePicture" src={UpdatePictures('Profile_Picture', tweet.userId)} alt="profile_picture"/>    
                            <h5> <b>{ tweet.name }</b> { tweet.user }</h5>
                            <p id="tweetBody">{ tweet.tweet }</p>
                            <h5>Replying to <Link id="link" to={`/user/${tweet.userId}`}>{ tweet.user }</Link></h5>
                        </div>}
                        <svg className="line" width="50" height="50"><line x1="25" y1="0" x2="25" y2="100"/></svg>

                        <div className="tweetReply">
                            
                            <img id="profilePicture" src={UpdatePictures('Profile_Picture', userId)} alt="profile_picture"/>
                            <textarea id="tweetTextarea" placeholder="Tweet your reply" required value={body} onChange={(e) => setBody(e.target.value)} style={{ resize: "none" }}></textarea>
                        </div>
                        
                        <div className="clearfix">
                            <button type="button" onClick={handleClick} className="cancelbtn">Cancel</button>
                            { !loaded && <button type="submit" className="signupbtn" id="tweetearButtonModal" disabled>Replying</button>}
                            { loaded && <button type="submit" className="signupbtn" id="tweetearButtonModal">Reply</button>}
                        </div> 
                    </div>
                    { error && <div className="error">{error}</div> }
                </form>
            </div>
        </div>
     );
}
export default AnswerTweet;
