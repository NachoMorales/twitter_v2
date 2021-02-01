import { useState } from 'react'
import { database } from './Firebase'
import { useAuth } from './AuthContext'


const UpdatePictures = function UpdatePictures(typeOfImage) {
    const { currentUser } = useAuth()
    const [fileInfo, setFileInfo] = useState([])

    database.files
        .where('userId', '==', currentUser.uid)
        .where('type', '==', typeOfImage)
        .get()
        .then(function(querySnapshot) {
            querySnapshot.forEach(function(doc) {
                setFileInfo(database.formatDoc(doc))
            });
        }).catch(() => {
            console.log('Failed to load profile info');
        })

    return fileInfo.url;
}

export default UpdatePictures;