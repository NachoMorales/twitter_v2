import { useState } from 'react'
import { database } from './Firebase'

const UpdatePictures = function UpdatePictures(typeOfImage, userId) {
    const [fileInfo, setFileInfo] = useState([])
    
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
            console.log('Failed to load '+ typeOfImage);
        })

    return fileInfo.url;
}

export default UpdatePictures;