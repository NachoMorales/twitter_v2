import React from 'react'
import { database } from './Firebase'

export default function DeleteTweet(tweet) {
    
    const handleClick = async (id) => {
        if (window.confirm('Are you sure you want to delete this tweet?')) {
            await database.tweets.doc(id).delete()
        }
    }
    return (
        <div>
            <span onClick={() => handleClick(tweet)} className="close" id='deleteTweet'>&times;</span>
        </div>
    )
}
