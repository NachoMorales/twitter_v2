import React, { useState, useRef } from 'react'
import { useAuth } from './AuthContext'
import { Link } from 'react-router-dom'
import { database } from './Firebase'
import AddFile from './AddFile'
import GetUserDoc from './GetUserDoc'

export default function EditProfile() {
    const [error, setError] = useState("");
    const nameRef = useRef();
    const userRef = useRef();
    const bioRef = useRef();
    const emailRef = useRef();
    const { currentUser, updateEmail } = useAuth();
    const [loading, setLoading] = useState(false);
    const userId = currentUser.uid
    const modalSignup = useRef();
    const profileInfo = GetUserDoc()

    function handleSubmit(e) {
        e.preventDefault()

        const promises = []
        setLoading(true)
        setError('')
        
        if (emailRef.current.value !== currentUser.email) {
            promises.push(updateEmail(emailRef.current.value))
        }
        
        promises.push(database.users.doc(userId).set({
            user: userRef.current.value,
            email: emailRef.current.value,
            name: nameRef.current.value,
            bio: bioRef.current.value,
            createdAt: database.getCurrentTimestamp(),
        }))

        Promise.all(promises).then(() => {
            setLoading(false)
            handleClick()
        }).catch(() => {
            setError('Failed to update account')
        })
    }


    const handleClick = () => {
        if (modalSignup.current.style.display === 'none' || modalSignup.current.style.display === '') {
            modalSignup.current.style.display = 'block';
        } else {
            modalSignup.current.style.display = 'none';
        }
    }


    return (
            <div className="editProfileDiv">
                <button className="editProfile" onClick={handleClick}>Edit profile</button>
                <div ref={modalSignup} className="modal">
                    <form className="modal-content" onSubmit={handleSubmit}>
                        <div className="container">
                            <span onClick={handleClick} className="close" title="Close Modal">&times;</span>
                            <h1>Edit Profile</h1>
                            { error && <div>{error}</div> }
                            { !currentUser && 
                                <div>
                                    <strong>Error: No user loged in.</strong>
                                    <br/>
                                    <Link to="/login" className="links">Log in</Link>
                                </div>}
                            
                            { currentUser && <div>
                                <br/> <hr /> <br/> 

                                <div className="changeProfilePicture">
                                    <AddFile typeOfImage={'Header_Picture'} />
                                    <AddFile typeOfImage={'Profile_Picture'} />
                                </div>
                                <br/>

                                <label><b>Email</b></label>
                                <input type="text" ref={emailRef} required defaultValue={currentUser.email} />

                                <label><b>Name</b></label>
                                <input type="text" ref={nameRef} placeholder="Your name" defaultValue={profileInfo.name} required />

                                <label><b>User Name</b></label>
                                <input type="text" ref={userRef} placeholder="Enter User Name" defaultValue={profileInfo.user} required />

                                <label><b>Describe yourself</b></label>
                                <input type="text" placeholder="Your bio" ref={bioRef} defaultValue={profileInfo.bio} />

                                <br/>
                                {loading && <button disabled={true} className="signupbtn">Saving...</button>}
                                {!loading && <button type="submit" className="signupbtn">Save</button>}
                                { error && <div className="error">{error}</div> }
                                </div>}
                        </div>
                    </form>
                </div>
            </div>
    )
}