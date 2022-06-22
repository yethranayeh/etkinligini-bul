/** @format */
import { useContext, useEffect } from "react";
import { EventDataContext } from "context/EventDataContext";
import { useSearchParams } from "react-router-dom";
import { Grid } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { ErrorAlert } from "components/Alerts";
import EventsDisplay from "components/EventsDisplay";
import SideBar from "./SideBar";
import styles from "./Events.module.scss";

function EventsPage() {
	const data = useContext(EventDataContext);

	const [searchParams, setSearchParams] = useSearchParams();

	const events = data.filter((event) => {
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

	const isDesktop = useMediaQuery("(min-width: 1000px)");

	useEffect(() => {
		document.title = "Etkinlikler";
	}, []);

	return (
		<>
			<Grid>
				<Grid.Col span={isDesktop ? 3 : 4} classNames={[styles.col, styles.colLeft]}>
					<SideBar searchParams={searchParams} setSearchParams={setSearchParams} />
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
