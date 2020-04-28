import React, { useEffect, useState } from "react";
import { Row, Col, Input, Button, message, Form } from "antd";
import { connect } from "react-redux";
import Router from "next/router";

import { getUUID } from "../utils/udid";
import {
  fetchCart,
  placeOrder,
  placeOrderSuccess,
  placeOrderError,
} from "../store/actions";
import Heading from "../components/Heading";
import Navbar from "../components/Navbar";
import CartItem from "../components/CartItem";
import Loading from "../components/Loading";
import { DeliveryFee } from "../utils/constants";

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
            <p className="cart-heading" style={{ textAlign: "right" }}>
              Price
            </p>
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

  const onPlaceOrder = (values) => {
    placeOrder({
      uuid: getUUID(),
      ...values,
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
      <Heading title="Place Order" />
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
            </Row>
          </div>
        </div>
        <Form onFinish={onPlaceOrder}>
          <div className="form-container">
            <p>Delivery Address</p>
            <div className="form-group">
              <Form.Item
                name="name"
                rules={[{ required: true, message: "Please input your name!" }]}
              >
                <Input placeholder="Name" />
              </Form.Item>
            </div>
            <div className="form-group">
              <Form.Item
                name="email"
                rules={[
                  {
                    required: true,
                    type: "email",
                    message: "Please input your email!",
                  },
                ]}
              >
                <Input placeholder="E-mail" />
              </Form.Item>
            </div>
            <div className="form-group">
              <Form.Item
                name="phone"
                rules={[
                  {
                    required: true,
                    message: "Please input your phone!",
                  },
                ]}
              >
                <Input placeholder="Phone Number" />
              </Form.Item>
            </div>
            <div className="form-group">
              <Form.Item
                name="address"
                rules={[
                  { required: true, message: "Please input your address!" },
                ]}
              >
                <TextArea rows={3} placeholder="address" />
              </Form.Item>
            </div>
          </div>
          <div className="cart-order-container">
            <Button type="primary" htmlType="submit">
              Place Order
            </Button>
          </div>
        </Form>
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
