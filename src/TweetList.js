import { Link } from "react-router-dom";
import React, { useEffect, useState } from 'react'
import { database } from './Firebase'
import { useAuth } from './AuthContext'
import UpdatePictures from './UpdatePictures'
import DeleteTweet from "./DeleteTweet";

const TweetList = props => {
    const [tweets, setTweets] = useState([])
    const [loaded, setLoaded] = useState(false);
    const { currentUser } = useAuth();

    const getTweets = async () => {
        if (props.user === 'all') {
            database.tweets
            .orderBy('createdAt', 'desc')
            .onSnapshot((querySnapshot) => {
                const docs = []
                querySnapshot.forEach(function(doc) {
                    docs.push(database.formatDoc(doc))
                });
            setTweets(docs)
            setLoaded(true)
            });
        } else {
            database.tweets
            .where('userId', '==', props.user)
            .orderBy('createdAt', 'desc')
            .onSnapshot((querySnapshot) => {
                const docs = []
                querySnapshot.forEach(function(doc) {
                    docs.push(database.formatDoc(doc))
                });
            props.getTotalTweets(docs.length)
            setTweets(docs)
            setLoaded(true)
            
            // TODO: export length to Profile.js to show TotalTweets
            // console.log(tweets.length)
            // export const totalTweets = (tweets.length) 
            });
        }
    }


    useEffect(() => {
        getTweets();
    }, []);


    return ( 
        <div className="tweet-list">
            { !loaded && <div>Loading...</div>}
            { loaded && <div> { tweets.map(tweet => (
                <div className="tweet-preview" key={tweet.id}>
                    { tweet.userId === currentUser.uid && <DeleteTweet tweet={tweet.id} /> }
                    <Link to={`/${tweet.user}/${tweet.id}`}>
                        {/* TODO: display profile pictures in tweets
                        <img id="profilePicture" src={UpdatePictures('Profile_Picture')} alt="profile_picture"/> */}
                        <div className="tweetUserInfo">
                            <h3> {tweet.name} </h3>
                            <p> {tweet.user} </p>
                        </div>
                        <h2> {tweet.tweet} </h2>
                    </Link>
                </div>
            )) }</div> }
        </div>
     );
}

export default TweetList;