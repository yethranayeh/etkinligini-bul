/** @format */

import { Alert } from "@mantine/core";
import { RiErrorWarningLine, BsInfoSquare } from "icons/index";

const ICON_SIZE = 24;

export const InfoAlert = ({ text }: { text: string }) => <Alert icon={<BsInfoSquare size={ICON_SIZE} />}>{text}</Alert>;

export const ErrorAlert = ({ text }: { text: string }) => (
	<Alert color='red' variant='filled' icon={<RiErrorWarningLine size={ICON_SIZE} />}>
		{text}
	</Alert>
);
