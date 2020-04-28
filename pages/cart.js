import React, { useEffect } from "react";
import { Row, Col, Button } from "antd";
import { connect } from "react-redux";
import Router from "next/router";

import { getUUID } from "../utils/udid";
import { fetchCart, removeFromCart, updateCart } from "../store/actions";
import Navbar from "../components/Navbar";
import Heading from "../components/Heading";
import CartItem from "../components/CartItem";
import Loading from "../components/Loading";
import { DeliveryFee } from "../utils/constants";

const Cart = ({
  cartItems,
  fetchCart,
  removeFromCart,
  updateCart,
  isLoading,
}) => {
  useEffect(() => {
    fetchCart({ uuid: getUUID() });
  }, []);

  const renderHeading = () => {
    return (
      <div className="cart-heading-container">
        <Row>
          <Col span={12}>
            <p className="cart-heading">Pizza</p>
          </Col>
          <Col span={6}>
            <p className="cart-heading">Quantity</p>
          </Col>
          <Col span={4}>
            <p className="cart-heading" style={{ textAlign: "right" }}>
              Price
            </p>
          </Col>
          <Col span={2}></Col>
        </Row>
      </div>
    );
  };

  const renderCartItems = () => {
    if (cartItems.length === 0) {
      return <p className="no-items-cart">No items in the cart</p>;
    }
    return cartItems.map((cartItem, index) => (
      <CartItem
        cartItem={cartItem}
        key={`CART_ITEM_${index}`}
        removeFromCart={removeFromCart}
        updateCart={updateCart}
        editable
      />
    ));
  };

  let totalItemsPrice = 0;
  cartItems.forEach((cartItem) => {
    totalItemsPrice += cartItem.price * cartItem.quantity;
  });

  return (
    <div className="container">
      <Navbar />
      <Heading title="Cart" />
      <div className="content-container">
        <div className="cart-container">
          <div className="cart-items-container">
            {cartItems.length > 0 && renderHeading()}
            {renderCartItems()}
          </div>
          <div className="cart-total-container">
            <Row>
              <Col span={12}></Col>
              <Col span={6}></Col>
              <Col span={4}>
                <Row>
                  <Col span={12}>
                    <p className="price-label">Price</p>
                    <p className="price-label">Delivery Fee</p>
                    <p className="total-price-label">Total:</p>
                  </Col>
                  <Col span={12}>
                    <div
                      style={{
                        alignItems: "flex-end",
                        display: "flex",
                        flexDirection: "column",
                      }}
                    >
                      <p className="price-label">${totalItemsPrice}</p>
                      <p className="price-label">${DeliveryFee}</p>
                      <p className="total-price-label">
                        ${totalItemsPrice + DeliveryFee}
                      </p>
                    </div>
                  </Col>
                </Row>
              </Col>
              <Col span={2}></Col>
            </Row>
          </div>
          {cartItems.length > 0 && (
            <div className="cart-order-container">
              <Button
                type="primary"
                onClick={() => Router.push("/place-order")}
              >
                Checkout
              </Button>
            </div>
          )}
        </div>
      </div>
      {isLoading && <Loading />}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    cartItems: state.cartReducer.cartItems,
    isLoading: state.loaderReducer.loader,
  };
};

const mapDispatchToProps = {
  fetchCart,
  removeFromCart,
  updateCart,
};

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
