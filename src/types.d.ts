export interface Event {
  name: string;
  description: string;
  date_begin: string;
  date_end: string;
  unix_begin: number;
  unix_end: number;
  duration: string;
}

export interface Channel {
  id: string;
  number: string;
  name: string;
  image: string;
  events: Event[];
}

export interface HoveredEvent {
  name: string;
  timeInfo: string;
  description: string;
}

export interface TimeTitle {
  label: string;
  timestamp: number;
}
