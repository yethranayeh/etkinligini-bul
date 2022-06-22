/** @format */

import type { EventType } from "types/EventType";
import { useState } from "react";
import { Stack, TextInput, Button, Stepper, Group, Card } from "@mantine/core";
import AreaSelection from "./AreaSelection";
import styles from "./TicketForm.module.scss";
import { BsCheck2, MdNavigateNext } from "icons/index";
import Payment from "./Payment";

function TicketForm({ event }: { event: EventType }) {
	const totalSteps = event.free ? 3 : 4;
	const [active, setActive] = useState(0);
	const nextStep = () => setActive((current) => (current < totalSteps ? current + 1 : current));
	const prevStep = () => setActive((current) => (current > 0 ? current - 1 : current));

	return (
		<Card shadow='sm' p='sm' id='bilet'>
			<Stepper active={active} onStepClick={setActive} breakpoint='sm'>
				<Stepper.Step label='Bölge' description='Etkinlik bölgeleri'>
					<AreaSelection event={event} />
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
						}}>
						<Stack
							spacing='xs'
							style={{
								minWidth: 300
							}}>
							<TextInput required label='İsim & Soyisim' placeholder='İsminiz' minLength={3} />
							<TextInput required type='email' label='E-Posta Adresiniz' placeholder='ornek@mail.com' />
							<TextInput required type='tel' label='Telefon Numaranız' placeholder='+90 555 555 55 55' minLength={11} />
						</Stack>
					</form>
				</Stepper.Step>
				{!event.free && (
					<Stepper.Step label='Ödeme' description='Ödeme bilgileri' allowStepSelect={active > 2}>
						<Payment />
					</Stepper.Step>
				)}
				<Stepper.Step label='Onayla' description='Girilen bilgileri kontrol et' allowStepSelect={false}>
					<p>Girilen bilgiler...</p>
				</Stepper.Step>
				<Stepper.Completed>
					<p>Tamamlandı</p>
					<Button leftIcon={<BsCheck2 size={18} />} onClick={() => alert("Biletiniz alındı")}>
						Bilet Al
					</Button>
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
		</Card>
	);
}

export default TicketForm;
