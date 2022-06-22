/** @format */

import "styles/globals.scss";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "routes/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "components/Navbar";
import EventPage from "routes/Event";
import EventsPage from "routes/Events";
import { EventDataContext } from "context/EventDataContext";
import data from "api/data.json";

ReactDOM.createRoot(document.getElementById("root")!).render(
	<React.StrictMode>
		<BrowserRouter>
			<EventDataContext.Provider value={data}>
				<Navbar />
				<main className='app-content'>
					<Routes>
						<Route path='/' element={<App />} />
						<Route path='/etkinlik/:eventId' element={<EventPage />} />
						<Route path='/etkinlikler' element={<EventsPage />} />
					</Routes>
				</main>
			</EventDataContext.Provider>
		</BrowserRouter>
	</React.StrictMode>
);
