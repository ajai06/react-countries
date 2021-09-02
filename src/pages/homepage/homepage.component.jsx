import React, { useEffect, useState } from 'react';

import axios from 'axios';

import WithHeader from '../../shared/hoc/headerHoc.component';
import Regions from '../../components/regions/regions.component';
import Countries from '../../components/countries/countries.component';

import './homepage.styles.scss';

const Homepage = () => {

    const [regions, setRegions] = useState([]);
    const [allCountries, setAllCountries] = useState([]);
    const [filteredCountries, setFilteredCountries] = useState([]);

    useEffect(() => {
        axios.get('https://restcountries.eu/rest/v2/all')
            .then(res => {
                const regions = Array.from(new Set(res.data.map(country => country.region)));
                setRegions(regions.filter(region => region !== ""));
                setAllCountries(res.data);
                setFilteredCountries(res.data)
            })
    }, []);

    const countriesByRegion = (region) => {
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
        setFilteredCountries(result)
    }

    return (

        <div className="container homepage">
            <Regions regions={regions} regionClick={countriesByRegion} search={searchFilter} />
            <Countries countries={filteredCountries} />
        </div>
    )
}

export default WithHeader(Homepage);
