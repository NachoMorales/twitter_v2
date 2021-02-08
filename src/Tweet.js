<<<<<<< HEAD
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
    const url = UpdatePictures('Profile_Picture', userId);

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
            { !url && <div className="loading" id="profilePictureLoader"></div>}
            { url && <img id="profilePicture" src={url} alt="profile_picture"/>}
            <div id="text-end">
                <textarea id="tweetTextarea" maxLength="280" placeholder="What's happening?" required value={body} onChange={(e) => setBody(e.target.value)} ></textarea>
                <button>Tweet</button>
            </div>
        </form>
        </div>
    )

        
    
}
 
=======
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
                <textarea id="tweetTextarea" maxLength="280" placeholder="What's happening?" required value={body} onChange={(e) => setBody(e.target.value)} ></textarea>
                <button>Tweet</button>
            </div>
        </form>
        </div>
    )

        
    
}
 
>>>>>>> 2ce7aabb605b7d29f14503f2178f6eae0caaea7d
export default Tweet;