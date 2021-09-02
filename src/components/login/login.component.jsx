import React, { useState } from 'react';

import { useHistory } from 'react-router';
import { useForm } from 'react-hook-form';

import { UserAuthDispatch } from '../../context/user/userContext';

import './login.styles.scss';

function Login() {

    const dispatch = UserAuthDispatch();

    const history = useHistory();
    const { register, formState: {errors}, handleSubmit } = useForm();
    const [ userExist, setUserExist ] = useState(true);
    const [ passwordCheck, setPasswordCheck] = useState(true);

    const loginSubmit = (data) => {

        setUserExist(true)
        setPasswordCheck(true);

        let users = JSON.parse(localStorage.getItem("registeredUsers"));
        if(users){
            const user = users.find(user => user.email === data.email);
            if(user) {
                const checkPassword = user.password === data.password;
                if(!checkPassword) {
                    setPasswordCheck(false);
                } else {
                    setUserExist(true);
                    setPasswordCheck(true);
                    dispatch({type:"LOGIN", payload:user});
                    localStorage.setItem("currentUser",JSON.stringify(user));
                    history.push("/home");
                }
            } else {
                setUserExist(false);
            }
        } else {
            setUserExist(false);
        }
    }

    return (
        <div className="container login">
            <h2>I already have an acccount</h2>
            <span>Sign in with your email and password</span>

            <form onSubmit={handleSubmit(loginSubmit)}>
                <div className="form-group my-4">
                    <label htmlFor="loginEmail">Email address</label>
                    <input type="email" className="form-control my-1" id="loginEmail" aria-describedby="emailHelp"
                           placeholder="Enter email" {...register("email", {required:true}) }/>
                    { errors.email ? <span className="error-msg">Email required</span> :
                      !userExist ?  <span className="error-msg">Email not registered ! </span> : '' }

                </div>

                <div className="form-group my-4">
                    <label htmlFor="loginPassword">Password</label>
                    <input type="password"  className="form-control my-1" id="loginPassword" placeholder="Password"
                           {...register("password", {required:true})} />
                    {errors.password ? <span className="error-msg">Password required</span> :
                      !passwordCheck ? <span className="error-msg">Invalid password</span>  :''}
                </div>

                <button type="submit" className="btn btn-success">Login</button>
            </form>
        </div>
    )
}

export default Login
