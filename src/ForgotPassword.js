import React, { useRef, useState } from 'react'
import { useAuth } from './AuthContext'
import { Link } from 'react-router-dom';

export default function ForgotPassword() {
    const emailRef = useRef();
    const { resetPassword } = useAuth();
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('')

    async function handleSubmit(e) {
        e.preventDefault()

        try {
            setMessage('')
            setError('');
            setLoading(true);
            await resetPassword(emailRef.current.value)
            setMessage('Check your inbox for further instructions')
        } catch {
            setError('Failed to reset password')
        }
        
        setLoading(false)
    }

    return (
        <div className="login">
            <form className="modal-content" onSubmit={handleSubmit}>
                <div className="container">
                    <h1>Find your Twitter account</h1>
                    <br/> <br/> <hr /> 
                    { error && <div className="error">{error}</div> }
                    { message && <div className="success">{message}</div> } 
                    <br/> 
                        
                    <label><b>Email</b></label>
                    <input type="text" ref={emailRef} placeholder="Enter Email" required />
                        <br/> <br/>
                    
                    <button type="submit" className="signupbtn" disabled={loading}>Search</button>
                    
                    
                </div>
                <div id="linksContainer">
                    <Link to="/login" className="links">Log in</Link>
                    <Link to="/" className="links">Sign up for Twitter</Link>
                </div>
            </form>
        </div>
    )
}
