import React, { useEffect, useState } from 'react';

import axios from 'axios';

import WithHeader from '../../shared/hoc/headerHoc.component';
import Regions from '../../components/regions/regions.component';
import Countries from '../../components/countries/countries.component';

import './homepage.styles.scss';
import Pagination from '../../components/pagination/pagination.component';

const Homepage = () => {

    const [loaded, setLoaded] = useState(false);
    const [regions, setRegions] = useState([]);
    const [allCountries, setAllCountries] = useState([]);
    const [filteredCountries, setFilteredCountries] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [countriesPerPage] = useState(6);

    useEffect(() => {
        axios.get('https://restcountries.eu/rest/v2/all')
            .then(res => {
                const regions = Array.from(new Set(res.data.map(country => country.region)));
                setRegions(regions.filter(region => region !== ""));
                setAllCountries(res.data);
                setFilteredCountries(res.data);
                setLoaded(true);
            })
    }, []);

    const countriesByRegion = (region) => {

        setCurrentPage(1);
        if (region === 'all') {
            setFilteredCountries(allCountries);
        } else {
            const filtered = allCountries.filter(country => country.region === region)
            setFilteredCountries(filtered);
        }

    }

    const searchFilter = (event) => {

        let value = event.target.value;
        let result = [];
        result = allCountries.filter((data) => {
            return data.name.toLowerCase().indexOf(value.toLowerCase()) !== -1;

        });
        setFilteredCountries(result);
    }

    const indexOfLastCountry = currentPage * countriesPerPage;
    const indexOfFirstCountry = indexOfLastCountry - countriesPerPage;
    const currentCountries = filteredCountries.slice(indexOfFirstCountry, indexOfLastCountry);

    const paginate = pageNumber => setCurrentPage(pageNumber);

    return (

        <div className="container">
            {
                loaded ?
                    <div className="homepage">
                        <Regions regions={regions} regionClick={countriesByRegion} search={searchFilter} />
                        <span className="w-75">
                            <Countries countries={currentCountries} />
                            <Pagination currentPage={currentPage} countriesPerPage={countriesPerPage} 
                                        totalCountries={filteredCountries.length} paginate={paginate} />
                        </span>
                    </div> : <div className="text-center mt-5">loading ...</div>
            }


        </div>
    )
}

export default WithHeader(Homepage);
