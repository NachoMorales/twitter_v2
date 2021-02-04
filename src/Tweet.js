import { useState } from "react";
import { database } from './Firebase'
import { useAuth } from './AuthContext'
import GetUserDoc from "./GetUserDoc";

const Tweet = () => {
    const [body, setBody] = useState('');
    const { currentUser } = useAuth();
    const userId = currentUser.uid
    const profileInfo = GetUserDoc()



    const handleSubmit = (e) => {
        e.preventDefault();

        database.tweets.add({
            tweet: body,
            user: profileInfo.user,
            name: profileInfo.name,
            userId: userId,
            createdAt: database.getCurrentTimestamp(),
        })
    }

    return ( 
        <div>
        <form onSubmit={handleSubmit}>
            <h4>{ profileInfo.name + ' ' + profileInfo.user }</h4>
            <textarea placeholder="What's happening?" required value={body} onChange={(e) => setBody(e.target.value)} style={{ resize: "none" }}></textarea>
            <button>Tweetear</button>
        </form>
        
        </div>
    )

        
    
}
 
export default Tweet;