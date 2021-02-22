import React from 'react'
import { database } from './Firebase'

export default function DeleteTweet(Tweet) {
    
    const handleClick = () => {
        const tweet = Tweet.tweet
        if (window.confirm(`Are you sure you want to delete this tweet?`)) {
            if (tweet.retweet !== 0) {
                tweet.retweet.forEach((rt) => {
                    database.tweets
                    .doc(tweet.id+rt+'retweet')
                    .delete()
                })
            } 
            if (tweet.like !== 0) {
                tweet.like.forEach((lk) => {
                    database.tweets
                    .doc(tweet.id+lk+'like')
                    .delete()
                })
            }
            database.tweets.doc(tweet.id).delete()
        }
    }
    return (
        <div>
            <span onClick={handleClick} className="close" id='deleteTweet'>&times;</span>
        </div>
    )
}
