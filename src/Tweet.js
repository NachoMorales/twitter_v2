import { useState } from "react";
import { database } from './Firebase'
import { useAuth } from './AuthContext'
import GetUserDoc from "./GetUserDoc";

const Tweet = () => {
    const [body, setBody] = useState('');
    const { currentUser } = useAuth();
    const userId = currentUser.uid
    const profileInfo = GetUserDoc(currentUser.uid)
    const [loaded, setLoaded] = useState(true)
    const [error, setError] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoaded(false);

        database.tweets.add({
            tweet: body,
            user: profileInfo.user,
            name: profileInfo.name,
            userId: userId,
            createdAt: database.getCurrentTimestamp(),
        }).then(() => {
            setBody('');
            setLoaded(true)
        }).catch((e) => {
            setError(e)
        })
    }


    return ( 
        <div>
        <form onSubmit={handleSubmit}>
            { !profileInfo && <div className="loading" id="profilePictureLoader"></div>}
            { profileInfo && <img id="profilePicture" src={profileInfo.profilePicture} alt="profile_picture"/>}
            <div id="text-end">
                <textarea id="tweetTextarea" maxLength="280" placeholder="What's happening?" required value={body} onChange={(e) => setBody(e.target.value)} ></textarea>
                { loaded && <button>Tweet</button> }
                { !loaded && <button disabled>Tweeting</button> }
            </div>
        </form>
        { error && <div> { error } </div>}
        </div>
    )

        
    
}
 
export default Tweet;