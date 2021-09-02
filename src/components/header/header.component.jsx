import React from 'react';

import { Link } from 'react-router-dom';

import { useHistory } from 'react-router';

import { UserAuthDispatch, UserAuthState } from '../../context/user/userContext';
import { FavouritesState } from '../../context/favourites/favouritesContext';

import './header.styles.scss';

const Header = () => {

    const state = UserAuthState();
    const dispatch = UserAuthDispatch();

    const favState = FavouritesState();

    const history = useHistory()

    const url = history.location.pathname;


    const logout = () => {
        dispatch({ type: "LOGOUT" });
        localStorage.removeItem("currentUser");
        history.push("/home");
    }

    return (
        <div className="navbar navbar-expand-lg navbar-dark bg-success header">

            <Link to="/home" className=" navbar-brand">Countries</Link>

            <div>
                <button className="navbar-toggler" type="button" data-toggle="collapse"
                    data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false"
                    aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNavDropdown">
                    <ul className="navbar-nav">

                        {
                            !state.user
                                ? <li className="nav-item">
                                    <Link className="nav-link" to="/login">Login</Link>
                                </li>
                                : <span className="d-flex">
                                    <li className="nav-item">
                                        <Link className={`nav-link ${url === "/favourites" ? 'text-active' : ''}`}
                                            to="/favourites">Favourites({favState ? favState.length : 0})</Link>
                                    </li>

                                    <li className="nav-item dropdown">
                                        <span className={`nav-link dropdown-toggle ${url === "/profile" ? 'text-active' : ''}`}
                                            id="navbarDropdownMenuLink" role="button"
                                            data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                            {state.user.username}
                                        </span>
                                        <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                                            <Link className="dropdown-item" to="/profile">Profile</Link>
                                            <span className="dropdown-item pointer" onClick={logout}>Logout</span>
                                        </div>
                                    </li>
                                </span>
                        }
                    </ul>
                </div>
            </div>
        </div>

    )
}

export default Header
