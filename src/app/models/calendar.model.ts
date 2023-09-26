export interface Day {
  date: Date;
  events: Event[];
}

export interface Event {
  title: string;
  time: string;
}

export interface Month {
  name: string;
  days: Day[];
}
