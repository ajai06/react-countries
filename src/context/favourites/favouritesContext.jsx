import React, { createContext, useContext, useReducer } from 'react';

import { favouriteReducer, initialState } from './favouritesReducer';

const FavouriteStateContext = createContext();
const FavouriteDispatchContext = createContext();


export const FavouritesState = () => {
    const context = useContext(FavouriteStateContext);
    return context;
}

export const FavouritesDispatch = () => {
    const context = useContext(FavouriteDispatchContext)
    return context;
}

export const FavouritesContext = ({children}) => {

    const [favourites, dispatch] = useReducer(favouriteReducer, initialState);

    return (
        <FavouriteStateContext.Provider value={favourites}>
            <FavouriteDispatchContext.Provider value={dispatch}>
                {children}
            </FavouriteDispatchContext.Provider>
        </FavouriteStateContext.Provider>
    )
}