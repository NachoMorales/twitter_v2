import React, { useState, useRef, useEffect } from 'react'
import { useAuth } from './AuthContext'
import { Link, useHistory } from 'react-router-dom'
import { database } from './Firebase'
import Navbar from './Navbar'
import AddFile from './AddFile'

export default function EditProfile() {
    const [error, setError] = useState("");
    const [name, setName] = useState('');
    const [user, setUser] = useState('');
    const [bio, setBio] = useState('');
    const { currentUser, updateEmail } = useAuth();
    const history = useHistory();
    const emailRef = useRef();
    const [loading, setLoading] = useState(false);
    const userId = currentUser.uid
    const [profileInfo, setProfileInfo] = useState([])
    const modalSignup = useRef();

    function handleSubmit(e) {
        e.preventDefault()

        database.users.doc(userId).set({
            user: user,
            email: emailRef.current.value,
            name: name,
            bio: bio,
            createdAt: database.getCurrentTimestamp(),
        })



        const promises = []
        setLoading(true)
        setError('')
        if (emailRef.current.value !== currentUser.email) {
            promises.push(updateEmail(emailRef.current.value))
        }

        Promise.all(promises).then(() => {
            history.push('/profile')
        }).catch(() => {
            setError('Failed to update account')
        }).finally(() => {
            setLoading(false)
        })
    }
    useEffect(() => {
        database.users.doc(userId).get().then(doc => {
            setProfileInfo(database.formatDoc(doc))
        }).catch(() => {
            setError('Failed to load profile info')
        })
    }, [])

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
                                <input type="text" onChange={e => setName(e.target.value)} placeholder="Your name" defaultValue={profileInfo.name} required />

                                <label><b>User Name</b></label>
                                <input type="text" onChange={e => setUser(e.target.value)} placeholder="Enter User Name" defaultValue={profileInfo.user} required />

                                <label><b>Describe yourself</b></label>
                                <input type="text" placeholder="Your bio" onChange={e => setBio(e.target.value)} defaultValue={profileInfo.bio} />

                                <br/>
        
                                <button type="submit" className="signupbtn" disabled={loading}>Save</button>
                                { error && <div className="error">{error}</div> }
                                </div>}
                        </div>
                    </form>
                </div>
            </div>
    )
}