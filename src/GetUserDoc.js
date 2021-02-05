import { useState } from 'react'
import { database } from './Firebase'
import { useAuth } from './AuthContext'

const GetUserDoc = function GetUserDoc(userId) {
    const { currentUser } = useAuth();
    const [user, setUser] = useState([])
    const [error, setError] = useState('')

    if (!userId) {
        database.users
        .doc(currentUser.uid)
        .get()
        .then(doc => {
            setUser(database.formatDoc(doc))
        }).catch(() => {
            setError('Failed to load profile info')
            return error
        })
    } else {
        database.users
        .doc(userId)
        .get()
        .then(doc => {
            setUser(database.formatDoc(doc))
        }).catch(() => {
            setError('Failed to load profile info')
            return error
        })
    }

    return user;
}

export default GetUserDoc;