/** @format */

import type { EventType } from "types/EventType";

// A function that takes a key and an object array, from which it extracts all unique values for that key
export default function (key: string, array: EventType[]): string[] {
	// from Stackoverflow: Nina Scholz
	// https://stackoverflow.com/a/53720368/16806945
	// @ts-ignore
	return Array.from(new Set(array.map(({ [key]: value }) => value)));
}
