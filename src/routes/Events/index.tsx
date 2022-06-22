/** @format */
import type { EventType } from "types/EventType";
import { useState, useContext, useEffect } from "react";
import { EventDataContext } from "context/EventDataContext";
import { useSearchParams } from "react-router-dom";
import { Grid } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { ErrorAlert } from "components/Alerts";
import filterEventsByDateRange from "utils/filterEventsByDateRange";
import EventsDisplay from "components/EventsDisplay";
import SideBar from "./SideBar";
import styles from "./Events.module.scss";

function EventsPage() {
	const data = useContext(EventDataContext);
	const isDesktop = useMediaQuery("(min-width: 1000px)");

	const [searchParams, setSearchParams] = useSearchParams();
	const [events, setEvents] = useState<EventType[]>(data);
	const [dateRange, setDateRange] = useState<[Date | null, Date | null]>([null, null]);

	function filterBySearchParams(eventArr: EventType[]) {
		return eventArr.filter((event) => {
			const category = searchParams.getAll("kategori");
			const city = searchParams.getAll("sehir");
			const venue = searchParams.getAll("mekan");

			if (category.length > 0) {
				if (!category.includes(event.category)) {
					return false;
				}
			}

			if (city.length > 0 && !city.includes(event.city)) {
				return false;
			}

			if (venue.length > 0 && !venue.includes(event.venue)) {
				return false;
			}

			return true;
		});
	}

	useEffect(() => {
		document.title = "Etkinlikler";
	}, []);

	// useEffect(() => {
	// 	let mounted = true;
	// 	if (mounted) {
	// 		if (!dateRange[0] && !dateRange[1]) {
	// 			setEvents(events.filter((event) => filterBySearchParams(event)));
	// 		}
	// 	}

	// 	return () => {
	// 		mounted = false;
	// 	};
	// }, [searchParams]);

	useEffect(() => {
		let mounted = true;

		if (mounted) {
			if (dateRange[0] && dateRange[1]) {
				setEvents(filterEventsByDateRange(filterBySearchParams(data), dateRange as [Date, Date]));
			} else {
				setEvents(filterBySearchParams(data));
			}
		}
	}, [dateRange, searchParams]);

	return (
		<>
			<Grid>
				<Grid.Col span={isDesktop ? 3 : 4} classNames={[styles.col, styles.colLeft]}>
					<SideBar
						searchParams={searchParams}
						setSearchParams={setSearchParams}
						dateRange={dateRange}
						setDateRange={setDateRange}
					/>
				</Grid.Col>
				<Grid.Col span={isDesktop ? 9 : 8} classNames={[styles.col, styles.colRight]}>
					{events.length > 0 ? (
						<EventsDisplay events={events} smaller />
					) : (
						<ErrorAlert text='Aranan kriterlere göre etkinlik bulunamadı' />
					)}
				</Grid.Col>
			</Grid>
		</>
	);
}

export default EventsPage;
