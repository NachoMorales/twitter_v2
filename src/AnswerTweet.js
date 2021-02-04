import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faComment } from '@fortawesome/free-solid-svg-icons'

export default function AnswerTweet() {
    
    const handleClick = () => {
        return
    }

    return (
        <div>
            <FontAwesomeIcon icon={faComment} onClick={handleClick} />
        </div>
    )
}
