import { useEffect, useState } from 'react'
import { database } from './Firebase'

const GetUserDoc = function GetUserDoc(userId) {
    const [user, setUser] = useState([])

    useEffect(() => {
        let mounted = true

        database.users
        .doc(userId)
        .onSnapshot((doc) => {
            if (mounted) setUser(database.formatDoc(doc))
        })

        return () => mounted = false
    })

    return user
}

export default GetUserDoc;