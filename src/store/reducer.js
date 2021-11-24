import *  as actions from './actionTypes';
const intialState = {
    cartItemNo: 0,
    cartItems: [],
}

const reducer = (state = intialState, action) => {
    switch (action.type) {
        case actions.ADD_TO_CART:
            return {
                ...state,
                cartItems: action.cartItems,
                cartItemNo: action.cartItemNo,
            }

        default:
            return state;
    }
}

export default reducer;