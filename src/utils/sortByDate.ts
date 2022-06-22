/** @format */

import { EventType } from "types/EventType";

export default function (arr: EventType[], asc: boolean | undefined) {
	return arr.sort((a, b) => {
		const dateA = new Date(a.date);
		const dateB = new Date(b.date);
		if (asc) {
			return dateA.getTime() - dateB.getTime();
		} else {
			return dateB.getTime() - dateA.getTime();
		}
	});
}
