import React, { useState } from 'react';

//import styles
import './style.css';

const forgotPassword = () => {
    const [email, setEmail] = useState('');
    const [msg, setMsg] = useState('');

    const server_url = import.meta.env.VITE_SERVER_URL;

    const handleChange = (event) => {
        setEmail(event.target.value);
    }

    const handleForm = async (e) => {
        e.preventDefault();

        const response = await fetch(server_url + '/api/reset/forgot-password', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email })
        });

        const result = await response.json();

        setMsg(result.message ? result.message : 'Some error occured contact dev.' );
        setEmail('');
        setTimeout(()=>{setMsg('')},5000); //reset msg after 5secs
    }

    return (
        <>
            <div className="container">
                <div className="overlay reset-div">
                    <form onSubmit={handleForm}>
                        <div className="form-reset">
                            <h2>Reset Password</h2>
                            <p>Fear not. We'll email you instructions to reset your password. </p>
                            <input className="reset-inp" type="email" name="email" value={email} onChange={handleChange} placeholder="Email Address" required />
                            <button className="btns" type="submit">Send Recovery Email</button>
                        </div>
                    </form>
                    <div className="msg-box">
                        <p>{msg}</p>
                    </div>
                </div>
            </div>
        </>
    );
}

export default forgotPassword;