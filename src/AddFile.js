import React, { useEffect, useState } from 'react'
import { storage, database } from './Firebase'
import { useAuth } from './AuthContext'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCamera } from '@fortawesome/free-solid-svg-icons'

export default function AddFile({ typeOfImage }) {
    const { currentUser } = useAuth()
    const [loaded, setLoaded] = useState(false)
    const [error, setError] = useState('')
    const [fileInfo, setFileInfo] = useState([])
    const userId = currentUser.uid
    

    function updatePictures(userId, typeOfImage) {
        database.files
        .where('userId', '==', userId)
        .where('type', '==', typeOfImage)
        .onSnapshot((querySnapshot) => {
            querySnapshot.forEach(function(doc) {
                setFileInfo(database.formatDoc(doc))
                setLoaded(true)
            });
        })
    }


// Remove Checkpoints
    function handleUpload(e) {
        console.log(typeOfImage+' starting')
        const file = e.target.files[0]
        console.log(file)
        
        const uploadTask = storage.ref(`/${userId}/${typeOfImage}`).put(file)
        
        console.log('checkpoint1')
        
        uploadTask.on('state_changed', snapshot => {

        }, () => {

        }, () => {
            uploadTask.snapshot.ref.getDownloadURL().then(url => {
                console.log('checkpoint2')
                database.files.doc(userId+typeOfImage).get()
                .then((docSnapshot) => {
                    if (!docSnapshot.exists) {
                        console.log( typeOfImage + ' doesnt exists')
                        database.files.doc(userId+typeOfImage).set({
                            url: url,
                            name: file.name,
                            createdAt: database.getCurrentTimestamp(),
                            type: typeOfImage,
                            userId: userId,
                        })
                        console.log('checkpoint 3')
                        updatePictures(userId, typeOfImage);
                        console.log('checkpoint 4')
                    } else {
                        console.log(typeOfImage+' exists')
                        database.files.doc(userId+typeOfImage).update({
                            url: url,
                            name: file.name,
                            createdAt:database.getCurrentTimestamp(),
                            type: typeOfImage,
                            userId: userId,
                        })
                        console.log(typeOfImage+' updated on database')
                        updatePictures(userId, typeOfImage);
                        console.log(typeOfImage+' updated on webpage')
                    }
                }).catch(() => {
                    setError('Failed to upload ' + typeOfImage + ' into database')
                    console.log(error)
                })
                

            })
        })
    }
    useEffect(() => {
        updatePictures(userId, typeOfImage);
    }, [])
    

    return (
        <div className={"uploadPicture"+typeOfImage}>
            { error && <h2>{ error }</h2>}
            <label>
                {loaded && <img className={"picture"+typeOfImage} src={fileInfo.url} alt={typeOfImage} />}
                {!loaded && <FontAwesomeIcon className={"icon"+typeOfImage} icon={faCamera} size="lg" />}
                <input type="file" onChange={handleUpload} style={{ opacity: 0, position: "absolute", left: "-9999px" }} />
            </label>
        </div>
    )
}
