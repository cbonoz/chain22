import React, { useEffect, useState } from "react";
import { Button, Steps } from "antd";
import { Row, Col } from "antd";
import { Typography, Divider } from "antd";


import hero from "./../assets/humans.png";
import logo from "./../assets/logo.png";
import { CheckCircleTwoTone } from "@ant-design/icons";
import { APP_DESC, APP_NAME } from "../util/constants";
import { useNavigate } from "react-router";

const { Title, Paragraph, Text, Link } = Typography;
const { Step } = Steps;

const REASONS = [
];

function About({address, login}) {
  const navigate = useNavigate()
  return (
    <div className="content about-page hero-section">
      <Row>
        <Col span={11}>
          {/* <Title>{APP_NAME}</Title> */}
          <img src={logo} className='hero-title'/>
          <h3>{APP_DESC}</h3>
          <hr/>
          <br />

          {REASONS.map((r, i) => {
            return (
              <div key={i} className='reason'>
                <CheckCircleTwoTone twoToneColor="#52c41a" />
                &nbsp;
                {r}.
              </div>
            );
          })}
        </Col>
        <Col span={13}>
          <img src={hero} className='hero-image'/>
        </Col>
      </Row>

      <Row>
        <br/>
        <Button className="standard-btn" type="primary" size="large" onClick={address ? navigate('/create') : login}>{address ? 'Create Captchain' : 'Connect wallet'}</Button>
        {address && <span>&nbsp;
        <Button className="standard-btn" type="secondary" size="large" onClick={() => navigate('/discover')}>Find Captchain</Button>
          </span>}
      </Row>

      <p></p>
      {/* <img src={logo} className="hero-logo" /> */}
      {/* <Steps current={3} size="large" className="header-steps">
        <Step title="Stream" description="Stream from ContentStream or using your favorite existing platform." />
        <Step
          title="List"
          description="Use ContentStream to list and sell rights and access to your previous Streams."
        />
        <Step title="Earn" description="Get paid for your new and existing content." />
      </Steps> */}
    </div>
  );
}

export default About;