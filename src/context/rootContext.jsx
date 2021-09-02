import React from 'react';

import { UserContext } from './user/userContext';
import { FavouritesContext } from './favourites/favouritesContext';

export const RootContext = ({ children }) => {

    return (
        <UserContext>
            <FavouritesContext>
                {children}
            </FavouritesContext>
        </UserContext>
    )
}