import React , { createContext, useContext, useReducer } from 'react';

import { initialState, userReducer } from './userReducer';

const UserStateContext = createContext();
const UserDispatchContext = createContext();


export const UserAuthState = () => {

    const context = useContext(UserStateContext);

    if (context === undefined) {
		throw new Error('useAuthState must be used within a AuthProvider');
	}

	return context;
}

export const UserAuthDispatch = () => {

    const context = useContext(UserDispatchContext);

    if (context === undefined) {
		throw new Error('useAuthDispatch must be used within a AuthProvider');
	}

	return context;
}

export const UserContext = ({children}) => {
    
    const [ user, dispatch ] = useReducer(userReducer, initialState);
    
    return (
        <UserStateContext.Provider value={user}>
            <UserDispatchContext.Provider value={dispatch}>
                {children}
            </UserDispatchContext.Provider>
        </UserStateContext.Provider>
    )
}


