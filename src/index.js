
   
import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import { MORALIS_ID, MORALIS_SERVER } from "./util/constants";
import { MoralisProvider } from "react-moralis";

ReactDOM.render(
  <React.StrictMode>
      {/* <MoralisProvider serverUrl={MORALIS_SERVER} appId={MORALIS_SERVER}> */}
        <BrowserRouter>
          <App/>
        </BrowserRouter>
      {/* </MoralisProvider> */}
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();