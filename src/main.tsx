/** @format */

import "styles/globals.scss";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "routes/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "components/Navbar";

ReactDOM.createRoot(document.getElementById("root")!).render(
	<React.StrictMode>
		<BrowserRouter>
			<Navbar />
			<Routes>
				<Route path='/' element={<App />} />
			</Routes>
		</BrowserRouter>
	</React.StrictMode>
);
