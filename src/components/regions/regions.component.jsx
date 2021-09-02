import React, { useState } from 'react';

import './regions.styels.scss';

function Regions({ regions, regionClick, search }) {

    const [currentRegion, setCurrentRegion] = useState('all');

    const itemClick = (region) => {
        regionClick(region);
        setCurrentRegion(region);
    }

    return (
        <div className="container regions mt-5">
            <input className ="form-control mb-2" placeholder="Search" type="text" onChange={(e)=>search(e)}/>
            <ul className="list-group">
                <li onClick={() => itemClick('all')} aria-current="true"
                    className={`list-group-item  border-secondary region-item 
                                ${currentRegion === 'all' ? 'active-list' : ''}`} >All Regions
                </li>
                {
                    regions.map(region => (
                        <li key={region} onClick={() => itemClick(region)}
                            className={`list-group-item  border-secondary region-item 
                                        ${currentRegion === region ? 'active-list' : ''}`}> {region} 
                        </li>
                    ))
                }
            </ul>

        </div>
    )
}

export default Regions
