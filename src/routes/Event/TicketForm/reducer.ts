/** @format */

export const TICKET_AND_SECTION_SELECTED = "TICKET_AND_SECTION_SELECTED";
export const INFO_SUBMITTED = "INFO_SUBMITTED";
export const CARD_SUBMITTED = "CARD_SUBMITTED";

// Define types for React reducer

export const formReducer = (state: any, action: any) => {
	const { type, data } = action;
	switch (type) {
		case TICKET_AND_SECTION_SELECTED:
			return {
				...state,
				section: data.section,
				ticketAmount: data.ticketAmount,
				ticketPrice: data.ticketPrice
			};
		case INFO_SUBMITTED:
			return {
				...state,
				name: data.name,
				email: data.email,
				phone: data.phone
			};
		case CARD_SUBMITTED:
			return {
				...state,
				cardName: data.cardName,
				cardNumber: data.cardNumber,
				cardExpiry: data.cardExpiry,
				cvv: data.cvv
			};
		default:
			return state;
	}
};
