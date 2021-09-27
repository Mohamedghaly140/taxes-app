import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import store from "./redux/store";
import "bootstrap-v4-rtl/dist/css/bootstrap-rtl.min.css";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { toast } from "react-toastify";
import { BrowserRouter } from "react-router-dom";

toast({
	position: "top-right",
	autoClose: 5000,
	hideProgressBar: false,
	closeOnClick: true,
	pauseOnHover: true,
	draggable: true,
	progress: undefined,
});

ReactDOM.render(
	<BrowserRouter>
		<Provider store={store}>
			<App />
		</Provider>
	</BrowserRouter>,
	document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
