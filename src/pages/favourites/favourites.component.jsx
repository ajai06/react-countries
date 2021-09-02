import React, {useState} from 'react';

import { useHistory } from 'react-router';

import WithHeader from '../../shared/hoc/headerHoc.component';
import Country from '../../components/country/country.component';

import { FavouritesDispatch, FavouritesState } from '../../context/favourites/favouritesContext';
import { UserAuthState } from '../../context/user/userContext';

import './favourites.styles.scss';
import Pagination from '../../components/pagination/pagination.component';

function Favourites() {

    const history = useHistory();

    const favState = FavouritesState();
    const dispatch = FavouritesDispatch();
    const userState = UserAuthState();
    const [currentPage, setCurrentPage] = useState(1);
    const [countriesPerPage] = useState(6);

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

    const indexOfLastCountry = currentPage * countriesPerPage;
    const indexOfFirstCountry = indexOfLastCountry - countriesPerPage;
    const currentCountries = favState.slice(indexOfFirstCountry, indexOfLastCountry);

    const paginate = pageNumber => setCurrentPage(pageNumber);

    return (
        <div className="container mt-4">
            <div className="fav-top">
                <i onClick={()=>history.push("/home")} className="fas fa-arrow-alt-circle-left text-success back-arrow"></i>
                <h3>Favourites</h3>
                <span></span>
            </div>
            <div className="row mt-3">
                {
                    favState.length > 0 ?

                    currentCountries.map(country => (
                            <Country key={country.name} country={country} userState={userState} favState={favState}
                                addFavClick={addFavClick} removeFavClick={removeFavClick}
                                itemClick={itemClick} />
                            
                        ))
                        
                        : <div className="text-center mt-5">No favs added</div>
                }
                
            </div>
            <Pagination currentPage={currentPage} countriesPerPage={countriesPerPage}
                            totalCountries={favState.length} paginate={paginate}/>
        </div>
    )
}

export default WithHeader(Favourites)
