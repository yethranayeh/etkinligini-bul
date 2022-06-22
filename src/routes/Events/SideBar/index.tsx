/** @format */
import { useContext, useEffect, useState } from "react";
import { EventDataContext } from "context/EventDataContext";
import { Card, CheckboxGroup, Checkbox, Divider, Stack, Title, Text, ScrollArea, Button } from "@mantine/core";
import DateRange from "components/DateRange";
import getUniqueKeyValues from "utils/getUniqueKeyValues";
import styles from "./SideBar.module.scss";

const FilterTitle = ({ title }: { title: string }) => (
	<Title order={2}>
		<Text inherit variant='gradient' gradient={{ from: "teal", to: "green", deg: 45 }}>
			{title}
		</Text>
	</Title>
);

interface SideBarProps {
	searchParams: URLSearchParams;
	setSearchParams: Function;
	dateRange: [Date | null, Date | null];
	setDateRange: (value: [Date | null, Date | null]) => void;
}

function SideBar({ searchParams, setSearchParams, dateRange, setDateRange }: SideBarProps) {
	const data = useContext(EventDataContext);

	const categories = getUniqueKeyValues("category", data).sort();
	const [categoryValue, setCategoryValue] = useState<string[]>([]);

	const cities = getUniqueKeyValues("city", data).sort();
	const [cityValue, setCityValue] = useState<string[]>([]);

	const venues = getUniqueKeyValues("venue", data).sort();
	const [venueValue, setVenueValue] = useState<string[]>([]);

	let currentSearchParams: any = {};
	useEffect(() => {
		currentSearchParams = {};
		searchParams.forEach((val, key) => {
			const prev = currentSearchParams[key];
			if (prev) {
				currentSearchParams[key] = [...prev, val];
			} else {
				currentSearchParams[key] = [val];
			}
		});
	}, [searchParams]);

	function applyFilter(key: string, value: string[]) {
		const newSearchParams = { ...currentSearchParams, [key]: value };
		return newSearchParams;
	}

	function clearFilter(key: string) {
		const newSearchParams = { ...currentSearchParams };
		delete newSearchParams[key];
		return newSearchParams;
	}

	return (
		<Card withBorder shadow='sm' p='xs' className={styles.container}>
			<Stack spacing='sm'>
				<CheckboxGroup
					defaultValue={[]}
					label={<FilterTitle title='Kategoriler' />}
					value={categoryValue}
					color='green'
					onChange={(value) => {
						setCategoryValue(value);
						setSearchParams(applyFilter("kategori", value));
					}}>
					{categories.map((category) => (
						<Checkbox
							key={category}
							label={`${category[0].toUpperCase()}${category.slice(1)}`}
							value={category}
							wrapperProps={{
								className: styles.checkboxWrapper
							}}
						/>
					))}
				</CheckboxGroup>
				<Button
					compact
					color='orange'
					onClick={() => {
						setCategoryValue([]);
						setSearchParams(clearFilter("kategori"));
					}}>
					Temizle
				</Button>
				<Divider />
				<CheckboxGroup
					defaultValue={[]}
					label={<FilterTitle title='Şehirler' />}
					value={cityValue}
					color='green'
					onChange={(value) => {
						setCityValue(value);
						setSearchParams(applyFilter("sehir", value));
					}}>
					{cities.map((city) => (
						<Checkbox
							key={city}
							label={city}
							value={city}
							wrapperProps={{
								className: styles.checkboxWrapper
							}}
						/>
					))}
				</CheckboxGroup>
				<Button
					compact
					color='orange'
					onClick={() => {
						setCityValue([]);
						setSearchParams(clearFilter("sehir"));
					}}>
					Temizle
				</Button>
				<Divider />
				<ScrollArea className={styles.scrollArea}>
					<CheckboxGroup
						defaultValue={[]}
						label={<FilterTitle title='Mekanlar' />}
						value={venueValue}
						color='green'
						onChange={(value) => {
							setVenueValue(value);
							setSearchParams(applyFilter("mekan", value));
						}}>
						{venues.map((venue) => (
							<Checkbox
								key={venue}
								label={venue}
								value={venue}
								wrapperProps={{
									className: styles.checkboxWrapper
								}}
							/>
						))}
					</CheckboxGroup>
				</ScrollArea>
				<Button
					compact
					color='orange'
					onClick={() => {
						setVenueValue([]);
						setSearchParams(clearFilter("mekan"));
					}}>
					Temizle
				</Button>
				<Divider />
				<DateRange value={dateRange} setValue={setDateRange} />
			</Stack>
		</Card>
	);
}

export default SideBar;
