import React, { useRef, useState } from 'react'
import { useAuth } from './AuthContext'
import { Link, useHistory } from 'react-router-dom';
import SignupModal from './SignupModal';

export default function Login() {
    const emailRef = useRef();
    const passwordRef = useRef();
    const { login } = useAuth();
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const history = useHistory();

    async function handleSubmit(e) {
        e.preventDefault()

        try {
            setError('');
            setLoading(true);
            await login(emailRef.current.value, passwordRef.current.value)
            history.push("/home");
        } catch {
            setError('Failed to log in')
            setLoading(false)
        }
    }

    return (
        <div className="content">
            <div className="login">
                <form className="modal-content" onSubmit={handleSubmit}>
                    <div className="container">
                        <h1>Log in to Twitter</h1>
                            <br/> <br/> <hr /> <br/> 
                        <label><b>Email</b></label>
                        <input type="text" ref={emailRef} placeholder="Enter Email" required />

                        <label><b>Password</b></label>
                        <input type="password" ref={passwordRef} placeholder="Enter Password" required />
                
                        <label>
                            <input type="checkbox" /> Remember me
                        </label>
                            <br/> <br/>
                        
                        <button type="submit" className="signupbtn" disabled={loading}>Log in</button>
                        { error && <div className="error">{error}</div> }
                    </div>
                    <div id="linksContainer">
                        <Link to="/forgot-password" className="links">Forgot password?</Link>
                    </div>
                </form>
                <SignupModal/>
            </div>
        </div>
    )
}
