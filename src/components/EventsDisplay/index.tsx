/** @format */

import type { EventType } from "types/EventType";
import { useMediaQuery } from "@mantine/hooks";
import { Grid, Tabs } from "@mantine/core";
import EventCard from "components/EventCard";
import sortByDate from "utils/sortByDate";

function EventsDisplay({ events, smaller }: { events: EventType[]; smaller?: boolean }) {
	const upcomingEvents = sortByDate(
		events.filter((event) => new Date(event.date) > new Date()),
		// sort by ascending because user should see the closest events first
		true
	);

	const pastEvents = sortByDate(
		events.filter((event) => new Date(event.date) < new Date()),
		// sort by descending because user should see the events they just missed
		false
	);

	const isMobile = useMediaQuery("(max-width: 768px)");
	const isTablet = useMediaQuery("(min-width: 768px) and (max-width: 1024px)");
	const isDesktop = useMediaQuery("(min-width: 1200px)");

	let colSpan: number;
	if (smaller) {
		colSpan = isMobile ? 12 : isTablet ? 6 : isDesktop ? 4 : 4;
	} else {
		colSpan = isMobile ? 6 : isTablet ? 4 : isDesktop ? 2 : 3;
	}

	return (
		<Tabs>
			<Tabs.Tab label='Mevcut Etkinlikler' color='green'>
				<Grid align='stretch' gutter={isMobile ? "xs" : isTablet ? "sm" : "md"}>
					{upcomingEvents.map((event) => (
						<Grid.Col span={colSpan} key={event._id}>
							<EventCard event={event} />
						</Grid.Col>
					))}
				</Grid>
			</Tabs.Tab>
			<Tabs.Tab label='Geçmiş Etkinlikler' color='red'>
				<Grid align='stretch' gutter={isMobile ? "xs" : isTablet ? "sm" : "md"}>
					{pastEvents.map((event) => (
						<Grid.Col
							span={colSpan}
							key={event._id}
							style={{
								height: "100%"
							}}>
							<EventCard event={event} />
						</Grid.Col>
					))}
				</Grid>
			</Tabs.Tab>
		</Tabs>
	);
}

export default EventsDisplay;
