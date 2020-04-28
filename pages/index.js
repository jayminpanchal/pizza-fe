import React, { useState, useEffect } from "react";
import {
  Button,
  Badge,
  Card,
  Row,
  Col,
  Select,
  Modal,
  InputNumber,
} from "antd";
import { FaShoppingCart, FaUserAlt, FaTrash } from "react-icons/fa";
import { connect } from "react-redux";

import { fetchPizzas } from "../store/actions";
import Navbar from "../components/Navbar";
import Pizzas from "../components/Pizzas";
import Loading from "../components/Loading";

const Home = ({ fetchPizzas, isLoading }) => {
  const [showCartModal, setShowCardModal] = useState(false);

  useEffect(() => {
    fetchPizzas();
  }, []);

  return (
    <div className="container">
      <Navbar />
      <div className="content-container">
        <Pizzas />
      </div>
      {isLoading && <Loading />}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    isLoading: state.loaderReducer.loader,
  };
};

const mapDispatchToProps = {
  fetchPizzas,
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
