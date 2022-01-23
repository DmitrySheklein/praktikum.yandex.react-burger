import { TProduct } from "../types/data";

export const getTotalOrderSum = (
  orderIngredients: string[],
  ingredients: TProduct[]
) => {
  return orderIngredients.reduce((acc, current) => {
    const product = ingredients.find((el) => el._id === current);
    if (product) {
      const { price, type } = product;
      acc += type === "bun" ? price * 2 : price;
    }

    return acc;
  }, 0);
};
