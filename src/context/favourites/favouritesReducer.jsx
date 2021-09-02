

export const initialState = []

export const favouriteReducer = (state = initialState, action) => {

    switch (action.type) {

        case "ADD":
            const x = state.find(favs=> favs.name === action.payload.name);
            if(x) {
                return [...state];
            } else {
                state.push(action.payload);
                return [...state];
            }

        case "REMOVE":

            const  y = state.filter( obj => obj.name !== action.payload.name );
                   state = y;
            return [...state]

        default:
            return state;
    }
}