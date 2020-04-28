import React from "react";
import { Modal, Row, Col } from "antd";
import { connect } from "react-redux";

import CartItem from "./CartItem";

const CartModal = ({ visible, cartItems, onClose }) => {
  const renderHeading = () => {
    return (
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
    );
  };

  const renderCartItems = () => {
    if (cartItems.length === 0) {
      return <p className="no-items-cart">No items in the cart</p>;
    }
    return cartItems.map((cartItem, index) => (
      <CartItem cartItem={cartItem} key={`CART_ITEM_${index}`} />
    ));
  };
  return (
    <Modal visible={visible} title="Cart" onCancel={onClose}>
      <div className="cart-container">
        <div className="cart-items-container">
          {cartItems.length > 0 && renderHeading()}
          {renderCartItems()}
        </div>
      </div>
    </Modal>
  );
};

const mapStateToProps = (state) => {
  return {
    cartItems: state.cartReducer.cartItems,
  };
};

export default connect(mapStateToProps)(CartModal);
