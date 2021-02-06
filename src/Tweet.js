import { useState } from "react";
import { database } from './Firebase'
import { useAuth } from './AuthContext'
import GetUserDoc from "./GetUserDoc";
import UpdatePictures from "./UpdatePictures";

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
            <img id="profilePicture" src={UpdatePictures('Profile_Picture', userId)} alt="profile_picture"/>
            <div id="text-end">
                <textarea maxLength="280" placeholder="What's happening?" required value={body} onChange={(e) => setBody(e.target.value)} ></textarea>
                <button>Tweet</button>
            </div>
        </form>
        </div>
    )

        
    
}
 
export default Tweet;