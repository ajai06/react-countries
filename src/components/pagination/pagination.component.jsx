import React from 'react';

import './pagination.styles.scss';

function Pagination({countriesPerPage,currentPage, totalCountries, paginate}) {

    const pageNumbers = [];

    for (let i=1; i <= Math.ceil(totalCountries/countriesPerPage); i++) {
        pageNumbers.push(i);
    }
    
    const click = (number) =>{
        paginate(number);
    }

    return (
        <nav className="pagination-tab">
            <ul className="pagination">
                {
                    pageNumbers.map(number => (
                        <li key={number} className="page-item pointer">
                            <span onClick={()=>click(number)} 
                            className={`page-link ${currentPage === number ? 'active-page': '' }`}>
                                {number}
                            </span>
                        </li>
                    ))
                }
            </ul>
        </nav>
    )
}

export default Pagination
