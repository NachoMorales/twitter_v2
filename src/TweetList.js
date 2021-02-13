import { Link } from "react-router-dom";
import React, { useEffect, useState } from 'react'
import { database } from './Firebase'
import { useAuth } from './AuthContext'
import DeleteTweet from "./DeleteTweet";
import AnswerTweet from "./AnswerTweet";
import moment from 'moment'

const TweetList = props => {
    const [tweets, setTweets] = useState([])
    const [loaded, setLoaded] = useState(false);
    const { currentUser } = useAuth();
    const user = props.user;

    useEffect(() => {
        let mounted = true

        const getTweets = async () => {
            if (user === 'all') {
                database.tweets
                .orderBy('createdAt', 'desc')
                .onSnapshot((querySnapshot) => {
                    if (mounted) {
                        const docs = []
                        querySnapshot.forEach(function(doc) {
                            if (doc.createdAt === undefined) doc.createdAt = [2021];
                            docs.push(database.formatDoc(doc))
                        });
                        setTweets(docs)
                        setLoaded(true)
                    }
                });
            } else {
                database.tweets
                .where('userId', '==', user)
                .orderBy('createdAt', 'desc')
                .onSnapshot((querySnapshot) => {
                    if (mounted) {
                        const docs = []
                        querySnapshot.forEach(function(doc) {
                            if (doc.createdAt === undefined) doc.createdAt = [2021];
                            docs.push(database.formatDoc(doc))
                        });
                        props.getTotalTweets(docs.length)
                        setTweets(docs)
                        setLoaded(true)
                    }
                });
            }
        }
        getTweets();
        return () => mounted = false
    }, [user]);


    return ( 
        <div className="tweet-list">
            { !loaded && <div className="loading"></div>}
            { loaded && <div> { tweets.map(tweet => (
                <div className="tweet-preview" key={tweet.id}>
                    { tweet.userId === currentUser.uid && <DeleteTweet tweet={tweet.id} /> }
                    <Link to={`/user/${tweet.userId}/${tweet.id}`}>
                        {/* TODO: display profile pictures in tweets
                        <img id="profilePicture" src={UpdatePictures('Profile_Picture', tweet.userId)} alt="profile_picture"/> */}
                        <div className="tweetUserInfo">
                            <h3> {tweet.name} </h3>
                            <h5> {tweet.user + ' · ' + moment(tweet.createdAt.toDate()).fromNow(true)} </h5>
                        </div>
                        <p> {tweet.tweet} </p>
                    </Link>
                    <AnswerTweet {...tweet} />
                </div>
            )) }</div> }
        </div>
     );
}

export default TweetList;