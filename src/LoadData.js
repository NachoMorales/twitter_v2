import { useEffect, useReducer } from "react";

const ACTIONS = {
    SELECT_TWEET: 'select-tweet'
}

function reducer(state, { type, payload }) {
    switch (type) {
        case ACTIONS.SELECT_TWEET:
            return {
                tweetId: payload.tweetId,
                tweet: payload.tweet,
                files: []
            }
        default:
            return state
    }
}

export function LoadData(tweetId = null, tweet = null) {
    const [state, dispatch] = useReducer(reducer, {
        tweetId,
        tweet,
        files: []
    })

    useEffect(() => {
        dispatch({ type: ACTIONS.SELECT_TWEET, payload: { tweetId, tweet } })
    }, [tweetId, tweet])

    useEffect(() => {
        if (tweetId == null) {
            return
        }
    }, [tweetId])

    return state
}

