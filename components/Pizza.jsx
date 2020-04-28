import React, { useState, useEffect } from "react";
import { Button, Card, Row, Col, Select } from "antd";

import { getUUID } from "../utils/udid";

const { Option } = Select;

const Pizza = ({ pizza, addToCart }) => {
  const [size, setSize] = useState(0);
  const [crust, setCrust] = useState(0);
  const [crustOptions, setCrustOptions] = useState([]);
  const [sizeOptions, setSizeOptions] = useState([]);

  useEffect(() => {
    const sizeOptions = pizza.sizes.map((size) => ({
      label: size.name,
      value: size.id,
    }));
    const size = sizeOptions.length > 0 ? sizeOptions[0].value : 0;
    setCrustOptionsBasedOnSize(size);
    setSizeOptions(sizeOptions);
    setSize(size);
  }, []);

  const onAddToCart = () => {
    addToCart({
      uuid: getUUID(),
      pizza_id: pizza.id,
      size_id: size,
      crust_id: crust,
      quantity: 1,
    });
  };

  const setCrustOptionsBasedOnSize = (size) => {
    const availableCrust = pizza.prices
      .filter((price) => parseInt(price.size_id) === size)
      .map((price) => parseInt(price.crust_id));
    const crustOptions = pizza.crusts
      .filter((crust) => availableCrust.includes(crust.id))
      .map((crust) => ({
        label: crust.name,
        value: crust.id,
      }));
    setCrust(crustOptions.length > 0 ? crustOptions[0].value : 0);
    setCrustOptions(crustOptions);
  };

  return (
    <Card
      title={pizza.name}
      style={{ marginBottom: "20px", display: "flex", flexDirection: "column" }}
      flex={1}
    >
      <div className="pizza-block">
        <div className="pizza-image-wrapper">
          <img src="/images/pizza-default.jpg" className="pizza-image" />
        </div>
        <p className="pizza-desc">{pizza.description}</p>
        <div className="pizza-option-wrapper">
          <Row gutter={16}>
            <Col span={10}>
              <p className="select-label">Size</p>
              <Select
                value={size}
                style={{ width: "100%" }}
                onChange={(value) => {
                  setSize(value);
                  setCrustOptionsBasedOnSize(value);
                }}
              >
                {sizeOptions.map((sizeOption) => (
                  <Option
                    value={sizeOption.value}
                    key={`SIZE_OPTION_${sizeOption.value}`}
                  >
                    {sizeOption.label}
                  </Option>
                ))}
              </Select>
            </Col>
            <Col span={14}>
              <p className="select-label">Crust</p>
              <Select
                value={crust}
                style={{ width: "100%" }}
                onChange={(value) => setCrust(value)}
              >
                {crustOptions.map((crustOption) => (
                  <Option
                    value={crustOption.value}
                    key={`CRUST_OPTION_${crustOption.value}`}
                  >
                    {crustOption.label}
                  </Option>
                ))}
              </Select>
            </Col>
          </Row>
        </div>
        <Button type="primary" onClick={onAddToCart}>
          ADD TO CART
        </Button>
      </div>
    </Card>
  );
};

export default Pizza;
