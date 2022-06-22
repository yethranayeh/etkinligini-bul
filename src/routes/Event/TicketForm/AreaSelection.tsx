/** @format */

import type { EventType } from "types/EventType";
import { useState, useRef, useEffect } from "react";
import {
	Grid,
	Stack,
	NativeSelect,
	NumberInput,
	NumberInputHandlers,
	Group,
	ActionIcon,
	Text,
	Card,
	Badge
} from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import styles from "./AreaSelection.module.scss";

function AreaSelection({ event, dispatch, action }: { event: EventType; dispatch: any; action: any }) {
	const [section, setSection] = useState("");
	const sections = ["A0", "A1", "A2", "A3", "B0", "B1", "B2", "B3", "C0", "C1", "C2", "C3", "D0", "D1", "D2", "D3"];

	const basePrice = 50;
	const multiplier = () => {
		const letter = section.charAt(0);
		switch (letter) {
			case "A":
				return 2.2;
			case "B":
				return 1.6;
			case "C":
				return 1.2;
			case "D":
				return 1;
			default:
				return 1;
		}
	};
	const [ticketAmount, setTicketAmount] = useState(0);
	const handlers = useRef<NumberInputHandlers>();

	const mobile = useMediaQuery("(max-width: 768px)");
	const columnSpan = mobile ? 12 : 6;

	return (
		<Grid>
			<Grid.Col span={columnSpan}>
				<Card withBorder shadow='xs'>
					<Grid>
						<Grid.Col span={12}>
							<div className={[styles.section, styles.stage].join(" ")}>Sahne</div>
						</Grid.Col>
						{sections.map((sectionName) => (
							<Grid.Col
								key={sectionName}
								className={[styles.section, styles.guest, sectionName === section ? styles.selected : ""].join(" ")}
								span={3}
								onClick={() => {
									setSection(sectionName);
									dispatch({
										type: action,
										data: {
											section: sectionName,
											ticketAmount,
											ticketPrice: Math.round(basePrice * ticketAmount * multiplier())
										}
									});
								}}>
								{sectionName}
							</Grid.Col>
						))}
					</Grid>
				</Card>
			</Grid.Col>
			<Grid.Col span={columnSpan}>
				<Stack
					spacing='xs'
					justify='space-between'
					style={{
						height: "100%"
					}}>
					<NativeSelect
						data={sections}
						placeholder='Bölge seç'
						label='Etkinlik alanından bölge seç'
						value={section}
						onChange={(event) => setSection(event.currentTarget.value)}
						required
					/>
					{!event.free && (
						<Stack spacing='xs'>
							<Group>
								<Text color='gray'>Bilet:</Text>
								<Group spacing={5}>
									<ActionIcon size={36} variant='default' onClick={() => handlers.current!.decrement()}>
										–
									</ActionIcon>

									<NumberInput
										hideControls
										value={ticketAmount}
										onChange={(val) => {
											setTicketAmount(val!);
											dispatch({
												type: action,
												data: {
													section,
													ticketAmount: val,
													ticketPrice: Math.round(basePrice * ticketAmount * multiplier())
												}
											});
										}}
										handlersRef={handlers}
										max={4}
										min={0}
										step={1}
										styles={{ input: { width: 54, textAlign: "center" } }}
									/>

									<ActionIcon size={36} variant='default' onClick={() => handlers.current!.increment()}>
										+
									</ActionIcon>
								</Group>
							</Group>
							<Text color='gray'>
								Toplam Ücret:{" "}
								<Badge size='lg' variant='outline' color={ticketAmount ? "blue" : "gray1"} radius='sm'>{`${Math.round(
									basePrice * ticketAmount * multiplier()
								)}₺`}</Badge>
							</Text>
						</Stack>
					)}
				</Stack>
			</Grid.Col>
		</Grid>
	);
}

export default AreaSelection;
