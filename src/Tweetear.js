import { useState, useRef } from "react";
import { database } from './Firebase';
import { useAuth } from './AuthContext';
import GetUserDoc from "./GetUserDoc";

const Tweetear = () => {
    const [body, setBody] = useState('');
    const { currentUser } = useAuth();
    const userId = currentUser.uid
    const [error, setError] = useState("");
    const profileInfo = GetUserDoc(currentUser.uid)
    const modalSignup = useRef();
    const [loaded, setLoaded] = useState(true)


    const handleSubmit = (e) => {
        e.preventDefault();
        setLoaded(false)
        database.tweets.add({
            tweet: body,
            user: profileInfo.user,
            name: profileInfo.name,
            userId: userId,
            like: [],
            retweet: [],
            profilePicture: profileInfo.profilePicture,
            createdAt: database.getCurrentTimestamp(),
        }).then(() => {
            setLoaded(true)
            handleClick()
        }).catch(() => {
            setError('Failed to upload tweet')
        })
    }

    const handleClick = () => {
        if (modalSignup.current.style.display === 'none' || modalSignup.current.style.display === '') {
            modalSignup.current.style.display = 'initial';
        } else {
            modalSignup.current.style.display = 'none';
        }
    }


    return ( 
        <div className="tweetear">
            <button id="tweetFromDiv" onClick={handleClick}>Tweet</button>
            <div ref={modalSignup} className="modal">
                <form className="modal-content" id="tweetModal" onSubmit={handleSubmit}>
                    <div id="topTweetModal">
                        <span onClick={handleClick} className="closeTweetModal" title="Close Modal">&times;</span>
                    </div>
                    <div className="container">
                        <img id="profilePicture" src={profileInfo.profilePicture} alt="profile_picture"/>
                        <textarea id="tweetTextarea" placeholder="What's happening?" required value={body} onChange={(e) => setBody(e.target.value)} style={{ resize: "none" }}></textarea>
                    
                        <div className="clearfix">
                            <button type="button" onClick={handleClick} className="cancelbtn">Cancel</button>
                            { !loaded && <button type="submit" className="signupbtn" id="tweetearButtonModal">Tweeting</button>}
                            { loaded && <button type="submit" className="signupbtn" id="tweetearButtonModal">Tweet</button>}
                        </div>
                        { error && <div className="error">{error}</div> }
                    </div>
                </form>
            </div>
        </div>
     );
}
export default Tweetear;
