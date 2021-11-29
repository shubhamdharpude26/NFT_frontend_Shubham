import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import Home from "./Component/Home";
import Hero from "./Hero.js"
import reportWebVitals from "./reportWebVitals";
import store from "./redux/store";
import { Provider } from "react-redux";
// import "./styles/reset.css";
// import "./styles/theme.css";

ReactDOM.render(
  <Provider store={store}>
    <Home />
  </Provider>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
