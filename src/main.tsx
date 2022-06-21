/** @format */

import "styles/globals.scss";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "routes/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "components/Navbar";
import EventPage from "routes/Event";

ReactDOM.createRoot(document.getElementById("root")!).render(
	<React.StrictMode>
		<BrowserRouter>
			<Navbar />
			<main className='app-content'>
				<Routes>
					<Route path='/' element={<App />} />
					<Route path='/etkinlik/:eventId' element={<EventPage />} />
				</Routes>
			</main>
		</BrowserRouter>
	</React.StrictMode>
);
