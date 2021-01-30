import React, { useRef, useState } from 'react'
import { useAuth } from './AuthContext'
import { useHistory } from 'react-router-dom';

export default function SignupModal() {
    const emailRef = useRef();
    const passwordRef = useRef();
    const passwordConfirmRef = useRef();
    const { signup } = useAuth();
    const modalSignup = useRef();
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
            await signup(emailRef.current.value, passwordRef.current.value)
            history.push("/edit-profile");
        } catch {
            setError('Failed to create an account')
        }
        
        setLoading(false)
    }

    const handleClick = () => {
        if (modalSignup.current.style.display === 'none' || modalSignup.current.style.display === '') {
            modalSignup.current.style.display = 'block';
        } else {
            modalSignup.current.style.display = 'none';
        }
    }

    return (
        <div className="signupDiv">
            <button className="signupButton" onClick={handleClick}>Sign Up</button>
            <div ref={modalSignup} className="modal">
                <span onClick={handleClick} className="close" title="Close Modal">&times;</span>
                <form className="modal-content" id="signupModal" onSubmit={handleSubmit}>
                    <div className="container">
                        <h1>Sign Up</h1> <br/>
                        <p>Please fill in this form to create an account.</p>
                        <br/> <hr /> <br/>
                        <label><b>Email</b></label>
                        <input type="text" ref={emailRef} placeholder="Enter Email" required />

                        <label><b>Password</b></label>
                        <input type="password" ref={passwordRef} placeholder="Enter Password" required />

                        <label><b>Repeat Password</b></label>
                        <input type="password" ref={passwordConfirmRef} placeholder="Repeat Password" required />

                        <br/>
                        <p>By signing up, you agree to the Terms of Service and Privacy Policy, including Cookie Use. Others will be able to find you by email or phone number when provided · Privacy Options.</p>
                        <br/>
                        <div className="clearfix">
                            <button type="button" onClick={handleClick} className="cancelbtn">Cancel</button>
                            <button type="submit" className="signupbtn" id="signupButtonModal" disabled={loading}>Sign Up</button>
                        </div>
                        { error && <div className="error">{error}</div> }
                    </div>
                </form>
            </div>
        </div>
    )
}
