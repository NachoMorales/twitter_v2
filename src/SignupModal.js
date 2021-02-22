import React, { useRef, useState } from 'react'
import { useAuth } from './AuthContext'
import { useHistory } from 'react-router-dom';
import { database } from './Firebase';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTwitter } from '@fortawesome/free-brands-svg-icons'

export default function SignupModal() {
    const emailRef = useRef();
    const passwordRef = useRef();
    const passwordConfirmRef = useRef();
    const nameRef = useRef();
    const userRef = useRef();
    const bioRef = useRef();
    const { signup } = useAuth();
    const modalSignup = useRef();
    const firstPage = useRef();
    const secondPage = useRef();
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const history = useHistory();

    async function handleSubmit(e) {
        e.preventDefault()

        if (passwordRef.current.value !== passwordConfirmRef.current.value) {
            return setError('Passwords do not match')
        }

        try {
            setError('')
            setLoading(true)
            await signup(emailRef.current.value, passwordRef.current.value).then(cred => {
                return database.users
                .doc(cred.user.uid)
                .set({
                    user: userRef.current.value,
                    email: emailRef.current.value,
                    name: nameRef.current.value,
                    bio: bioRef.current.value,
                    createdAt: database.getCurrentTimestamp(),
                    followers: [],
                    following: [],
                    profilePicture: 'https://firebasestorage.googleapis.com/v0/b/twitterv2-development.appspot.com/o/Default_Profile_Picture%2Fdefault_profile_400x400.png?alt=media&token=49e9b4ff-fb2b-462a-9298-3eaa32a8a56b',
                    headerPicture: '',
                })
            }).then(() => {
                history.push(`/home`);
            })
        } catch {
            setError('Failed to create an account')
        }
        
        setLoading(false)
    }

    const handleClick = (status) => {
        if (status === 'open') {
            modalSignup.current.style.display = 'block'
            secondPage.current.style.display = 'none'
        }

        if (status === 'close') modalSignup.current.style.display = 'none'

        if (status === 'next') {
            firstPage.current.style.display = 'none'
            secondPage.current.style.display = 'block'
        }

        if (status === 'back') {
            firstPage.current.style.display = 'block'
            secondPage.current.style.display = 'none'
        }
    }

    return (
        <div className="signupDiv">
            <button className="signupButton" onClick={() => handleClick('open')}>Sign Up</button>
            <div ref={modalSignup} className="modal">
                <span onClick={() => handleClick('close')} className="close" title="Close Modal">&times;</span>
                <form className="modal-content" id="signupModal" onSubmit={handleSubmit}>
                    <div className="container" ref={firstPage}>

                        <div className="twitterIconDiv">
                            <FontAwesomeIcon icon={faTwitter} id="twitterIcon" />
                        </div>                        
                        
                        <h1>Create your account</h1>
                        <h5>Step 1 of 2</h5>
                        <br/>
                        <hr/> <br/>

                        <input type="text" ref={emailRef} placeholder="Enter Email" required />
                        <input type="password" ref={passwordRef} placeholder="Enter Password" required />
                        <input type="password" ref={passwordConfirmRef} placeholder="Repeat Password" required />

                        <br/>
                        <p>By signing up, you agree to the Terms of Service and Privacy Policy, including Cookie Use. Others will be able to find you by email or phone number when provided · Privacy Options.</p>
                        <br/>
                        <div className="clearfix">
                            <button type="button" onClick={() => handleClick('close')} className="cancelbtn">Cancel</button>
                            <button type="button" onClick={() => handleClick('next')} className="signupbtn" id="signupButtonModal">Next</button>
                        </div>

                        { error && <div className="error">{error}</div> }
                    </div>

                    <div className="container" ref={secondPage}>
                        <div className="twitterIconDiv">
                            <FontAwesomeIcon icon={faTwitter} id="twitterIcon" />
                        </div>
                        

                        <h1>Create your account</h1>
                        <h5>Step 2 of 2</h5> <br/>
                        <hr/> <br/>
                        <input type="text" ref={nameRef} placeholder="Name" />
                        <input type="text" ref={userRef} placeholder="User" />
                        <input type="text" ref={bioRef} placeholder="Bio" />
                        <br/>

                        <div className="clearfix">
                            <button type="button" onClick={() => handleClick('back')} className="cancelbtn">Back</button>
                            <button type="submit" className="signupbtn" id="signupButtonModal" disabled={loading}>Sign Up</button>
                        </div>
                        { error && <div className="error">{error}</div> }
                    </div>
                </form>
            </div>
        </div>
    )
}
