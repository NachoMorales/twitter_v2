import { useEffect, useState } from 'react'
import { database } from './Firebase'
import firebase from "firebase/app"
import { useAuth } from './AuthContext'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRetweet, faHeart as faLike } from '@fortawesome/free-solid-svg-icons'
import { faHeart }  from '@fortawesome/free-regular-svg-icons'
import GetUserDoc from './GetUserDoc'
        
 
export default function HandleInteraction(props) {
    const { currentUser } = useAuth()
    const tweet = props.tweet
    const interaction = props.interaction
    const [status, setStatus] = useState(false)
    const user = GetUserDoc(currentUser.uid)
    
    function handleClick() {
        if (interaction === 'retweet') {
            if (status) {
                if (!props.notOriginal) {
                    database.tweets
                    .doc(tweet.id)
                    .update({
                        retweet: firebase.firestore.FieldValue.arrayRemove(currentUser.uid)
                    })
    
                    database.tweets
                    .doc(tweet.id+user.id+interaction)
                    .delete()
                    
                    database.tweets
                    .doc(tweet.id)
                    .collection('like')
                    .get()
                    .then(function(querySnapshot) {
                        querySnapshot.forEach(function(doc) {
                            if (doc.exists) {
                                database.tweets
                                .doc(tweet.id)
                                .collection('like')
                                .doc(doc.id)
                                .update({
                                    retweet: firebase.firestore.FieldValue.arrayRemove(currentUser.uid)
                                })
                            }
                        })
                    })
                    
    
                    setStatus(false)
                } else {
                    database.tweets
                    .doc(tweet.tweetId)
                    .update({
                        retweet: firebase.firestore.FieldValue.arrayRemove(currentUser.uid)
                    })
    
                    database.tweets
                    .doc(tweet.tweetId+user.id+interaction)
                    .delete()

                    database.tweets
                    .doc(tweet.tweetId)
                    .collection('like')
                    .get()
                    .then(function(querySnapshot) {
                        querySnapshot.forEach(function(doc) {
                            if (doc.exists) {
                                database.tweets
                                .doc(tweet.tweetId)
                                .collection('like')
                                .doc(doc.id)
                                .update({
                                    retweet: firebase.firestore.FieldValue.arrayRemove(currentUser.uid)
                                })
                            }
                        })
                    })
    
                    setStatus(false)
                }
            } else {
                if (!props.notOriginal) {
                    database.tweets
                    .doc(tweet.id)
                    .update({
                        retweet: firebase.firestore.FieldValue.arrayUnion(currentUser.uid)
                    })
                    
                    database.tweets
                    .doc(tweet.id+user.id+interaction)
                    .set({
                        interaction: interaction,
                        createdAt: database.getCurrentTimestamp(),
                        userId: user.id,
                        tweetId: tweet.id,

                        like: tweet.like,
                        retweet: tweet.retweet,

                        originalTweet: {
                            createdAt: tweet.createdAt,
                            name: tweet.name,
                            profilePicture: tweet.profilePicture,
                            tweet: tweet.tweet,
                            user: tweet.user,
                            userId: tweet.userId,
                        },

                        interactedBy: {
                            name: user.name,
                            user: user.user,
                            profilePicture: user.profilePicture,
                            bio: user.bio,
                        },
                    }).then(() => {
                        database.tweets
                        .where('tweetId','==',tweet.id)
                        .get()
                        .then(function(querySnapshot) {
                            querySnapshot.forEach(function(doc) {
                                if (doc.exists) {
                                    database.tweets
                                    .doc(doc.id)
                                    .update({
                                        retweet: firebase.firestore.FieldValue.arrayUnion(currentUser.uid)
                                    })
                                }
                            })
                        })

                        database.tweets
                        .doc(tweet.id)
                        .collection('like')
                        .get()
                        .then(function(querySnapshot) {
                            querySnapshot.forEach(function(doc) {
                                if (doc.exists) {
                                    database.tweets
                                    .doc(tweet.id)
                                    .collection('like')
                                    .doc(doc.id)
                                    .update({
                                        retweet: firebase.firestore.FieldValue.arrayUnion(currentUser.uid)
                                    })
                                }
                            })
                        })

                        setStatus(true)
                    })
                } else {
                    database.tweets
                    .doc(tweet.tweetId)
                    .update({
                        retweet: firebase.firestore.FieldValue.arrayUnion(currentUser.uid)
                    })
                    
                    database.tweets
                    .doc(tweet.tweetId+user.id+interaction)
                    .set({
                        interaction: interaction,
                        createdAt: database.getCurrentTimestamp(),
                        userId: user.id,
                        tweetId: tweet.tweetId,

                        like: tweet.like,
                        retweet: tweet.retweet,

                        originalTweet: {
                            createdAt: tweet.originalTweet.createdAt,
                            name: tweet.originalTweet.name,
                            profilePicture: tweet.originalTweet.profilePicture,
                            tweet: tweet.originalTweet.tweet,
                            user: tweet.originalTweet.user,
                            userId: tweet.originalTweet.userId,
                        },

                        interactedBy: {
                            name: user.name,
                            user: user.user,
                            profilePicture: user.profilePicture,
                            bio: user.bio,
                        },
                    }).then(() => {
                        database.tweets
                        .where('tweetId','==',tweet.tweetId)
                        .get()
                        .then(function(querySnapshot) {
                            querySnapshot.forEach(function(doc) {
                                if (doc.exists) {
                                    database.tweets
                                    .doc(doc.id)
                                    .update({
                                        retweet: firebase.firestore.FieldValue.arrayUnion(currentUser.uid)
                                    })
                                }
                            })
                        })
                        
                        database.tweets
                        .doc(tweet.tweetId)
                        .collection('like')
                        .get()
                        .then(function(querySnapshot) {
                            querySnapshot.forEach(function(doc) {
                                if (doc.exists) {
                                    database.tweets
                                    .doc(tweet.tweetId)
                                    .collection('like')
                                    .doc(doc.id)
                                    .update({
                                        retweet: firebase.firestore.FieldValue.arrayUnion(currentUser.uid)
                                    })
                                }
                            })
                        })

                        setStatus(true)
                    })
                }
            }
        } else {
            if (status) {
                if (!props.notOriginal) {
                    database.tweets
                    .doc(tweet.id)
                    .update({
                        like: firebase.firestore.FieldValue.arrayRemove(currentUser.uid)
                    })
    
                    database.tweets
                    .doc(tweet.id)
                    .collection(interaction)
                    .doc(user.id)
                    .delete()

                    database.tweets
                    .where('tweetId','==',tweet.id)
                    .get()
                    .then(function(querySnapshot) {
                        querySnapshot.forEach(function(doc) {
                            if (doc.exists) {
                                database.tweets
                                .doc(doc.id)
                                .update({
                                    like: firebase.firestore.FieldValue.arrayRemove(currentUser.uid)
                                })
                            }
                        })
                    })
    
                    setStatus(false)
                } else {
                    database.tweets
                    .doc(tweet.tweetId)
                    .update({
                        like: firebase.firestore.FieldValue.arrayRemove(currentUser.uid)
                    })
    
                    database.tweets
                    .doc(tweet.tweetId)
                    .collection(interaction)
                    .doc(user.id)
                    .delete()
                    
                    database.tweets
                    .where('tweetId','==',tweet.tweetId)
                    .get()
                    .then(function(querySnapshot) {
                        querySnapshot.forEach(function(doc) {
                            if (doc.exists) {
                                database.tweets
                                .doc(doc.id)
                                .update({
                                    like: firebase.firestore.FieldValue.arrayRemove(currentUser.uid)
                                })
                            }
                        })
                    })
    
                    setStatus(false)
                }
            } else {
                if (!props.notOriginal) {
                    database.tweets
                    .doc(tweet.id)
                    .update({
                        like: firebase.firestore.FieldValue.arrayUnion(currentUser.uid)
                    })
                    
                    database.tweets
                    .doc(tweet.id)
                    .collection(interaction)
                    .doc(user.id)
                    .set({
                        interaction: interaction,
                        createdAt: database.getCurrentTimestamp(),
                        tweetId: tweet.id,
                        userId: user.id,
                        
                        interactedBy: {
                            name: user.name,
                            user: user.user,
                            profilePicture: user.profilePicture,
                            bio: user.bio,
                        },

                        like: tweet.like,
                        retweet: tweet.retweet,
                        originalTweet: {
                            createdAt: tweet.createdAt,
                            name: tweet.name,
                            profilePicture: tweet.profilePicture,
                            tweet: tweet.tweet,
                            user: tweet.user,
                            userId: tweet.userId,
                        },
                    }).then(() => {
                        database.tweets
                        .doc(tweet.id)
                        .collection('like')
                        .get()
                        .then(function(querySnapshot) {
                            querySnapshot.forEach(function(doc) {
                                if (doc.exists) {
                                    database.tweets
                                    .doc(tweet.id)
                                    .collection('like')
                                    .doc(doc.id)
                                    .update({
                                        like: firebase.firestore.FieldValue.arrayUnion(currentUser.uid)
                                    })
                                }
                            })
                        })
                        
                        database.tweets
                        .where('tweetId','==',tweet.id)
                        .get()
                        .then(function(querySnapshot) {
                            querySnapshot.forEach(function(doc) {
                                if (doc.exists) {
                                    database.tweets
                                    .doc(doc.id)
                                    .update({
                                        like: firebase.firestore.FieldValue.arrayUnion(currentUser.uid)
                                    })
                                }
                            })
                        })
                        
                        setStatus(true)
                    })
                } else {
                    database.tweets
                    .doc(tweet.tweetId)
                    .update({
                        like: firebase.firestore.FieldValue.arrayUnion(currentUser.uid)
                    })
                    
                    // Change this
                    database.tweets
                    .doc(tweet.tweetId)
                    .collection(interaction)
                    .doc(user.id)
                    .set({
                        interaction: interaction,
                        createdAt: database.getCurrentTimestamp(),
                        userId: user.id,
                        tweetId: tweet.tweetId,

                        like: tweet.like,
                        retweet: tweet.retweet,

                        originalTweet: {
                            createdAt: tweet.originalTweet.createdAt,
                            name: tweet.originalTweet.name,
                            profilePicture: tweet.originalTweet.profilePicture,
                            tweet: tweet.originalTweet.tweet,
                            user: tweet.originalTweet.user,
                            userId: tweet.originalTweet.userId,
                        },

                        interactedBy: {
                            name: user.name,
                            user: user.user,
                            profilePicture: user.profilePicture,
                            bio: user.bio,
                        },
                    }).then(() => {                        
                        database.tweets
                        .doc(tweet.tweetId)
                        .collection('like')
                        .get()
                        .then(function(querySnapshot) {
                            querySnapshot.forEach(function(doc) {
                                if (doc.exists) {
                                    database.tweets
                                    .doc(tweet.tweetId)
                                    .collection('like')
                                    .doc(doc.id)
                                    .update({
                                        like: firebase.firestore.FieldValue.arrayUnion(currentUser.uid)
                                    })
                                }
                            })
                        })
                        
                        database.tweets
                        .where('tweetId','==',tweet.tweetId)
                        .get()
                        .then(function(querySnapshot) {
                            querySnapshot.forEach(function(doc) {
                                if (doc.exists) {
                                    database.tweets
                                    .doc(doc.id)
                                    .update({
                                        like: firebase.firestore.FieldValue.arrayUnion(currentUser.uid)
                                    })
                                }
                            })
                        })

                        setStatus(true)
                    })
                }
            }
        }
    }

    useEffect(() => {
        var mounted = true

        if (interaction === 'retweet') {
            tweet.retweet.forEach(rt => {
                if (mounted) {
                    if (rt === currentUser.uid) return setStatus(true)
                }
            })
        } else {
            tweet.like.forEach(lk => {
                if (mounted) {
                    if (lk === currentUser.uid) return setStatus(true)
                }
                
            })
        }

        return () => mounted = false
    }, [])
        
    return (
        <div className={`todo ${interaction}`} onClick={handleClick}> 
            { interaction === 'retweet' && !status && <div className="rt" style={{}}><FontAwesomeIcon icon={faRetweet} /> <h6>{tweet.retweet.length}</h6></div> }
            { interaction === 'retweet' && status && <div className="activeRt"><FontAwesomeIcon icon={faRetweet} /> <h6>{tweet.retweet.length}</h6></div> }
            { interaction === 'like' && !status && <div className="lk"><FontAwesomeIcon icon={faHeart} /> <h6>{tweet.like.length}</h6></div> }
            { interaction === 'like' && status && <div className="activeLk"><FontAwesomeIcon icon={faLike} /> <h6>{tweet.like.length}</h6></div> }            
        </div>
    )
}
