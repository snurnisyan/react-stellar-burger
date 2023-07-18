export interface IClassNames {
  [name: string]: string;
}

export interface IIngredient {
  _id: string;
  name: string;
  price: number;
  type: string;
  calories: number;
  carbohydrates: number;
  fat: number;
  proteins: number;
  image: string;
  image_large: string;
  image_mobile: string;
  __v: number;
  uuid?: string;
  index?: number;
}

export interface IUser {
  name: string;
  email: string;
  password: string;
}
export interface IOrder {
  number: number;
}

export type TIngredients = Array<IIngredient>;

export type TIngredientsMap = {
  [name: string]: IIngredient;
}

