import React from 'react'
import { storage, database } from './Firebase'
import { useAuth } from './AuthContext'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCamera } from '@fortawesome/free-solid-svg-icons'
import GetUserDoc from './GetUserDoc'

export default function AddFile({ typeOfImage }) {
    const { currentUser } = useAuth()
    const userId = currentUser.uid
    const profileInfo = GetUserDoc(userId)
    


    function handleUpload(e) {
        const file = e.target.files[0]
        
        const uploadTask = storage.ref(`/${userId}/${typeOfImage}`).put(file)
        
        uploadTask.on('state_changed', snapshot => {

        }, () => {

        }, () => {
            uploadTask.snapshot.ref.getDownloadURL().then(url => {
                if (typeOfImage === 'Profile_Picture') {
                    database.users
                    .doc(userId)
                    .update({
                        profilePicture: url,
                    })
                } else if (typeOfImage === 'Header_Picture') {
                    database.users
                    .doc(userId)
                    .update({
                        headerPicture: url,
                    })
                }
            })
        })
    }


    return (
        <div className={"uploadPicture"+typeOfImage}>
            <label>
                {typeOfImage === 'Profile_Picture' && profileInfo.profilePicture && <img className={"picture"+typeOfImage} src={profileInfo.profilePicture} alt={typeOfImage} />}
                {typeOfImage === 'Header_Picture' && profileInfo.headerPicture && <img className={"picture"+typeOfImage} src={profileInfo.headerPicture} alt={typeOfImage} />}
                {typeOfImage === 'Profile_Picture' && !profileInfo.profilePicture && <FontAwesomeIcon className={"icon"+typeOfImage} icon={faCamera} size="lg" />}
                {typeOfImage === 'Header_Picture' && !profileInfo.headerPicture && <FontAwesomeIcon className={"icon"+typeOfImage} icon={faCamera} size="lg" />}
                <input type="file" onChange={handleUpload} style={{ opacity: 0, position: "absolute", left: "-9999px" }} />
            </label>
        </div>
    )
}
