import React from 'react';

import { useHistory } from 'react-router';

import WithHeader from '../../shared/hoc/headerHoc.component';
import Country from '../../components/country/country.component';

import { FavouritesDispatch, FavouritesState } from '../../context/favourites/favouritesContext';
import { UserAuthState } from '../../context/user/userContext';

import './favourites.styles.scss';

function Favourites() {

    const history = useHistory();

    const favState = FavouritesState();
    const dispatch = FavouritesDispatch();
    const userState = UserAuthState();

    // console.log(state);

    const itemClick = (country) => {
        history.push({
            pathname: '/country',
            state: { country }
        });
    }

    const addFavClick = (country) => {
        dispatch({ type: "ADD", payload: country });
    }



    const removeFavClick = (country) => {
        dispatch({ type: "REMOVE", payload: country });

    }

    return (
        <div className="container mt-5">
            <div className="fav-top">
                <i onClick={()=>history.push("/home")} className="fas fa-arrow-alt-circle-left text-success back-arrow"></i>
                <h3>Favourites</h3>
                <span></span>
            </div>
            <div className="row mt-5">
                {
                    favState.length > 0 ?

                        favState.map(country => (
                            <Country key={country.name} country={country} userState={userState} favState={favState}
                                addFavClick={addFavClick} removeFavClick={removeFavClick}
                                itemClick={itemClick} />
                        ))
                        : <div className="text-center mt-5">No favs added</div>
                }
            </div>
        </div>
    )
}

export default WithHeader(Favourites)
