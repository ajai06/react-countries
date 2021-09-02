import React from 'react';

const Homepage = React.lazy(()=> import('../pages/homepage/homepage.component'));
const Login = React.lazy(()=> import('../pages/login-registration-page/login-registration.component'));
const Favourites = React.lazy(()=> import('../pages/favourites/favourites.component'));
const CountryDetails = React.lazy(()=> import('../pages/countryDetails/countryDetails.component'));
const Profile = React.lazy(()=>import('../pages/profile/profile.component'));

const routes = [
    
    {
        path : '/home',
        component: Homepage
    },
    {
        path : '/login',
        component: Login
    },
    {
        path : '/favourites',
        component : Favourites
    },
    {
        path : '/country',
        component : CountryDetails
    },
    {
        path : '/profile',
        component: Profile
    }

]

export default routes;