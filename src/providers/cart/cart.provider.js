import React, { createContext, useState, useEffect } from "react";

import {
  addItemToCart,
  removeItemFromCart,
  filterItemFromCart,
  addItemQuantityToCart,
  addItemPriceToCart,
  addItemDiscountToCart,
  getCartItemsCount,
  getTotalPrice,
  getItemPriceFromCart
} from "./cart.utils";

export const CartContext = createContext({
  hidden: true,
  toggleHidden: () => {},
  cartItems: [],
  addItem: () => {},
  removeItem: () => {},
  clearItemFromCart: () => {},
  getItemPriceFromCart: () => {},
  cartItemsCount: 0,
  addItemQuantity: () => {},
  addItemPrice: () => {},
  addItemDiscount: () => {},
  totalPrice: 0
});

const CartProvider = ({ children }) => {
  const [hidden, setHidden] = useState(true);
  const [cartItems, setCartItems] = useState([]);
  const [cartItemsCount, setCartItemsCount] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);

  const addItem = (item) => setCartItems(addItemToCart(cartItems, item));

  // update Item quantity
  const addItemQuantity = (item, quantity) => {
    setCartItems(addItemQuantityToCart(cartItems, item, quantity));
  };
  // update Price
  const addItemPrice = (item, price) => {
    // comming from utils
    console.log(price);
    setCartItems(addItemPriceToCart(cartItems, item, price));
  };
  const addItemDiscount = (item, discount) => {
    // comming from utils
    console.log(discount);
    setCartItems(addItemDiscountToCart(cartItems, item, discount));
  };
  const getItemPriceFromCart = (item) =>
    setCartItems(removeItemFromCart(cartItems, item));

  const removeItem = (item) =>
    setCartItems(removeItemFromCart(cartItems, item));

  const clearItemFromCart = (item) =>
    setCartItems(filterItemFromCart(cartItems, item));

  const toggleHidden = () => setHidden(!hidden);

  useEffect(() => {
    setCartItemsCount(getCartItemsCount(cartItems));
  }, [cartItems]);

  useEffect(() => {
    setTotalPrice(getTotalPrice(cartItems));
  }, [cartItems]);

  return (
    <CartContext.Provider
      value={{
        hidden,
        toggleHidden,
        cartItems,
        removeItem,
        getItemPriceFromCart,
        addItem,
        addItemQuantity,
        addItemPrice,
        addItemDiscount,
        cartItemsCount,
        clearItemFromCart,
        totalPrice
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
