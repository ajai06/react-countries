import React, { useState, useEffect } from 'react';

import axios from 'axios';
import { useHistory } from 'react-router';
import { useForm } from 'react-hook-form';

import { UserAuthDispatch } from '../../context/user/userContext';

import './register.styles.scss';

function Register() {

    const history = useHistory();
    const { register, handleSubmit, formState: { errors }, watch } = useForm();

    const dispatch = UserAuthDispatch();

    const [userExists, setUserExists] = useState(false);
    const [allCountries, setAllCountries] = useState([]);

    useEffect(() => {
        axios.get('https://restcountries.eu/rest/v2/all')
            .then(res => {
                setAllCountries(res.data);
            })
    }, []);

    const registerSubmit = (data) => {

        let users = JSON.parse(localStorage.getItem("registeredUsers"));
        if (users) {
            const check = users.some(user => user.email === data.email);
            if (check) {
                setUserExists(true);
            } else {
                users.push(data);
                localStorage.setItem("registeredUsers", JSON.stringify(users));
                localStorage.setItem("currentUser", JSON.stringify(data));
                setUserExists(false);
                history.push('/home');
                dispatch({type:"REGISTER", payload: data})

            }
        } else {
            localStorage.setItem("registeredUsers", JSON.stringify([data]));
            localStorage.setItem("currentUser", JSON.stringify(data));
            history.push('/home');
            dispatch({type:"REGISTER", payload: data})

        }
    }

    return (
        <div className="container register">

            <h2 className="title">I do not have a account</h2>
            <span>Sign up with your email and password</span>

            <form onSubmit={handleSubmit(registerSubmit)}>

                <div className="form-group my-4">
                    <label htmlFor="registerUsername">User Name</label>
                    <input type="text" className="form-control my-1" id="registerUsername"
                        aria-describedby="usernameHelp" placeholder="Enter Name"
                        {...register("username", { required: true, pattern: /^[^*|\!~#%^-_+=,<.>?/":<>[\]{}`\\()';@&$]+$/ })} />
                    {errors.username?.type==="required" ? <span className="error-msg">User name required</span> 
                     : errors.username?.type==="pattern" ? <span className="error-msg">No special charcters allowed </span> : ''}
                </div>

                <div className="form-group my-4">
                    <label htmlFor="registerEmail">Email address</label>
                    <input type="email" className="form-control my-1" id="registerEmail" aria-describedby="emailHelp"
                        placeholder="Enter email" {...register("email", { required: true })} />
                    {errors.email ? <span className="error-msg">Email required</span> :
                        userExists ? <span className="error-msg">Email already exist</span> : ''}
                </div>

                <div className="form-group my-4">
                    <label htmlFor="exampleFormControlSelect1">Select country</label>
                    <select className="form-control my-1" {...register("country", { required: true })}
                        id="exampleFormControlSelect1">
                        <option  value="">Select</option>
                        {
                            allCountries.map(country => (
                                <option key={country.name} value={country.name}>{country.name}</option>
                            ))
                        }
                    </select>
                    {errors.country ? <span className="error-msg">Select your country</span> : ''}
                </div>

                <div className="form-group mb-4">
                    <label htmlFor="registerPassword1">Password</label>
                    <input type="password" className="form-control my-1" id="registerPassword1" placeholder="Password"
                        {...register("password", { required: true, maxLength: 15, pattern: /^[^*|\!~#%^-_+=,<.>?/":<>[\]{}`\\()';@&$]+$/ })} />
                    {
                        errors.password?.type === "required" ?
                            <span className="error-msg">Password required</span>
                            : errors.password?.type === "maxLength"
                                ? <span className="error-msg">Maximum 15 characters only </span>
                                : errors.password?.type === "pattern"
                                    ? <span className="error-msg">No special charcters allowed </span> : ''
                    }

                </div>

                <div className="form-group mb-4">
                    <label htmlFor="registerPassword2">Confirm Password</label>
                    <input name="confirmPassword" type="password" className="form-control my-1"
                        id="registerPassword2" placeholder="Conrim Password"
                        {...register("confirmPassword",
                            { required: true, validate: value => value === watch("password") })} />
                    {
                        errors.confirmPassword?.type === "required" ?
                            <span className="error-msg">Confirm password required</span>
                            : errors.confirmPassword?.type === "validate" ?
                                <span className="error-msg">Password not matching</span> : ''
                    }
                </div>

                <button type="submit" className="btn btn-success">Register</button>

            </form>

        </div>
    )
}

export default Register
