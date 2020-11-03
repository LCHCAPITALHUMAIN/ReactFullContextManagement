import React, { useContext } from "react";

import CheckoutItem from "../../components/checkout-item/checkout-item.component";
//import StripeCheckoutButton from '../../components/stripe-button/stripe-button.component';

import "./checkout.styles.scss";
import { CartContext } from "../../providers/cart/cart.provider";

const CheckoutPage = () => {
  const { cartItems, totalPrice } = useContext(CartContext);

  return (
    <div className="checkout-page">
      <div className="checkout-header">
        <div className="header-block">
          <span>Product</span>
        </div>
        <div className="header-block">
          <span>Price/Unit</span>
        </div>
        <div className="header-block">
          <span>Pricing model</span>
        </div>
        <div className="header-block">
          <span>&nbsp;</span>
        </div>
        <div className="header-block">
          <span>Total</span>
        </div>
        <div className="header-block">
          <span>&nbsp;</span>
        </div>
      </div>
      {cartItems.map((cartItem) => (
        <CheckoutItem key={cartItem.id} cartItem={cartItem} />
      ))}
      <div className="total">TOTAL: ${totalPrice}</div>
      <div className="test-warning"></div>
    </div>
  );
};

export default CheckoutPage;
