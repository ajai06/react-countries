import React, { useEffect, useState } from 'react';

import { useHistory, useLocation } from "react-router-dom";

import { FavouritesDispatch, FavouritesState } from '../../context/favourites/favouritesContext';
import { UserAuthState } from '../../context/user/userContext';

import WithHeader from '../../shared/hoc/headerHoc.component';

import './countryDetails.styles.scss';

function CountryDetails() {

    const location = useLocation();
    const history = useHistory();

    const favState = FavouritesState();
    const dispatch = FavouritesDispatch();

    const userState = UserAuthState();

    const [country, setCountry] = useState([]);

    useEffect(() => {
        if (location.state) {
            setCountry(location.state.country);
        } else {
            history.push('/home');
        }
    }, [])

    const addFavClick = (country) => {
        dispatch({ type: "ADD", payload: country });
    }

    const removeFavClick = (country) => {
        dispatch({ type: "REMOVE", payload: country });
    }

    const goBack = () => {
        history.goBack();
    }
 
    return (
        <div className="container mt-5">

            <div className="card">
                <div className="card-header text-center">
                    <i onClick={() => goBack()} className="fas fa-arrow-alt-circle-left text-success back-arrow"></i>
                    {
                        userState.isLoggedIn ?
                            <span className="heart">
                                {
                                    favState && favState.find(fav => fav.name === country.name)
                                        ? <i className="fas fa-heart text-danger" onClick={() => removeFavClick(country)}></i>
                                        : <i className="far fa-heart" onClick={() => addFavClick(country)}></i>
                                }
                            </span> : null
                    }
                    <img className="flag-img rounded mt-3 mb-3" src={country.flag} alt="" />
                    <h3>{country.name} ({country.nativeName})</h3>

                </div>
                <div className="card-body body-country">

                    <div className="mb-3">
                        <h5>Details</h5>
                        <span className="row details-tab">
                            <span className="col-4">
                                <span className="currency-item">Captial</span> : {country.capital}
                            </span>
                            <span className="col-4">
                                <span className="currency-item">Region </span>: {country.region}
                            </span>
                            <span className="col-4">
                                <span className="currency-item">Sub region</span> : {country.subregion}
                            </span>
                            <span className="col-4 ml-3">
                                <span className="currency-item">Demonym</span> : {country.demonym}
                            </span>
                            <span className="col-4">
                                <span className="currency-item">Population</span> : {country.population}
                            </span>
                        </span>
                    </div>

                    <div className="mb-3">
                        <h5>Currencies</h5>
                        <table className="table table-borderless">
                            <thead>
                                <tr>
                                    <th className="col-3">Name</th>
                                    <th className="col-3">Code</th>
                                    <th>Symbol</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    country.currencies ? country.currencies.map(currency => (
                                        <tr key={currency.code}>
                                            <td>{currency.name}</td>
                                            <td>{currency.code}</td>
                                            <td>{currency.symbol}</td>
                                        </tr>
                                    )) : null
                                }
                            </tbody>
                        </table>
                    </div>
                    <div className="">
                        <h5>Languages</h5>
                        <table className="table table-borderless">
                            <thead>
                                <tr >
                                    <th className="col-3">Name</th>
                                    <th>Native name</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    country.languages ? country.languages.map(language => (
                                        <tr key={language.name}>
                                            <td>{language.name}</td>
                                            <td>{language.nativeName}</td>
                                        </tr>
                                    )) : null
                                }
                            </tbody>
                        </table>

                    </div>
                </div>
            </div>

        </div>
    )
}

export default WithHeader(CountryDetails)
