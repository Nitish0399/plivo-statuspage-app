import React from "react";
import "./App.css";

import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";

import AppRouter from "./router";
import store from "./state/store";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Provider store={store}>
          <AppRouter />
        </Provider>
      </BrowserRouter>
    </div>
  );
}

export default App;
