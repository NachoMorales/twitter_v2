import { useState } from 'react'
import { database } from './Firebase'

const UpdatePictures = function UpdatePictures(typeOfImage, userId) {
    const [fileInfo, setFileInfo] = useState([])
    const [error, setError] = useState('')
    if (!userId) return

    database.files
        .where('userId', '==', userId)
        .where('type', '==', typeOfImage)
        .get()
        .then(function(querySnapshot) {
            querySnapshot.forEach(function(doc) {
                setFileInfo(database.formatDoc(doc))
            });
        }).catch(() => {
            setError('Failed to load '+ typeOfImage);
            return error
        })

    return fileInfo.url;
}

export default UpdatePictures;