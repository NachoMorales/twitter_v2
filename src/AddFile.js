import React, { useEffect, useState } from 'react'
import { storage, database } from './Firebase'
import { useAuth } from './AuthContext'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCamera } from '@fortawesome/free-solid-svg-icons'

export default function AddFile({ typeOfImage }) {
    const { currentUser } = useAuth()
    const [loaded, setLoaded] = useState(false)
    const [error, setError] = useState('')
    const userId = currentUser.uid
    const [fileInfo, setFileInfo] = useState('')
    

    function updatePictures(typeOfImage, userId) {
        database.files
        .where('userId', '==', userId)
        .where('type', '==', typeOfImage)
        .onSnapshot((querySnapshot) => {
            querySnapshot.forEach(function(doc) {
                let file = database.formatDoc(doc)
                setLoaded(true)
                setFileInfo(file.url)
            });
        })
    }


// Remove Checkpoints
    function handleUpload(e) {
        const file = e.target.files[0]
        
        const uploadTask = storage.ref(`/${userId}/${typeOfImage}`).put(file)
        
        uploadTask.on('state_changed', snapshot => {

        }, () => {

        }, () => {
            uploadTask.snapshot.ref.getDownloadURL().then(url => {
                console.log('checkpoint2')
                database.files.doc(userId+typeOfImage).get()
                .then((docSnapshot) => {
                    if (!docSnapshot.exists) {
                        database.files.doc(userId+typeOfImage).set({
                            url: url,
                            name: file.name,
                            createdAt: database.getCurrentTimestamp(),
                            type: typeOfImage,
                            userId: userId,
                        })
                        updatePictures(typeOfImage, userId)
                        setLoaded(true)
                    } else {
                        database.files.doc(userId+typeOfImage).update({
                            url: url,
                            name: file.name,
                            createdAt:database.getCurrentTimestamp(),
                            type: typeOfImage,
                            userId: userId,
                        })
                        updatePictures(typeOfImage, userId)
                        setLoaded(true)
                    }
                }).catch(() => {
                    setError('Failed to upload ' + typeOfImage + ' into database')
                    console.log(error)
                })
            })
        })
    }

    useEffect(() => {
        updatePictures(typeOfImage, userId)
    }, [])

    return (
        <div className={"uploadPicture"+typeOfImage}>
            { error && <h2>{ error }</h2>}
            <label>
                {loaded && <img className={"picture"+typeOfImage} src={fileInfo} alt={typeOfImage} />}
                {!loaded && <FontAwesomeIcon className={"icon"+typeOfImage} icon={faCamera} size="lg" />}
                <input type="file" onChange={handleUpload} style={{ opacity: 0, position: "absolute", left: "-9999px" }} />
            </label>
        </div>
    )
}
