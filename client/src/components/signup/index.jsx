import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

//import local assets
import './style.css'
// import GoogleIcon from './assets/img/google.png';
// import GithubIcon from './assets/img/github.png';

// import GoogleIcon from '../../assets/img/google.png';

const Signup = () => {
    //assigns the useNavigate hook to navigate to navigate to different pages
    const navigate = useNavigate();

    //check if url is login page or not
    // const currentURL = window.location.href;       // dev test
    // const isLogin = currentURL.includes("login"); //dev test
    const [isLogin, setIsLogin] = useState(false);

    //stores server url
    const serverURL = import.meta.env.VITE_SERVER_URL;
    // console.log(serverURL);

    //react state for form input values
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: ''
    });

    //handle change when there is an input
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevVal) => { return ({ ...prevVal, [name]: value }) })
    }

    //handles when the submit button is clicked
    const handleForm = async (event) => {
        //prevents the form from reloading
        event.preventDefault();
        console.log("i have been clicked");

        //api to post the form data to the server
        const url = isLogin ? 'login' : 'signup';
        const postURL = serverURL + '/api/' + url;

        //posts the data to the server and intercept the response
        try {
            const response = await fetch(postURL, {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            })

            if (response.ok) {
                const body = await response.json();
                localStorage.setItem('user', JSON.stringify(body.user));
                navigate('/home');
            } else {
                const data = await response.json();
                alert(data.message || 'Login failed');
            }
        } catch (error) {
            console.log("An Error occured: ", error);
        }
    }

    //handle Login click
    const handleLogin = (e) => {
        e.preventDefault();
        setIsLogin(true);
    }

    //handle signup click
    const handleSignup = (e) => {
        e.preventDefault();
        setIsLogin(false);
    }

    //handle google login
    const googleLogin = () => {
        window.open(serverURL + '/api/auth/google', "_self");
    }

    //handle github login
    const githubLogin = () => {
        window.open(serverURL + '/api/auth/github', "_self");
    }

    return (<>
        <div className="container">
            {/* side img */}
            <div className="overlay">
                <div className="img">
                </div>
                <div className="form">
                    {/* top part of form with name email and password */}
                    <div className="form-top">
                        <form onSubmit={handleForm}>
                            <div className="nested-form">
                                {/* to show login and ignore name when on login page */}
                                {isLogin ? <h2>Login into Account</h2> : <>
                                    <h2>Create an Account</h2>
                                    <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleChange} required />
                                </>}

                                <input type="email" name="email" placeholder="Email Address" value={formData.email} onChange={handleChange} required />
                                <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required />
                                <button className="btns" type="submit">{isLogin ? 'Login' : 'Sign Up'}</button>

                                {isLogin ? <>
                                    <p className="login-text">Don't have an account? <a href="/#/" onClick={handleSignup}>Signup</a></p>
                                    <p className="login-text forgot-pass"><a href="/forgot-password">Forgot Password?</a></p>
                                </>
                                    : <>
                                        <p className="login-text">Already have an account? <a href="/#/" onClick={handleLogin}>Login</a></p>
                                    </>
                                }
                            </div>
                        </form>
                    </div>
                    {/* currently working on fixing on running google and github in electron chromium instance */}
                    {/* <h4>Continue with</h4> */}
                    {/* top part of form to signup with google and Github */}
                    {/* <div className="form-bottom">
                        <button className="google" onClick={googleLogin}>
                            <img src={GoogleIcon} className="img-icon btns" alt='' />
                        </button>
                        <p>- or -</p>
                        <button className="github" onClick={githubLogin}>
                            <img src={GithubIcon} className="img-icon btns" alt="" />
                        </button>
                    </div> */}

                </div>
            </div >
        </div >
    </>)
}

export default Signup;