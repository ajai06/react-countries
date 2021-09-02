const lStorage = JSON.parse(localStorage.getItem("currentUser"));

export const initialState = lStorage ? { isLoggedIn: true,  user: lStorage } : { isLoggedIn: false, user: null };


export const userReducer = ( state = initialState, action) => {

    switch (action.type) {
        case "LOGIN":  
            return {
                ...state,
                isLoggedIn : true,
                user : action.payload
            };

        case "REGISTER":
            return {
                ...state,
                isLoggedIn : true,
                user : action.payload
            };

        case "LOGOUT":
            return {
                ...state,
                isLoggedIn : false,
                user : null
            };
    
        default:
            return initialState;
    }
}

