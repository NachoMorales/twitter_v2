import { database } from './Firebase'
import firebase from "firebase/app"

const HandleFollow = function HandleFollow(user, bool, currentUser) {
    if (!user || !currentUser) return

    if (bool === true) {
        database.users
        .doc(currentUser)
        .update({
            following: firebase.firestore.FieldValue.arrayUnion(user)
        })
        database.users
        .doc(user)
        .update({
            followers: firebase.firestore.FieldValue.arrayUnion(currentUser.uid)
        })

    } else {
        database.users
        .doc(currentUser)
        .update({
            following: firebase.firestore.FieldValue.arrayRemove(user)
        })
        database.users
        .doc(user)
        .update({
            followers: firebase.firestore.FieldValue.arrayRemove(currentUser.uid)
        })
    }

    return
}

export default HandleFollow;