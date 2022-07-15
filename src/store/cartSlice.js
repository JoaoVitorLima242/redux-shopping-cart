import { createSlice } from "@reduxjs/toolkit";

import { uiActions } from "./uiSlice";

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        itemsList: [],
        totalQuantity: 0,
         showCart: false
    },
    reducers: {
        addToCart(state, action) {
            const newItem = action.payload;

            // to check if item is already available
            const existingItem = state.itemsList.find((item) => item.id === newItem.id);

            if(existingItem) {
                existingItem.quantity++;
                existingItem.totalPrice += newItem.price;
            } else {
                state.itemsList.push({
                    id: newItem.id,
                    price: newItem.price,
                    quantity: 1,
                    totalPrice: newItem.price,
                    name: newItem.name
                });
            }
            state.totalQuantity++
        },
        removeFromCart(state, action) {
            const id = action.payload;

            const existingItem = state.itemsList.find(item => item.id === id);

            if (existingItem.quantity === 1) {
                state.itemsList = state.itemsList.filter(item => item.id !== id);
                
            } else {
                existingItem.quantity--;
                existingItem.totalPrice -= existingItem.price;
            }

            state.totalQuantity--;
        },
        setShowCart(state) {
            state.showCart = !state.showCart
        }
    }
});

export const sendCartData = (cart) => {
    return async (dispatch) => {
        dispatch(uiActions.showNotification({
            open: true,
            message: 'Sending request',
            type: 'warning'
        }));

        const sendRequest = async () => {
            dispatch(uiActions.showNotification({
              open: true,
              message: 'Sending request',
              type: 'warning'
            }))
            const res = await fetch('https://redux-68018-default-rtdb.firebaseio.com/cartItems.json', {
              method: 'PUT',
              body: JSON.stringify(cart)
            });
            const data = await res.json();
            dispatch(uiActions.showNotification({
              open: true,
              message: 'Send Request to Database successfully!',
              type: 'success'
            }))
        };

        try {
            await sendRequest();
        } catch (error) {
            dispatch(uiActions.showNotification({
                open: true,
                message: 'Sending request error',
                type: 'error'
            }))
        }

    }
}

export const cartActions = cartSlice.actions;

export default cartSlice;