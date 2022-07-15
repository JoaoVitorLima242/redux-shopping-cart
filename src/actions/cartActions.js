import { cartActions } from "../store/cartSlice";
import { uiActions } from "../store/uiSlice";

export const fetchData = () => {
    return async (dispatch) => {
        const fetchHandler = async () => {
            const res = await fetch('https://redux-68018-default-rtdb.firebaseio.com/cartItems.json');
            const data = await res.json();

            if (!data.itemsList && !data.totalQuantity) {
                data.totalQuantity = 0
                data.itemsList = []
            }

            return data;
        }

        try {
            const cartData = await fetchHandler();
            dispatch(cartActions.replaceData(cartData))
        } catch (error) {
            dispatch(uiActions.showNotification({
                open: true,
                message: 'Fetching data error',
                type: 'error'
            }))
        }
    }
}

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