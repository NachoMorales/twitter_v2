import { Link } from "react-router-dom";
import React, { useEffect, useState } from 'react'
import { database } from './Firebase'
import { useAuth } from './AuthContext'
import DeleteTweet from "./DeleteTweet";
import AnswerTweet from "./AnswerTweet";
import moment from 'moment'
import GetUserDoc from "./GetUserDoc";
import Tweetear from "./Tweetear";
import HandleInteraction from "./HandleInteraction";

const TweetList = props => {
    const [tweets, setTweets] = useState([])
    const [loaded, setLoaded] = useState(false);
    const { currentUser } = useAuth();
    const [error, setError] = useState('')
    const user = GetUserDoc(props.userId);
    const [isCurrent, setIsCurrent] = useState(false)


    useEffect(() => {
        let mounted = true

        const getTweets = async () => {
            if (props.userId === currentUser.uid) setIsCurrent(true)

            if (props.filter === 'home') {
                if (!user.following) {
                    return
                }
                var follows = user.following
                follows.push(currentUser.uid)

                database.tweets
                .where('userId','in',follows)
                .orderBy('createdAt','desc')
                .onSnapshot((querySnapshot) => {
                    if (mounted) {
                        var docs = []
                        querySnapshot.forEach(function(doc) {
                            if (!doc.data().createdAt && querySnapshot.metadata.hasPendingWrites) {
                                return
                            }
                                docs.push(database.formatDoc(doc))
                        })
                        setTweets(docs)
                        setLoaded(true)

                        if (docs.length === 0) {
                            setError(<div className="notFound">
                                <h3>{'Welcome to Twitter!'}</h3> 
                                <br/> 
                                <h5>{ 'This is the best place to see what’s happening in your world. Find some people and topics to follow now.'}</h5>
                                <br/> 
                                <Link to={'/connect'}>
                                    <button>Let´s Go!</button>
                                </Link> 
                            </div>)
                        } else {
                            setError('')
                        }
                    }
                })
                    

            } else if (props.filter === 'profile') {
                database.tweets
                .where('userId', '==', props.userId)
                .orderBy('createdAt', 'desc')
                .onSnapshot((querySnapshot) => {
                    if (mounted) {
                        var docs = []
                        querySnapshot.forEach(function(doc) {
                            if (!doc.data().createdAt && querySnapshot.metadata.hasPendingWrites) {
                                return
                            } 
                            docs.push(database.formatDoc(doc))
                        })
                        props.getTotalTweets(docs.length)
                        setTweets(docs)
                        setLoaded(true)
                        
                        if (docs.length === 0) {
                            if (isCurrent) {
                                setError(<div className="notFound">
                                    <h3>{'You haven’t Tweeted yet'}</h3>
                                    <br/> 
                                    <h5>{ 'When you post a Tweet, it’ll show up here.' }</h5> 
                                    <br/> 
                                    <Tweetear/> 
                                </div>)
                            } else {
                                setError(<div className="notFound">
                                    <h3>{`${user.user} hasn´t Tweeted yet`}</h3>
                                    <br/> 
                                    <h5>{ 'When they do, those Tweets will show up here.' }</h5> 
                                    <br/> 
                                </div>)
                            }
                        } else {
                            setError('')
                        }
                    }
                })
            } else if (props.filter === 'likes') {
                database.likes
                .where('userId','==',props.userId)
                .orderBy('createdAt', 'desc')
                .onSnapshot((querySnapshot) => {
                    if (mounted) {
                        var docs = []
                        querySnapshot.forEach(function(doc) {
                            if (!doc.data().createdAt && querySnapshot.metadata.hasPendingWrites) {
                                return
                            } 
                            docs.push(database.formatDoc(doc))
                        })
                        props.getTotalTweets(docs.length)
                        setTweets(docs)
                        setLoaded(true)
                        
                        if (docs.length === 0) {
                            if (isCurrent) {
                                setError(<div className="notFound">
                                    <h3>{'You don’t have any likes yet'}</h3>
                                    <br/> 
                                    <h5>{ 'Tap the heart on any Tweet to show it some love. When you do, it’ll show up here.' }</h5> 
                                    <br/> 
                                </div>)
                            } else {
                                setError(<div className="notFound">
                                    <h3>{`${user.user} hasn´t liked any Tweets`}</h3>
                                    <br/> 
                                    <h5>{ 'When they do, those Tweets will show up here.' }</h5> 
                                    <br/> 
                                </div>)
                            }
                        } else {
                            setError('')
                        }
                    }
                })
            } else if (props.filter === 'replies') {
                database.answers
                .where('userId','==',props.userId)
                .orderBy('createdAt','desc')
                .onSnapshot((querySnapshot) => {
                    if (mounted) {
                        var docs = []
                        querySnapshot.forEach(function(doc) {
                            if (!doc.data().createdAt && querySnapshot.metadata.hasPendingWrites) {
                                return
                            } 
                            docs.push(database.formatDoc(doc))
                        })
                        props.getTotalTweets(docs.length)
                        setTweets(docs)
                        setLoaded(true)
                        
                        if (docs.length === 0) {
                            if (isCurrent) {
                                setError(<div className="notFound">
                                    <h3>{'You haven’t replied any Tweet yet'}</h3>
                                    <br/> 
                                    <h5>{ 'When you do, it’ll show up here.' }</h5> 
                                    <br/> 
                                    <Tweetear/> 
                                </div>)
                            } else {
                                setError(<div className="notFound">
                                    <h3>{`${user.user} hasn´t replied any Tweet yet`}</h3>
                                    <br/> 
                                    <h5>{ 'When they do, those Tweets will show up here.' }</h5> 
                                    <br/> 
                                </div>)
                            }
                        } else {
                            setError('')
                        }
                    }
                    
                })
            } else if (props.filter === 'media') {
                database.likes
                .where('userId','==',props.userId)
                .orderBy('createdAt', 'desc')
                .onSnapshot((querySnapshot) => {
                    if (mounted) {
                        var docs = []
                        querySnapshot.forEach(function(doc) {
                            if (!doc.data().createdAt && querySnapshot.metadata.hasPendingWrites) {
                                return
                            } 
                            docs.push(database.formatDoc(doc))
                        })
                        props.getTotalTweets(docs.length)
                        setTweets(docs)
                        setLoaded(true)
                        
                        if (docs.length === 0) {
                            if (isCurrent) {
                                setError(<div className="notFound">
                                    <h3>{'You haven’t Tweeted any photos or videos yet'}</h3>
                                    <br/> 
                                    <h5>{ 'When you send Tweets with photos or videos in them, it will show up here.' }</h5> 
                                    <br/> 
                                    <Tweetear/> 
                                </div>)
                            } else {
                                setError(<div className="notFound">
                                    <h3>{`${user.user} hasn´t Tweeted any photos or videos`}</h3>
                                    <br/> 
                                    <h5>{ 'When they do, their media will show up here.' }</h5> 
                                    <br/> 
                                </div>)
                            }
                        } else {
                            setError('')
                        }

                        if (docs.length === 0) {
                            setError(<div className="notFound">
                                
                            </div>)
                        } else {
                            setError('')
                        }
                    }
                })
            }
        }
        if (!loaded) getTweets();
        return () => mounted = false
    }, [user]);


    return ( 
        <div className="tweet-list">
            { !loaded && <div className="loading"></div>}
            { error && <div>{ error }</div> }
            { loaded && <div> { tweets.map((tweet, i) => (
                <div className="tweet-preview" key={tweet.id+i}>
                    { !tweet.interaction && !tweet.answerTo && <div className="flex">
                        { tweet.userId === currentUser.uid && <DeleteTweet tweet={tweet} /> }
                        <div className="tweetPicture">
                            <Link to={`/user/${tweet.userId}`}>
                                <img className="tweetProfilePicture" src={tweet.profilePicture} alt="profile_picture"/>
                            </Link>
                        </div>
                        <div className="tweetBody">
                            <Link to={`/user/${tweet.userId}`}>
                                <div className="tweetUserInfo">
                                    <h3> {tweet.name} </h3>
                                    <h5> {tweet.user + ' · ' + moment(tweet.createdAt.toDate()).fromNow(true)} </h5>
                                </div>
                            </Link>
                            <Link to={`/user/${tweet.userId}/${tweet.id}`}>
                                <p> {tweet.tweet} </p>
                            </Link>
                            <div className="tweetBottom">
                                <AnswerTweet {...tweet} />

                                <HandleInteraction tweet={tweet} interaction='retweet' />

                                <HandleInteraction tweet={tweet} interaction='like' />
                            </div>
                        </div>
                    </div>}
                    
                    { tweet.answerTo && <div className="flex">
                        { tweet.userId === currentUser.uid && <DeleteTweet tweet={tweet} /> }
                        <div className="tweetPicture">
                            <Link to={`/user/${tweet.userId}`}>
                                <img className="tweetProfilePicture" src={tweet.profilePicture} alt="profile_picture"/>
                            </Link>
                        </div>
                        <div className="tweetBody">
                            <Link to={`/user/${tweet.userId}`}>
                                <div className="tweetUserInfo">
                                    <h3> {tweet.name} </h3>
                                    <h5> {tweet.user + ' · ' + moment(tweet.createdAt.toDate()).fromNow(true)} </h5>
                                </div>
                            </Link>
                            <Link to={`/user/${tweet.userId}/${tweet.id}`}>
                                <p> {tweet.tweet} </p>
                            </Link>
                            <div className="tweetBottom">
                                <AnswerTweet {...tweet} />

                                {/* <HandleInteraction tweet={tweet} interaction='retweet' />

                                <HandleInteraction tweet={tweet} interaction='like' /> */}
                            </div>
                        </div>
                    </div>}

                    { tweet.interaction === 'retweet' && <div> 
                        <h4> {`${tweet.interaction} by ${tweet.interactedBy.name}`} </h4>
                        <div className="flex">
                            <div className="tweetPicture">
                                <Link to={`/user/${tweet.originalTweet.userId}`}>
                                    <img className="tweetProfilePicture" src={tweet.originalTweet.profilePicture} alt="profile_picture"/>
                                </Link>
                            </div>
                            <div className="tweetBody">
                                <Link to={`/user/${tweet.originalTweet.userId}`}>
                                    <div className="tweetUserInfo">
                                        <h3> {tweet.originalTweet.name} </h3>
                                        <h5> {tweet.originalTweet.user + ' · ' + moment(tweet.originalTweet.createdAt.toDate()).fromNow(true)} </h5>
                                    </div>
                                </Link>
                                <Link to={`/user/${tweet.originalTweet.userId}/${tweet.tweetId}`}>
                                    <p> {tweet.originalTweet.tweet} </p>
                                </Link>
                                <div className="tweetBottom">
                                    <AnswerTweet {...tweet} />

                                    <HandleInteraction tweet={tweet} interaction='retweet' notOriginal={true} />

                                    <HandleInteraction tweet={tweet} interaction='like' notOriginal={true} />
                                </div>
                            </div>
                        </div>
                    </div> }

                    { tweet.interaction === 'like' && <div> 
                        <h4> {`${tweet.interaction} by ${tweet.interactedBy.name}`} </h4>
                        <div className="flex">
                            <div className="tweetPicture">
                                <Link to={`/user/${tweet.originalTweet.userId}`}>
                                    <img className="tweetProfilePicture" src={tweet.originalTweet.profilePicture} alt="profile_picture"/>
                                </Link>
                            </div>
                            <div className="tweetBody">
                                <Link to={`/user/${tweet.originalTweet.userId}`}>
                                    <div className="tweetUserInfo">
                                        <h3> {tweet.originalTweet.name} </h3>
                                        <h5> {tweet.originalTweet.user + ' · ' + moment(tweet.originalTweet.createdAt.toDate()).fromNow(true)} </h5>
                                    </div>
                                </Link>
                                <Link to={`/user/${tweet.originalTweet.userId}/${tweet.tweetId}`}>
                                    <p> {tweet.originalTweet.tweet} </p>
                                </Link>
                                <div className="tweetBottom">
                                    <AnswerTweet {...tweet} />

                                    <HandleInteraction tweet={tweet} interaction='retweet' notOriginal={true} />

                                    <HandleInteraction tweet={tweet} interaction='like' notOriginal={true} />
                                </div>
                            </div>
                        </div>
                    </div> }
                </div>
            )) }</div> }
        </div>
     );
}

export default TweetList;