import React, { useEffect, useState } from "react";
import { Row, Col, Input, Button, message } from "antd";
import { connect } from "react-redux";
import Router from "next/router";

import { getUUID } from "../utils/udid";
import {
  fetchCart,
  placeOrder,
  placeOrderSuccess,
  placeOrderError,
} from "../store/actions";
import Navbar from "../components/Navbar";
import CartItem from "../components/CartItem";
import Loading from "../components/Loading";

const DeliveryFee = 2;
const { TextArea } = Input;

const PlaceOrder = ({
  cartItems,
  fetchCart,
  placeOrder,
  isLoading,
  success,
  error,
  placeOrderSuccess,
  placeOrderError,
}) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

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
          <Col span={6}>
            <p className="cart-heading">Price</p>
          </Col>
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
        editable={false}
      />
    ));
  };

  let totalItemsPrice = 0;
  cartItems.forEach((cartItem) => {
    totalItemsPrice += cartItem.price * cartItem.quantity;
  });

  const onPlaceOrder = () => {
    placeOrder({
      uuid: getUUID(),
      name,
      email,
      phone,
      address,
    });
  };

  useEffect(() => {
    if (!success) return;
    message.success(success);
    fetchCart();
    Router.push("/");
    placeOrderSuccess({ message: null });
  }, [success]);

  useEffect(() => {
    if (!error) return;
    message.error(error);
    fetchCart();
    placeOrderError({ message: null });
  }, [error]);

  return (
    <div className="container">
      <Navbar />
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
              <Col span={6}>
                <p className="price-label">Price: ${totalItemsPrice}</p>
                <p className="price-label">Delivery Fee: ${DeliveryFee}</p>
                <p className="total-price-label">
                  Total: ${totalItemsPrice + DeliveryFee}
                </p>
              </Col>
            </Row>
          </div>
        </div>
        <div className="form-container">
          <p>Delivery Address</p>
          <div className="form-group">
            <Input
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="form-group">
            <Input
              placeholder="E-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="form-group">
            <Input
              placeholder="Phone Number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
          <div className="form-group">
            <TextArea
              rows={3}
              placeholder="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>
        </div>
        <div className="cart-order-container">
          <Button type="primary" onClick={onPlaceOrder}>
            Place Order
          </Button>
        </div>
      </div>
      {isLoading && <Loading />}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    cartItems: state.cartReducer.cartItems,
    success: state.ordersReducer.success,
    error: state.ordersReducer.error,
    isLoading: state.loaderReducer.loader,
  };
};

const mapDispatchToProps = {
  fetchCart,
  placeOrder,
  placeOrderSuccess,
  placeOrderError,
};

export default connect(mapStateToProps, mapDispatchToProps)(PlaceOrder);
