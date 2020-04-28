import React from "react";
import { Button, Badge } from "antd";
import {
  FaShoppingCart,
  FaUserAlt,
  FaSignOutAlt,
  FaShoppingBag,
} from "react-icons/fa";
import Router from "next/router";
import { connect } from "react-redux";

import { logout } from "../store/actions";

const Navbar = ({ cartItems, user, logout }) => {
  return (
    <header>
      <div className="navLogoContainer">
        <p className="navLogo" onClick={() => Router.push("/")}>
          Yummy Pizza
        </p>
      </div>
      <ul className="navLinks">
        <li>
          <Badge count={cartItems.length}>
            <Button
              shape="circle"
              icon={<FaShoppingCart />}
              size="large"
              onClick={() => Router.push("/cart")}
            />
          </Badge>
        </li>
        {user && (
          <li>
            <Button
              shape="circle"
              icon={<FaShoppingBag />}
              size="large"
              onClick={() => Router.push("/orders")}
            />
          </li>
        )}
        {user && (
          <li>
            <Button
              shape="circle"
              icon={<FaSignOutAlt />}
              size="large"
              onClick={() => {
                logout();
                Router.push("/");
              }}
            />
          </li>
        )}
        {!user && (
          <li>
            <Button
              shape="circle"
              icon={<FaUserAlt />}
              size="large"
              onClick={() => Router.push("/signin")}
            />
          </li>
        )}
      </ul>
    </header>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.authReducer.user,
    cartItems: state.cartReducer.cartItems,
  };
};

const mapDispatchToProps = {
  logout,
};

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
