import React, { useEffect } from "react";
import { Row, Col, Card } from "antd";
import { connect } from "react-redux";

import { fetchOrders } from "../store/actions";
import Navbar from "../components/Navbar";
import Heading from "../components/Heading";
import CartItem from "../components/CartItem";
import Loading from "../components/Loading";

const Orders = ({ fetchOrders, isLoading, orders }) => {
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

  const renderCartItems = (cartItems) => {
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

  const renderOrders = () => {
    return orders.map((order, index) => (
      <Card
        style={{ marginBottom: "20px" }}
        title={`Items: ${order.total_items}, Total: $${order.total_amount}`}
        key={`ORDER_${index}`}
      >
        {renderCartItems(order.details)}
      </Card>
    ));
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div className="container">
      <Navbar />
      <Heading title="Orders" />
      <div className="content-container">
        <div className="cart-container">
          <div className="cart-items-container">{renderOrders()}</div>
        </div>
      </div>
      {isLoading && <Loading />}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    orders: state.ordersReducer.orders,
  };
};

const mapDispatchToProps = {
  fetchOrders,
};

export default connect(mapStateToProps, mapDispatchToProps)(Orders);
