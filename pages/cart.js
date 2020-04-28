import React, { useEffect } from "react";
import { Row, Col, Button } from "antd";
import { connect } from "react-redux";
import Router from "next/router";

import { getUUID } from "../utils/udid";

import { fetchCart, removeFromCart, updateCart } from "../store/actions";
import Navbar from "../components/Navbar";
import CartItem from "../components/CartItem";
import Loading from "../components/Loading";

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
            <p className="cart-heading">Price</p>
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

  return (
    <div className="container">
      <Navbar />
      <div className="content-container">
        <div className="cart-container">
          <div className="cart-items-container">
            {cartItems.length > 0 && renderHeading()}
            {renderCartItems()}
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
