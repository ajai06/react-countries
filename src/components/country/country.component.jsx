import React from 'react';

import './country.styles.scss';

function Country({country, userState, favState, removeFavClick, addFavClick, itemClick}) {
    return (
        <>
            <div key={country.alpha2Code} className="col-sm-4 mb-4">

                <div className="card border-secondary card-box">
                    <div className="card-body d-flex justify-content-between">
                        <img className="flag" src={country.flag} alt="country flag" />
                        <span className="icons">
                            {
                                userState.isLoggedIn ? favState && favState.find(fav => fav.name === country.name)
                                    ? <i className="fas fa-heart text-danger" onClick={() => removeFavClick(country)}></i>
                                    : <i className="far fa-heart" onClick={() => addFavClick(country)}></i>
                                    : <span></span>
                            }


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
            </div>
        </>
    )
}

export default Country
