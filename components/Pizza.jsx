import React, { useState } from "react";
import { Button, Card, Row, Col, Select } from "antd";

import { getUUID } from "../utils/udid";

const { Option } = Select;

const Pizza = ({ pizza, addToCart }) => {
  const [size, setSize] = useState(1);
  const [crust, setCrust] = useState(1);

  const sizeOptions = pizza.sizes.map((size) => ({
    label: size.name,
    value: size.id,
  }));

  const crustOptions = pizza.crusts.map((crust) => ({
    label: crust.name,
    value: crust.id,
  }));

  const onAddToCart = () => {
    addToCart({
      uuid: getUUID(),
      pizza_id: pizza.id,
      size_id: size,
      crust_id: crust,
      quantity: 1,
    });
  };

  return (
    <Card title={pizza.title}>
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
                defaultValue={size}
                style={{ width: "100%" }}
                onChange={(value) => setSize(value)}
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
                defaultValue={crust}
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
