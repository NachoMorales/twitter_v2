import React, { useEffect, useState } from 'react'
import { storage, database } from './Firebase'
import { useAuth } from './AuthContext'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCamera } from '@fortawesome/free-solid-svg-icons'
import icon from './avatar.jpg'

export default function AddFile({ typeOfImage }) {
    const { currentUser } = useAuth()
    const [loaded, setLoaded] = useState(true)

    function handleUpload(e) {
        const file = e.target.files[0]
        const userId = currentUser.uid        
        if (file == null) return

        const uploadTask = storage.ref(`/${userId}/${typeOfImage}`).put(file)

        uploadTask.on('state_changed', snapshot => {

        }, () => {

        }, () => {
            uploadTask.snapshot.ref.getDownloadURL().then(url => {
                database.files.add({
                    url: url,
                    name: file.name,
                    createdAt: database.getCurrentTimestamp(),
                    type: typeOfImage,
                    userId: userId,
                })
            })
        })
    }
    

    return (
        <div className="uploadPicture">
            <label>
                {!loaded && <img className="picture" src={icon} alt={typeOfImage} />}
                {loaded && <FontAwesomeIcon className="icon" icon={faCamera} size="lg" />}
                <input type="file" onChange={handleUpload} style={{ opacity: 0, position: "absolute", left: "-9999px" }} />
            </label>
        </div>
    )
}
