/** @format */

import { useState } from "react";
import { Stack, NumberInput, TextInput, Group } from "@mantine/core";
import { RiMastercardFill, RiVisaLine, BsCreditCard2BackFill } from "icons/index";

function CreditCardIcon({ number }: { number: string }) {
	const ICON_SIZE = 28;
	function creditCardIssuer(cardNumber?: string) {
		if (!cardNumber) return null;

		// Card number without spaces
		const number = cardNumber.replace(/\s/g, "");

		const visa = /^4[0-9]{12}(?:[0-9]{3})?$/;
		const masterCard = /^(?:5[1-5][0-9]{2}|222[1-9]|22[3-9][0-9]|2[3-6][0-9]{2}|27[01][0-9]|2720)[0-9]{12}$/;

		if (visa.test(number)) {
			return <RiVisaLine size={ICON_SIZE} />;
		} else if (masterCard.test(number)) {
			return <RiMastercardFill size={ICON_SIZE} />;
		} else {
			return null;
		}
	}

	return creditCardIssuer(number);
}

function Payment() {
	const [cardNumber, setCardNumber] = useState<string>("");
	const now = new Date();

	return (
		<form
			style={{
				display: "flex",
				flexDirection: "column",
				alignItems: "center"
			}}>
			<Stack
				spacing='xs'
				align='stretch'
				style={{
					minWidth: 300
				}}>
				<TextInput required label='İsim' placeholder='Kart üzerindeki isim' />
				<TextInput
					required
					value={cardNumber}
					onChange={(e) => setCardNumber(e.target.value)}
					label='Kart Numarası'
					placeholder='0000 0000 0000 0000'
					maxLength={19}
					minLength={8}
					rightSection={<CreditCardIcon number={cardNumber} />}
				/>
				<Group position='apart'>
					<TextInput
						required
						label='Son Kullanma Tarihi'
						placeholder={`${now.getMonth() < 10 ? `0${now.getMonth()}` : now.getMonth()} / ${String(
							now.getFullYear()
						).substring(2, 4)}`}
					/>
					<NumberInput
						hideControls
						required
						label='CVV (Güvenlik Kodu)'
						placeholder='123'
						maxLength={3}
						rightSection={<BsCreditCard2BackFill />}
					/>
				</Group>
			</Stack>
		</form>
	);
}

export default Payment;
