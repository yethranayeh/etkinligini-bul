/** @format */

import type { AutocompleteItem } from "@mantine/core";
import type { EventType } from "types/EventType";
import styles from "./Search.module.scss";
import { forwardRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Group, Image, Text, MantineColor, SelectItemProps, Autocomplete } from "@mantine/core";
import data from "api/data.json";
import { BiSearchAlt2 } from "icons/index";

interface ItemProps extends SelectItemProps {
	color: MantineColor;
	description: string;
	image: string;
}

const AutoCompleteItem = forwardRef<HTMLDivElement, ItemProps>(
	({ description, value, image, ...others }: ItemProps, ref) => (
		<div ref={ref} {...others}>
			<Group noWrap>
				<Image
					src={image}
					radius={5}
					alt={"etkinlik resmi"}
					fit='contain'
					height={60}
					width={60}
					withPlaceholder
					placeholder={""}
				/>

				<div>
					<Text size='sm'>{value}</Text>
					<Text size='xs' color='dimmed'>
						{description}
					</Text>
				</div>
			</Group>
		</div>
	)
);

AutoCompleteItem.displayName = "AutoCompleteItem";

// For Axios AbortController
let controller: null | AbortController = null;

export function Search() {
	const [value, setValue] = useState("");
	const [results, setResults] = useState<any>([]);

	let navigate = useNavigate();

	async function handleChange(value: string) {
		// If there is no value when trimmed, then it is only white space, so don't search and don't add it to input
		if (!value.trim()) {
			value = value.trim();
		}

		setValue(value);

		if (value) {
			setResults(data);
		} else {
			setResults([]);
		}
	}

	return (
		<Autocomplete
			placeholder='Etkinlik ara'
			limit={4}
			shadow='sm'
			className={styles.searchArea}
			nothingFound={value ? "Aramaya uygun bir sonuç bulunamadı" : null}
			itemComponent={AutoCompleteItem}
			icon={<BiSearchAlt2 />}
			value={value}
			data={results.map((event: EventType) => ({
				value: event.name,
				description: event.description.substring(0, 70) + "...",
				image: event.pictures[0],
				key: event._id,
				color: "teal"
			}))}
			filter={(value, item) =>
				item.value.toLowerCase().includes(value.toLowerCase().trim()) ||
				item.description.toLowerCase().includes(value.toLowerCase().trim())
			}
			onChange={handleChange}
			onItemSubmit={(item: AutocompleteItem) => {
				const eventUrl = `/etkinlik/${item.key}`;
				setValue("");
				navigate(eventUrl);
			}}
			aria-label='Arama alanı'
		/>
	);
}
