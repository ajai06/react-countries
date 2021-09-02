
const lStroage = JSON.parse(localStorage.getItem("favs"));

export const initialState = lStroage ?   lStroage :  [] 

export const favouriteReducer = (state = initialState, action) => {

    switch (action.type) {

        case "ADD":
            const exists = state.find(favs=> favs.name === action.payload.name);
            if(exists) {
                localStorage.setItem("favs", JSON.stringify(state));
                return [...state];

            } else {
                state.push(action.payload);
                localStorage.setItem("favs", JSON.stringify(state));
                return [...state];
            }

        case "REMOVE":

            const  removedFavs = state.filter( obj => obj.name !== action.payload.name );
            state = removedFavs;
            localStorage.setItem("favs", JSON.stringify(state));
            return [...state]

        default:
            return state;
    }
}