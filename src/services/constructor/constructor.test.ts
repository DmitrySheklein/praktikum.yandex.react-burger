import { constructorReducer } from "./reducer";
import {
  ADD_BUN,
  ADD_INGREDIENT,
  REMOVE_INGREDIENT,
  RESET_CONSTRUCTOR,
  UPDATE_CONSTRUCTOR,
} from "./constants";

const sampleBun = {
  _id: "0",
  uuid: "qwerty",
  type: "bun",
  price: 1000,
  name: "test_bun",
  image: "url_image",
  image_large: "url_image_large",
  image_mobile: "url_image_mobile",
  proteins: 10,
  fat: 11,
  calories: 12,
  carbohydrates: 13,
};

const sampleIngredient = {
  _id: "1",
  uuid: "qwerty1",
  type: "main",
  price: 300,
  name: "test_name",
  image: "url_image",
  image_large: "url_image_large",
  image_mobile: "url_image_mobile",
  proteins: 10,
  fat: 11,
  calories: 12,
  carbohydrates: 13,
};

/* Add component */
describe("constructor add reducer", () => {
  it("should handle ADD_BUN", () => {
    expect(
      constructorReducer(
        { bun: null, ingredients: [] },
        {
          type: ADD_BUN,
          bun: sampleBun,
        }
      )
    ).toEqual({
      bun: { ...sampleBun, uuid: expect.any(String) },
      ingredients: [],
    });
  });
  it("should handle ADD_INGREDIENT", () => {
    expect(
      constructorReducer(
        { bun: null, ingredients: [] },
        {
          type: ADD_INGREDIENT,
          ingredient: sampleIngredient,
        }
      )
    ).toEqual({
      bun: null,
      ingredients: [
        {
          ...sampleIngredient,
          uuid: expect.any(String),
        },
      ],
    });
  });
});
/* Remove component */
describe("constructor remove reducer", () => {
  it("should handle REMOVE_INGREDIENT", () => {
    expect(
      constructorReducer(
        { bun: null, ingredients: [{ ...sampleIngredient }] },
        {
          type: REMOVE_INGREDIENT,
          ingredient: sampleIngredient,
        }
      )
    ).toEqual({
      bun: null,
      ingredients: [],
    });
  });
});
/* Remove component */
describe("constructor reset reducer", () => {
  it("should handle RESET_CONSTRUCTOR", () => {
    expect(
      constructorReducer(
        { bun: { ...sampleBun }, ingredients: [{ ...sampleIngredient }] },
        {
          type: RESET_CONSTRUCTOR,
        }
      )
    ).toEqual({
      bun: null,
      ingredients: [],
    });
  });
});
/* Remove component */
const oneIngredient = sampleIngredient;
const twoIngredient = sampleIngredient;
describe("constructor update reducer", () => {
  it("should handle UPDATE_CONSTRUCTOR", () => {
    expect(
      constructorReducer(
        { bun: null, ingredients: [oneIngredient, twoIngredient] },
        {
          type: UPDATE_CONSTRUCTOR,
          value: { dragIndex: 1, hoverIndex: 0 },
        }
      )
    ).toEqual({
      bun: null,
      ingredients: [twoIngredient, oneIngredient],
    });
  });
});
