import React from 'react'
import { Link } from 'react-router-dom';
import SignupModal from './SignupModal';
import background from './twitter1.png';

export default function Signup() {

    return (
        <div>
            <div className="leftSide">
                <img src={background} alt="logo"/>
            </div>
            <div className="rightSide">
                <div className="signup">
                    <h2>Happening now</h2>
                    <br/> <br/>
                    <div className="forms">
                        <h4>Join Twitter today.</h4>
                        <br/>
                        <SignupModal/>
                        <Link to="/login" className="loginLink"><button className="loginButton">Log in</button></Link>
                    </div>
                </div>
            </div>
        </div>
    )
}
