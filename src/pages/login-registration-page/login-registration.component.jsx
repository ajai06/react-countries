import React from 'react'

import Login from '../../components/login/login.component'
import Register from '../../components/register/register.component'
import WithHeader from '../../shared/hoc/headerHoc.component'

import './login-registration.styles.scss';

function LoginOrRegistration() {
    return (
        <div className="container d-flex justify-space-between mt-5">
            <Login />
            <Register />

        </div>
    )
}

export default WithHeader(LoginOrRegistration)
