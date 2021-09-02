import React from 'react';

import { useHistory } from 'react-router';

import { FavouritesDispatch, FavouritesState } from '../../context/favourites/favouritesContext';

import { UserAuthState } from '../../context/user/userContext';
import Country from '../country/country.component';

import './countries.styles.scss';

function Countries({ countries }) {

    const history = useHistory();

    const userState = UserAuthState();

    const favState = FavouritesState();
    const dispatch = FavouritesDispatch();

    const itemClick = (country) => {
        history.push({
            pathname: '/country',
            state: { country }
        });
    }

    const addFavClick = (country) => {
        // console.log(country);
        dispatch({ type: "ADD", payload: country });
    }

    const removeFavClick = (country) => {
        dispatch({ type: "REMOVE", payload: country });

    }

    return (
        <div className="container mt-5">
            <div className="row">
                {
                    countries.map(country => (
                        <Country key={country.name} country={country} userState={userState} favState={favState}
                                addFavClick={addFavClick} removeFavClick={removeFavClick}
                                itemClick={itemClick}/>
                    ))
                }
            </div>
        </div>
    )
}

export default Countries
