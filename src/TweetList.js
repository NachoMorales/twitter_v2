import { Link } from "react-router-dom";
import React, { useEffect, useState } from 'react'
import { database } from './Firebase'

const TweetList = () => {

    const [error, setError] = useState("")
    const tweets = [];
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        database.tweets.get().then(function(querySnapshot) {
            querySnapshot.forEach(function(doc) {
                
                tweets.push(doc.data())
                
            });
            setLoaded(true)
            
        }).catch(() => {
            setError('Error loading tweets')
        })
    }, [])

    return ( 
        <div className="tweet-list">
            { error && <div>{ error }</div>}
            { !loaded && <div>Loading...</div>}
            { loaded && <div> { tweets.map((tweets, index) => (
                <div className="tweet-preview" key={tweets.id}>
                    <Link to={`/tweets/${tweets.id}`}>
                        <h3>{ tweets.user }</h3>
                        <h2>{ tweets.tweet }</h2>
                        <h5>{ tweets.createdAt}</h5>
                    </Link>
                </div>
            )) } </div> }
        </div>
     );
}
 
export default TweetList;