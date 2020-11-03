export const addItemToCart = (cartItems, cartItemToAdd) => {
  const existingCartItem = cartItems.find(
    (cartItem) => cartItem.id === cartItemToAdd.id
  );

  if (existingCartItem) {
    return cartItems.map((cartItem) =>
      cartItem.id === cartItemToAdd.id
        ? {
            ...cartItem,
            quantity: cartItem.quantity + 1,
            discount: 0,
            basePrice: cartItem.price,
            calculState: 0
          }
        : cartItem
    );
  }

  return [
    ...cartItems,
    {
      ...cartItemToAdd,
      quantity: 1,
      discount: 0,
      basePrice: cartItemToAdd.price,
      calculState: 0
    }
  ];
};

export const addItemQuantityToCart = (cartItems, cartItemToAdd, quantity) => {
  const existingCartItem = cartItems.find(
    (cartItem) => cartItem.id === cartItemToAdd.id
  );

  if (existingCartItem) {
    return cartItems.map((cartItem) =>
      cartItem.id === cartItemToAdd.id
        ? { ...cartItem, quantity: quantity }
        : cartItem
    );
  }

  return [...cartItems, { ...cartItemToAdd, quantity: quantity }];
};

export const addItemPriceToCart = (cartItems, cartItemToAdd, price) => {
  const existingCartItem = cartItems.find(
    (cartItem) => cartItem.id === cartItemToAdd.id
  );

  if (existingCartItem) {
    return cartItems.map((cartItem) => {
      // 100 - (100 * (original price - fixed amount off) / original price)

      const percentChange = parseFloat(
        ((cartItem.basePrice - price) / cartItem.basePrice) * 100
      ).toFixed(2);
      return cartItem.id === cartItemToAdd.id
        ? { ...cartItem, price: price, discount: percentChange, calculState: 1 }
        : cartItem;
    });
  }

  return [...cartItems, { ...cartItemToAdd, price: price, discount: 0 }];
};
export const addItemDiscountToCart = (cartItems, cartItemToAdd, discount) => {
  const existingCartItem = cartItems.find(
    (cartItem) => cartItem.id === cartItemToAdd.id
  );

  if (existingCartItem) {
    console.log(cartItems);
    return cartItems.map((cartItem) => {
      const newPrice =
        cartItem.basePrice - (discount / 100) * cartItem.basePrice;

      return cartItem.id === cartItemToAdd.id
        ? {
            ...cartItem,
            discount: discount,
            price: newPrice,
            calculState: 2
          }
        : cartItem;
    });
  }

  return [
    ...cartItems,
    { ...cartItemToAdd, discount: discount, price: cartItemToAdd.basePrice }
  ];
};
export const removeItemFromCart = (cartItems, cartItemToRemove) => {
  const existingCartItem = cartItems.find(
    (cartItem) => cartItem.id === cartItemToRemove.id
  );

  if (existingCartItem.quantity === 1) {
    return cartItems.filter((cartItem) => cartItem.id !== cartItemToRemove.id);
  }

  return cartItems.map((cartItem) =>
    cartItem.id === cartItemToRemove.id
      ? { ...cartItem, quantity: cartItem.quantity - 1 }
      : cartItem
  );
};

export const filterItemFromCart = (cartItems, item) =>
  cartItems.filter((cartItem) => cartItem.id !== item.id);

export const getCartItemsCount = (cartItems) =>
  cartItems.reduce(
    (accumalatedQuantity, cartItem) => accumalatedQuantity + cartItem.quantity,
    0
  );
/*discounted_price = original_price - (original_price * discount / 100)*/
export const getTotalPriceNoDiscount = (cartItems) =>
  cartItems.reduce((accumalatedQuantity, cartItem) => {
    console.log(cartItem);
    return (
      accumalatedQuantity +
      cartItem.quantity *
        (cartItem.price - (cartItem.price * cartItem.discount) / 100)
    );
  }, 0);
export const getTotalPrice = (cartItems) =>
  cartItems.reduce(
    (accumalatedQuantity, cartItem) =>
      accumalatedQuantity + cartItem.quantity * cartItem.price,
    0
  );
export const getItemPrice = (cartItem) =>
  cartItem.quantity *
  (cartItem.price - (cartItem.price * cartItem.discount) / 100);
