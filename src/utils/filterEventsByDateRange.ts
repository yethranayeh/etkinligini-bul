/** @format */

import type { EventType } from "types/EventType";

export default function (events: EventType[], dateRange: [Date, Date]): EventType[] {
	// filter the data to only include events whose dates are included within the range using.
	// If event does not have endDate attribute, startDate should be within the dateRange.
	// If event has endDate attribute, startDate and endDate should be within the dateRange.
	return events.filter((event) => {
		const startDate = new Date(event.startDate);
		const endDate = new Date(event.endDate);
		const startDateInRange = startDate >= dateRange[0] && startDate <= dateRange[1];
		const endDateInRange = endDate >= dateRange[0] && endDate <= dateRange[1];
		const startDateBeforeEndDate = startDate < endDate;
		const startDateBeforeEndDateInRange = startDateBeforeEndDate && (startDateInRange || endDateInRange);
		const startDateAfterEndDate = startDate > endDate;
		const startDateAfterEndDateInRange = startDateAfterEndDate && (startDateInRange || endDateInRange);
		return startDateBeforeEndDateInRange || startDateAfterEndDateInRange;
	});
}
