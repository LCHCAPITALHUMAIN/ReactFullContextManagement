import React, { useContext } from "react";

import "./checkout-item.styles.scss";
import { CartContext } from "../../providers/cart/cart.provider";

const CheckoutItem = ({ cartItem }) => {
  const { name, imageUrl, price, quantity, discount, basePrice } = cartItem;
  const {
    addItem,
    removeItem,
    clearItemFromCart,
    addItemQuantity,
    addItemDiscount,
    addItemPrice,
    getItemPriceFromCart
  } = useContext(CartContext);

  const getItemPriceWithDiscount = (cartItem) =>
    parseFloat(cartItem.quantity * cartItem.price).toFixed(2);

  const getDiscountAmount = (cartItem) =>
    parseFloat(
      cartItem.quantity * cartItem.basePrice -
        getItemPriceWithDiscount(cartItem)
    ).toFixed(2);

  const getBasePriceTotal = (cartItem) =>
    parseFloat(cartItem.quantity * cartItem.basePrice).toFixed(2);

  const Input = ({ value, onChange }) => (
    <input value={value} onChange="{onChange({ value: event.target.value })" />
  );
  let _myClasses = `btn-group pull-right {basePrice===price?'discounted':'discounted'}`;

  return (
    <div className="checkout-item">
      <div className="checkout-header">
        <div className="header-block">
          <span>{name}</span>
        </div>
        <div className="header-block">
          <span>Base : {basePrice}</span>
        </div>
        <div className="header-block">
          <table>
            <tbody>
              <tr>
                <td>Quantity</td>
                <td>
                  <span>
                    <input
                      type="number"
                      step="1"
                      className="value"
                      value={quantity}
                      onChange={(e) =>
                        addItemQuantity(cartItem, e.target.value)
                      }
                    />
                  </span>
                </td>
              </tr>
              <tr>
                <td>Price</td>
                <td>
                  <span>
                    <input
                      type="number"
                      step="0.1"
                      className="value"
                      value={price}
                      onChange={(e) => addItemPrice(cartItem, e.target.value)}
                    />
                  </span>
                </td>
              </tr>
              <tr>
                <td>Discount</td>
                <td>
                  <span>
                    <input
                      type="number"
                      step="0.1"
                      className="value"
                      value={discount}
                      onChange={(e) =>
                        addItemDiscount(cartItem, e.target.value)
                      }
                    />
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="header-block">
          <span> &nbsp; </span>
        </div>
        <div className="header-block">
          <table>
            <tbody>
              <tr>
                <td>No discount</td>
                <td>
                  <span
                    className={`${basePrice <= price ? "show" : "discounted"}`}
                  >
                    {getBasePriceTotal(cartItem)}
                  </span>
                </td>
              </tr>
              <tr>
                <td>With discount</td>
                <td>
                  <span>{getItemPriceWithDiscount(cartItem)}</span>
                </td>
              </tr>
              <tr>
                <td>Saved</td>
                <td>
                  <span>{getDiscountAmount(cartItem)}</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="header-block">
          <div
            className="remove-button"
            onClick={() => clearItemFromCart(cartItem)}
          >
            &#10005;
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutItem;
