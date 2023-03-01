import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Button } from "@mui/material";
import css from "../backgroundslider/bgslider.module.css";
import { AudioOutlined } from "@ant-design/icons";
import { Input, Space } from "antd";

const { Search } = Input;
const suffix = (
  <AudioOutlined
    style={{
      fontSize: 16,
      color: "#1890ff",
    }}
  />
);

const onSearch = (value) => console.log(value);

const ImageSlider = () => {
  return (
    <Container fluid>
      <div className={css.container}>
        <div className={css.slider}>
          <div className={css.content}>
            <h2>
              <span>E</span>beuk
            </h2>

            <div className={css.heading}>
              <p>
                Obtenez les Meilleures <span>Fournisseurs</span> de services
                pour tout type d'evenement
              </p>

              <div className={css.search_wrapper}>
                <div className={css.search}>
                  <Space direction="vertical">
                    <Search
                      placeholder="input search text"
                      onSearch={onSearch}
                      enterButton
                      size="large"
                      className="sc"
                    />
                  </Space>
                </div>
              </div>

              <div className={css.popular}>
                Top Services
                <Button className={css.btn} variant="text" size="small">
                  Wedding planner
                </Button>
                <Button className={css.btn} variant="text" size="small">
                  Graphiste
                </Button>
                <Button className={css.btn} variant="text" size="small">
                  Animateur
                </Button>
                <Button className={css.btn} variant="text" size="small">
                  Traiteur
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default ImageSlider;
