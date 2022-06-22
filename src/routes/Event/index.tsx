/** @format */

import { useEffect, useContext, useRef } from "react";
import { EventDataContext } from "context/EventDataContext";
import { useParams, Link } from "react-router-dom";
import { Card, Text, Title, Stack, Group, Divider, Button, ActionIcon } from "@mantine/core";
import TicketForm from "./TicketForm";
import ImageSlider from "./ImageSlider/ImageSlider";
import YandexMap from "./YandexMap";
import { ErrorAlert } from "components/Alerts";
import { BsTwitter, FaFacebookF, FaLinkedinIn, FaMapMarkerAlt, RiBuilding3Fill } from "icons";

function Event() {
	const data = useContext(EventDataContext);
	const { eventId } = useParams();
	const event = data.find((event) => event._id === eventId);
	const MapDividerRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (event) {
			document.title = `${event.name} - Etkinliğini Bul`;
		}
	}, []);

	return event ? (
		<Stack spacing='xs'>
			<Card shadow='sm' p='sm' id='detaylar'>
				<Title order={2} mb='sm'>
					<Text inherit variant='gradient' gradient={{ from: "dark", to: "gray", deg: 45 }}>
						{event.name}
					</Text>
				</Title>
				<Card.Section>
					<ImageSlider pictures={event.pictures} />
				</Card.Section>
				<Stack spacing='xs' mt='sm'>
					<Title order={3}>
						<Text inherit color='gray'>
							Detaylar
						</Text>
					</Title>
					<Text component='p' color='gray'>
						Mekan:{" "}
						<Button
							compact
							leftIcon={<RiBuilding3Fill />}
							variant='outline'
							color='grape'
							component={Link}
							to={`/etkinlikler?mekan=${event.venue}`}>
							{event.venue}
						</Button>
					</Text>

					<Text component='p' color='gray'>
						Adres:{" "}
						<Button
							compact
							variant='light'
							color='grape'
							leftIcon={<FaMapMarkerAlt />}
							onClick={() => {
								// smooth scroll to id "harita"
								MapDividerRef.current!.scrollIntoView({ behavior: "smooth" });
							}}>
							{event.address}
						</Button>
					</Text>
					<Text component='p' color='gray'>
						{event.startDate === event.endDate ? "Tarih: " : "Tarih Aralığı: "}
						<Text component='span' color='dark' size='lg'>
							{event.startDate === event.endDate
								? new Date(event.startDate).toLocaleDateString()
								: `${new Date(event.startDate).toLocaleDateString()} - ${new Date(event.endDate).toLocaleDateString()}`}
						</Text>
					</Text>
					<Group spacing='sm'>
						<Text component='span' color='gray'>
							Paylaş:
						</Text>
						<ActionIcon
							variant='filled'
							color='blue'
							component='a'
							href={`https://www.facebook.com/sharer/sharer.php?u=${window.location.href}`}
							target='_blank'>
							<FaFacebookF />
						</ActionIcon>
						<ActionIcon
							variant='filled'
							color='cyan'
							component='a'
							href={`https://twitter.com/home?status=${event.name}: ${window.location.href} @Etstur #EtkinliginiBul #EtsChallenge`}
							target='_blank'>
							<BsTwitter />
						</ActionIcon>
						<ActionIcon
							variant='filled'
							color='blue'
							component='a'
							href={`https://www.linkedin.com/shareArticle?mini=true&url=${window.location.href}&title=${event.name}&source=`}
							target='_blank'>
							<FaLinkedinIn />
						</ActionIcon>
					</Group>
					<Text component='p'>{event.description}</Text>
				</Stack>
			</Card>

			<Card shadow='sm' p='sm' id='bilet'>
				<TicketForm event={event} />
			</Card>

			<Divider
				ref={MapDividerRef}
				label={
					<>
						<FaMapMarkerAlt />
						<Text component='span'>Harita</Text>
					</>
				}
				labelPosition='center'
				id='harita'
			/>
			<YandexMap loc={{ city: event.city, location: event.location }} />
		</Stack>
	) : (
		<ErrorAlert text='Etkinlik bulunamadı' />
	);
}

export default Event;
