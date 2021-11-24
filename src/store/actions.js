import * as actions from './actionTypes';

export function addToCart(data, items) {
    // console.log(data, items);
    return {
        type: actions.ADD_TO_CART,
        cartItemNo: items,
        cartItems: data,
    }
}