export interface Day {
  date: Date;
  foods: Food[];
}

export interface Event {
  title: string;
  time: string;
}
export interface Food {
  name: string;
  ingredients: Ingredient[];
  imagePath: string;
  review: number;
}
export interface Ingredient {
  name: string;
  amount: number;
}

export interface Month {
  name: string;
  days: Day[];
}
