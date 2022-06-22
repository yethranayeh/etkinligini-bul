/** @format */

import type { EventType } from "types/EventType";
import { createContext } from "react";

export const EventDataContext = createContext<EventType[]>([]);
