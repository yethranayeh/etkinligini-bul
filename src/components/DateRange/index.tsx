/** @format */

import "dayjs/locale/tr";
import { Title, Text } from "@mantine/core";
import { DateRangePicker } from "@mantine/dates";
import { useMediaQuery } from "@mantine/hooks";
import { BsFillCalendar2WeekFill } from "icons";
import styles from "./DateRange.module.scss";

function DateRange({
	value,
	setValue
}: {
	value: [Date | null, Date | null];
	setValue: (value: [Date | null, Date | null]) => void;
}) {
	const isMobile = useMediaQuery("(max-width: 756px)");

	return (
		<DateRangePicker
			label={
				<Title order={2}>
					<Text inherit color='teal'>
						Tarih
					</Text>
				</Title>
			}
			description='Etkinlik tarih aralığı'
			placeholder='Etkinlik için tarih aralığı seç'
			locale='tr'
			allowLevelChange={false}
			icon={<BsFillCalendar2WeekFill className={styles.icon} />}
			dropdownType={isMobile ? "modal" : "popover"}
			minDate={new Date()}
			value={value}
			onChange={setValue}
		/>
	);
}

export default DateRange;
