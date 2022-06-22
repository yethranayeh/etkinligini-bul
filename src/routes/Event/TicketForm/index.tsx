/** @format */

import type { EventType } from "types/EventType";
import { useState, useReducer, useRef } from "react";
import { Stack, TextInput, Button, Stepper, Group, Text, Badge, Divider, Title } from "@mantine/core";
import AreaSelection from "./AreaSelection";
import { BsCheck2, MdNavigateNext } from "icons/index";
import Payment from "./Payment";
import { formReducer, TICKET_AND_SECTION_SELECTED, INFO_SUBMITTED, CARD_SUBMITTED } from "./reducer";

function TicketForm({ event }: { event: EventType }) {
	const totalSteps = event.free ? 3 : 4;
	const [active, setActive] = useState(0);
	const nextStep = () => setActive((current) => (current < totalSteps ? current + 1 : current));
	const prevStep = () => setActive((current) => (current > 0 ? current - 1 : current));

	const initialState = {
		section: "",
		ticketAmount: 0,
		ticketPrice: 0,
		name: "",
		email: "",
		phone: "",
		cardName: "",
		cardNumber: 0,
		cardExpiry: "",
		cvv: ""
	};

	const [state, dispatch] = useReducer(formReducer, initialState);

	const formNameRef = useRef<HTMLInputElement>(null);
	const formEmailRef = useRef<HTMLInputElement>(null);
	const formPhoneRef = useRef<HTMLInputElement>(null);

	return (
		<>
			<Stepper active={active} onStepClick={setActive} breakpoint='sm' color='green'>
				<Stepper.Step label='Bölge' description='Etkinlik bölgeleri'>
					<AreaSelection event={event} dispatch={dispatch} action={TICKET_AND_SECTION_SELECTED} />
				</Stepper.Step>
				<Stepper.Step
					label='İletişim Bilgileri'
					description='Biletinde bulunması gereken iletişim bilgileri'
					allowStepSelect={active > 1}>
					<form
						style={{
							display: "flex",
							flexDirection: "column",
							alignItems: "center"
						}}
						onChange={(e) => {
							dispatch({
								type: INFO_SUBMITTED,
								data: {
									name: formNameRef.current!.value,
									email: formEmailRef.current!.value,
									phone: formPhoneRef.current!.value
								}
							});
						}}>
						<Stack
							spacing='xs'
							style={{
								minWidth: 300
							}}>
							<TextInput
								required
								ref={formNameRef}
								id='name'
								label='İsim & Soyisim'
								placeholder='İsminiz'
								minLength={3}
							/>
							<TextInput
								required
								ref={formEmailRef}
								id='email'
								type='email'
								label='E-Posta Adresiniz'
								placeholder='ornek@mail.com'
							/>
							<TextInput
								required
								ref={formPhoneRef}
								id='phone'
								type='tel'
								label='Telefon Numaranız'
								placeholder='+90 555 555 55 55'
								minLength={11}
							/>
						</Stack>
					</form>
				</Stepper.Step>
				{!event.free && (
					<Stepper.Step label='Ödeme' description='Ödeme bilgileri' allowStepSelect={active > 2}>
						<Payment dispatch={dispatch} action={CARD_SUBMITTED} />
					</Stepper.Step>
				)}
				<Stepper.Step label='Onayla' description='Girilen bilgileri kontrol et' allowStepSelect={false}>
					<Stack spacing='lg'>
						<Stack spacing='xs'>
							<Text component='span'>Etkinlik Alanı: {state.section}</Text>
							<Text component='span'>
								Bilet: {state.ticketAmount} adet,{" "}
								<Badge size='lg' radius='sm' variant='outline'>
									{state.ticketPrice}₺
								</Badge>
							</Text>
						</Stack>
						<Divider />
						<Stack spacing='xs'>
							<Text component='span'>İsim: {state.name}</Text>
							<Text component='span'>E-posta: {state.email}</Text>
							<Text component='span'>Telefon: {state.phone}</Text>
						</Stack>
						<Divider />
						<Stack spacing='xs'>
							<Text component='span'>Kart Numarası: {state.cardNumber}</Text>
							<Text component='span'>Kart Adı: {state.cardName}</Text>
							<Text component='span'>Kart Son Kullanma Tarihi: {state.cardExpiry}</Text>
							<Text component='span'>CVV: {state.cvv}</Text>
						</Stack>
					</Stack>
				</Stepper.Step>
				<Stepper.Completed>
					<Stack spacing='sm' align='center'>
						<Title order={3}>Bilgiler Tamamlandı</Title>
						<Button color='green' leftIcon={<BsCheck2 size={18} />} onClick={() => alert("Biletiniz alındı")}>
							Bilet Al
						</Button>
					</Stack>
				</Stepper.Completed>
			</Stepper>
			<Group position='center' mt='lg'>
				<Button variant='default' onClick={prevStep} disabled={active === 0}>
					Geri
				</Button>
				<Button
					leftIcon={<MdNavigateNext size={18} />}
					color='green'
					onClick={nextStep}
					disabled={active === totalSteps}>
					Devam
				</Button>
			</Group>
		</>
	);
}

export default TicketForm;
