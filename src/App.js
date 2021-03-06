import React, {useState, useEffect} from 'react'
import { Button, Layout, Menu } from "antd";
import { APP_NAME, MORALIS_ID, MORALIS_SERVER } from "./util/constants";
import { Routes, Route, Link } from "react-router-dom";
import About from "./components/About";
import Moralis from "moralis";
import CreateCaptcha from './components/CreateCaptcha';

import logo from "./assets/logo.png";

import "antd/dist/antd.min.css";
import "./App.css";
import Dashboard from './components/Dashboard';
import Captcha from './components/Captcha';
import CaptchaPage from './components/CaptchaPage';
import { initMoralis } from './util/moral';

const { Header, Footer, Sider, Content } = Layout;
// const MORALIS = false; // Enable for production backend storage.

function App() {
  // const { authenticate, isAuthenticated, address, logout  } = useMoralis();
  const [address, setAddress]= useState()
  
  const logout = async () => {
    console.log('logout')
    await Moralis.User.logOut();
    setAddress(undefined)
  }
 
  async function login() {
    let u = Moralis.User.current();
    if (!u) {
     try {
       console.log('authenticate')
        u = await Moralis.authenticate()
        const addr = u.get('ethAddress')
        setAddress(addr)
        console.log('addr',  addr)
     } catch(error) {
       console.log('err', error)
     }
    }
  }
 
  useEffect(() => {
    initMoralis()
    let u = Moralis.User.current() 
    if (u) {
      setAddress(u.get('ethAddress'))
    }
  }, [])

  console.log('addr', address)

  const fullPath = window.location.href
  const showHeader = fullPath.indexOf('/c/') === -1 // Not on capcha page

  return (
    <div className="App">
      <Layout>
        {showHeader && <Header className="header">
          <Menu theme="light" mode="horizontal" defaultSelectedKeys={["2"]}>
            <Link to="/">
              <Menu.Item key="0">
                <img src={logo} className="header-image" />
              </Menu.Item>
            </Link>
            {!address && <Link to="/">
              <Menu.Item key="1">Get Started</Menu.Item>
            </Link>}
            {!address && <span>
              <Button type="secondary" onClick={login}>Connect wallet</Button>
            </span>}
            {address && <>
              <Link to="/create">
                <Menu.Item key="2">Create Captcha</Menu.Item>
              </Link>
              <Link to="/dashboard">
                <Menu.Item key="3">Dashboard</Menu.Item>
              </Link>
              <span>Active: {address.substr(0,6)}**&nbsp;<a onClick={() => logout()}>Logout</a></span>
            </>}
          </Menu>
        </Header>}
        <Content>
          <div className="container">
            <Routes>
              <Route exact path="/" element={<About address={address} login={login}/>}/>
              <Route exact path="/create" element={<CreateCaptcha address={address} />}/>
              <Route exact path="/dashboard" element={<Dashboard address={address} />}/>
              <Route exact path="/c/:captchaId" element={<CaptchaPage address={address} />}/>
              <Route exact path="/about" element={<About/>}/>
            </Routes>
          </div>
        </Content>
        <Footer>
          {APP_NAME} &copy;2022 - 
          Built for the{" "}
          <a href="https://chainlinkspring2022.devpost.com/" target="_blank">
            Chainlink Spring 2022
          </a>&nbsp;
          hackathon.
        </Footer>
      </Layout>
    </div>
  );
}

export default App;