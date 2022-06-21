/** @format */

import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Text, Title, Stack, Divider } from "@mantine/core";
import TicketForm from "./TicketForm";
import { RiErrorWarningLine } from "icons/index";
import data from "api/data.json";
import styles from "./Event.module.scss";
import ImageSlider from "./ImageSlider/ImageSlider";
import YandexMap from "./YandexMap";
import { ErrorAlert } from "components/Alerts";

function Event() {
	const { eventId } = useParams();
	const event = data.find((event) => event._id === eventId);

	useEffect(() => {
		if (event) {
			document.title = `${event.name} - Etkinliğini Bul`;
		}
	}, []);

	return event ? (
		<Stack spacing='xs'>
			<Title order={2}>{event.name}</Title>
			<ImageSlider pictures={event.pictures} />
			<Text component='p'>{event.description}</Text>

			<TicketForm event={event} />

			<Divider label='Harita' labelPosition='center' />
			<YandexMap loc={{ city: event.city, location: event.location }} />
		</Stack>
	) : (
		<ErrorAlert text='Etkinlik bulunamadı' />
	);
}

export default Event;
