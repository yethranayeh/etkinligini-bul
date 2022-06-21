/** @format */
import type { EventType } from "types/EventType";
import "styles/reset.css";
import { useEffect } from "react";
import { Grid, Tabs } from "@mantine/core";
import EventCard from "components/EventCard";
import data from "api/data.json";

function App() {
	const upcomingEvents = data.filter((event) => new Date(event.date) > new Date());
	const pastEvents = data.filter((event) => new Date(event.date) < new Date());

	useEffect(() => {
		document.title = "Etkinliğini Bul";
	}, []);

	return (
		<>
			<Tabs>
				<Tabs.Tab label='Gelecek Etkinlikler' color='green'>
					<Grid align='stretch'>
						{upcomingEvents.map((event) => (
							<Grid.Col span={4} key={event._id}>
								<EventCard event={event} />
							</Grid.Col>
						))}
					</Grid>
				</Tabs.Tab>
				<Tabs.Tab label='Geçmiş Etkinlikler' color='red'>
					<Grid>
						{pastEvents.map((event) => (
							<Grid.Col span={4} key={event._id}>
								<EventCard event={event} />
							</Grid.Col>
						))}
					</Grid>
				</Tabs.Tab>
			</Tabs>
		</>
	);
}

export default App;
