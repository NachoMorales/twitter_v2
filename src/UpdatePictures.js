<<<<<<< HEAD
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

=======
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

>>>>>>> 2ce7aabb605b7d29f14503f2178f6eae0caaea7d
export default UpdatePictures;