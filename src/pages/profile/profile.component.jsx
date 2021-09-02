import React, { useEffect, useState } from 'react';

import axios from 'axios';
import { useHistory } from 'react-router';
import { useForm } from 'react-hook-form';

import { UserAuthDispatch } from '../../context/user/userContext';

import WithHeader from '../../shared/hoc/headerHoc.component';

import './profile.styles.scss';

function Profile() {

    const history = useHistory();
    const { register, handleSubmit, formState: { errors }, setValue } = useForm();

    const [user, setUser] = useState([]);
    const [country, setCountry] = useState([]);
    const [allCountries, setAllCountries] = useState([]);
    const [editForm, setEditForm] = useState(false);

    const dispatch = UserAuthDispatch();

    useEffect(() => {
        const currentUser = JSON.parse(localStorage.getItem("currentUser"));
        setUser(currentUser);

        axios.get('https://restcountries.eu/rest/v2/all')
            .then(res => {
                const country = res.data.find(country => country.name === currentUser.country)
                setCountry(country);
                setAllCountries(res.data);
                patchValue(currentUser);
            })
    }, []);

    const patchValue = (currentUser) => {
        setValue("username", currentUser.username);
        setValue("email", currentUser.email);
        setValue("password", currentUser.password);
        setValue("country", currentUser.country)
    }

    const itemClick = (country) => {
        history.push({
            pathname: '/country',
            state: { country }
        });
    }

    const cancelClick = () => {
        setEditForm(false);
        patchValue(user);
    }

    const updateUser = (data) => {

        let users = JSON.parse(localStorage.getItem("registeredUsers"));

        const objIndex = users.findIndex((user => user.email === data.email));
        users[objIndex].username = data.username;
        users[objIndex].password = data.password;
        users[objIndex].country = data.country;
        const currentUser = users.find(user => user.email === data.email);

        dispatch({ type: "LOGIN", payload: currentUser })

        localStorage.setItem("currentUser", JSON.stringify(currentUser));
        localStorage.setItem("registeredUsers", JSON.stringify(users));

        setEditForm(false);
        setUser(currentUser);

        const country = allCountries.find(country => country.name === currentUser.country)
        setCountry(country);
    }

    const deleteAccount = () => {

        let users = JSON.parse(localStorage.getItem("registeredUsers"));
        const newUsers = users.filter(usr => usr.email !== user.email)

        dispatch({ type: "LOGOUT" })

        localStorage.removeItem("currentUser");
        localStorage.setItem("registeredUsers", JSON.stringify(newUsers));

        history.push("/home")

    }

    return (
        <div className="container my-5 w-50">

            <form onSubmit={handleSubmit(updateUser)}>

                <div className="form-group my-4">
                    <label htmlFor="registerUsername">User Name</label>
                    <input type="text" className="form-control my-1" id="registerUsername" disabled={!editForm}
                        aria-describedby="usernameHelp" placeholder="Enter Name"
                        {...register("username", { required: true, pattern: /^[^*|\!~#%^-_+=,<.>?/":<>[\]{}`\\()';@&$]+$/ })} />
                    {errors.username?.type === "required" ? <span className="error-msg">User name required</span>
                        : errors.username?.type === "pattern" ? <span className="error-msg">No special charcters allowed </span> : ''}
                </div>

                <div className="form-group my-4">
                    <label htmlFor="registerEmail">Email address</label>
                    <input disabled type="email" className="form-control my-1" id="registerEmail" aria-describedby="emailHelp"
                        placeholder="Enter email"  {...register("email")} />
                </div>

                {
                    editForm ? <div className="form-group my-4">
                        <label htmlFor="exampleFormControlSelect1">Select country</label>
                        <select className="form-control my-1" {...register("country", { required: true })}
                            id="exampleFormControlSelect1" >
                            <option value="">Select</option>
                            {
                                allCountries.map(country => (
                                    <option key={country.name} >{country.name}</option>
                                ))
                            }
                        </select>
                        {errors.country ? <span className="error-msg">Select your country</span> : ''}
                    </div> : ''
                }

                <div className="form-group mb-4">
                    <label htmlFor="registerPassword1">Password</label>
                    <input disabled={!editForm} type="password" className="form-control my-1" id="registerPassword1" placeholder="Password"
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

                {
                    !editForm ? 
                    <div className="my-4">
                    <label htmlFor="registerEmail">Country details</label>
                    <div className="card border-secondary card-box">
                        <div className="card-body d-flex justify-content-between">
                            <img className="flag" src={country.flag} alt="country flag" />
                            <span className="icons">
                                <span></span>
                                <i onClick={() => itemClick(country)} className="fas fa-info-circle text-success"></i>
                            </span>
                        </div>
                        <div onClick={() => itemClick(country)} className="card-footer bg-transparent border-secondary footer">
                            <span>
                                <span className="card-title">{country.name}</span>
                                <br />
                                <span>Capital : {country.capital}</span>
                                <br />
                                <span>Region : {country.region}</span>
                                <br />
                                <span>Popultion : {country.population}</span>
                            </span>

                        </div>
                    </div>
                </div> : ''
                }

                {
                    !editForm
                        ? <span>
                            <button type="button" className="btn btn-info" onClick={() => setEditForm(true)}>Edit Details</button>
                            <button type="button" className="btn btn-danger submit-btn"
                                onClick={e => window.confirm("Are you sure you wish to delete your account?")
                                    && deleteAccount(e)} > Delete Account
                            </button>
                        </span>
                        : <span>
                            <button type="button" className="btn btn-danger" onClick={() => cancelClick()}>Cancel</button>

                            <button type="submit" className="btn btn-success submit-btn">Submit</button>
                        </span>

                }

            </form>

        </div>
    )
}

export default WithHeader(Profile);
