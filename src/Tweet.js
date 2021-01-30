import { useState, useEffect } from "react";
import { useHistory } from 'react-router-dom';
import { database } from './Firebase'
import { useAuth } from './AuthContext'

const Tweet = () => {
    const [body, setBody] = useState('');
    const history = useHistory();
    const { currentUser } = useAuth();
    const userId = currentUser.uid
    const [error, setError] = useState("");
    const [profileInfo, setProfileInfo] = useState([])




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
            history.push('/home');
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
        <div>
        <form onSubmit={handleSubmit}>
            <h4>{ profileInfo.name + ' ' + profileInfo.user }</h4>
            <label>Tweet</label>
            <textarea placeholder="What's happening?" required value={body} onChange={(e) => setBody(e.target.value)}></textarea>
            <button>Tweetear</button>
        </form>
        
        </div>
    )

        
    
}
 
export default Tweet;