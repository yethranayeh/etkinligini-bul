/** @format */
import "styles/reset.css";
import { useEffect, useContext } from "react";
import { EventDataContext } from "context/EventDataContext";
import EventsDisplay from "components/EventsDisplay";

function App() {
	const data = useContext(EventDataContext);

	useEffect(() => {
		document.title = "Etkinliğini Bul";
	}, []);

	return (
		<>
			<EventsDisplay events={data} />
		</>
	);
}

export default App;
