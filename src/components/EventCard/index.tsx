/** @format */

import { EventType } from "types/EventType";
import { Card, Image, Text, Badge, Button, Group, Stack, ScrollArea } from "@mantine/core";
import { Link } from "react-router-dom";
import { HashLink } from "react-router-hash-link";
import styles from "./Card.module.scss";
import { ImTicket } from "icons/index";

type EventCardProps = {
	event: EventType;
};

function EventCard({ event }: EventCardProps) {
	const eventLink = `/etkinlik/${event._id}`;
	const datePassed = new Date(event.date) < new Date();
	return (
		<Card component='article' shadow='sm' p='sm' className={styles.card}>
			<Card.Section className={styles.imageContainer} component={Link} to={eventLink}>
				<Image withPlaceholder src={event.pictures[0]} height={160} alt={`${event.venue} etkinlik resmi`} />
				<Badge radius='sm' color={datePassed ? "red" : "green"} variant='light' className={styles.badge}>
					{new Date(event.date).toLocaleDateString()}
				</Badge>
			</Card.Section>

			<Stack spacing='xs' justify='space-between' className={styles.stack}>
				<Text
					className={styles.title}
					component={Link}
					to={eventLink}
					variant='gradient'
					gradient={datePassed ? { from: "red", to: "pink", deg: 45 } : { from: "green", to: "teal", deg: 45 }}>
					{event.name}
				</Text>

				<ScrollArea className={styles.description}>
					<Text component='p' size='sm' color='gray'>
						{event.description}
					</Text>
				</ScrollArea>

				<Group spacing='xs'>
					{!datePassed && (
						<Button
							component={HashLink}
							to={`${eventLink}#bilet`}
							variant='filled'
							color='green'
							leftIcon={<ImTicket />}
							style={{
								flex: "1"
							}}>
							{event.free ? "Ücretsiz" : "Bilet Al"}
						</Button>
					)}
					<Button component={HashLink} to={`${eventLink}`} variant='outline' color='dark' fullWidth={datePassed}>
						Detaylar
					</Button>
				</Group>
			</Stack>
		</Card>
	);
}

export default EventCard;
