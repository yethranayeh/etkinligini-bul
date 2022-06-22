/** @format */
import "styles/reset.css";
import type { EventType } from "types/EventType";
import { useState, useEffect, useContext } from "react";
import { EventDataContext } from "context/EventDataContext";
import { Card } from "@mantine/core";
import DateRange from "components/DateRange";
import EventsDisplay from "components/EventsDisplay";
import filterEventsByDateRange from "utils/filterEventsByDateRange";

function App() {
	const data = useContext(EventDataContext);
	const [value, setValue] = useState<[Date | null, Date | null]>([null, null]);
	const [events, setEvents] = useState<EventType[]>(data);

	useEffect(() => {
		document.title = "Etkinliğini Bul";
	}, []);

	useEffect(() => {
		if (value[0] && value[1]) {
			const filteredEvents = filterEventsByDateRange(events, value as [Date, Date]);
			setEvents(filteredEvents);
		} else {
			setEvents(data);
		}
	}, [value]);

	return (
		<>
			<Card withBorder shadow='xs'>
				<DateRange value={value} setValue={setValue} />
			</Card>
			<EventsDisplay events={events} />
		</>
	);
}

export default App;
