import { useState, useEffect, useRef } from "react";
import { database } from './Firebase';
import { useAuth } from './AuthContext';

const Tweetear = () => {
    const [body, setBody] = useState('');
    const { currentUser } = useAuth();
    const userId = currentUser.uid
    const [error, setError] = useState("");
    const [profileInfo, setProfileInfo] = useState([])
    const modalSignup = useRef();




    const handleSubmit = (e) => {
        e.preventDefault();

        database.tweets.add({
            tweet: body,
            user: profileInfo.user,
            name: profileInfo.name,
            userId: userId,
            createdAt: database.getCurrentTimestamp(),
        })

        if (window.location.pathname === '/home') {
            window.location.reload()
        } else {
            handleClick();
            setBody('');
        }
        
    }
    const handleClick = () => {
        if (modalSignup.current.style.display === 'none' || modalSignup.current.style.display === '') {
            modalSignup.current.style.display = 'block';
        } else {
            modalSignup.current.style.display = 'none';
        }
    }

    useEffect(() => {
        database.users.doc(userId).get().then(doc => {
            setProfileInfo(database.formatDoc(doc))
        }).catch(() => {
            setError('Failed to load profile info')
            console.log(error);
        })
    }, [])

    return ( 
        <div className="tweetear">
            <button id="tweetFromDiv" onClick={handleClick}>Tweet</button>
            <div ref={modalSignup} className="modal">
                <form className="modal-content" id="tweetModal" onSubmit={handleSubmit}>
                    <div id="topTweetModal">
                        <span onClick={handleClick} className="closeTweetModal" title="Close Modal">&times;</span>
                    </div>
                    <div className="container">
                    
                        <h4>{ profileInfo.name + ' ' + profileInfo.user }</h4>
                        <textarea placeholder="What's happening?" required value={body} onChange={(e) => setBody(e.target.value)}></textarea>
                    
                        <div className="clearfix">
                            <button type="button" onClick={handleClick} className="cancelbtn">Cancel</button>
                            <button type="submit" className="signupbtn" id="tweetearButtonModal">Tweetear</button>
                        </div>
                        { error && <div className="error">{error}</div> }
                    </div>
                </form>
            </div>
        </div>
     );
}
export default Tweetear;
