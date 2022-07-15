import React from "react";
import { useSelector } from "react-redux";

import CartItem from "../CartItem";

const CartItems = () => {
  const cartItems = useSelector(state =>  state.cart.itemsList);

  return (
    <div className="cart-container">
      <h2>Your Cart</h2>
      <ul>
        {cartItems.map(({id, name, price, totalPrice, quantity}) => (
          <li key={id}>
            <CartItem 
              id={id} 
              name={name} 
              price={price} 
              quantity={quantity} 
              total={totalPrice} 
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CartItems;
