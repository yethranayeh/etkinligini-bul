/** @format */

import { EventType } from "types/EventType";
import { Card, Image, Text, Badge, Button, Group, Stack } from "@mantine/core";
import { Link } from "react-router-dom";
import styles from "./Card.module.scss";

type EventCardProps = {
	event: EventType;
};

function EventCard({ event }: EventCardProps) {
	const eventLink = `/etkinlik/${event._id}`;
	const datePassed = new Date(event.date) < new Date();
	return (
		<Card component='article' shadow='sm' p='sm'>
			<Card.Section className={styles.imageContainer}>
				<Image withPlaceholder src={event.pictures[0]} height={160} alt={event.name + "resmi"} />
				<Badge color={datePassed ? "red" : "green"} variant='filled' className={styles.badge}>
					{new Date(event.date).toLocaleDateString()}
				</Badge>
			</Card.Section>

			<Stack spacing='xs'>
				<Text
					className={styles.title}
					component={Link}
					to={eventLink}
					variant='gradient'
					gradient={datePassed ? { from: "red", to: "pink", deg: 45 } : { from: "green", to: "teal", deg: 45 }}>
					{event.name}
				</Text>

				<Text component='p' size='sm' className={styles.description}>
					{event.description}
				</Text>

				<Button component={Link} to={eventLink} variant='outline' color='blue' fullWidth>
					Detaylar
				</Button>
			</Stack>
		</Card>
	);
}

export default EventCard;
