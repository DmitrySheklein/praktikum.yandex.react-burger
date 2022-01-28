import { ingredientsReducer } from "./reducer";
import { LOAD_ITEMS, LOAD_ITEMS_SUCCESS, LOAD_ITEMS_FAILED } from "./constants";

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

describe("ingredients load reducer", () => {
  it("should handle LOAD_ITEMS", () => {
    expect(
      ingredientsReducer(
        {
          ingredients: [],
          ingredientsRequest: false,
          ingredientsFailed: false,
        },
        {
          type: LOAD_ITEMS,
        }
      )
    ).toEqual({
      ingredients: [],
      ingredientsRequest: true,
      ingredientsFailed: false,
    });
  });
  it("should handle LOAD_ITEMS_FAILED", () => {
    expect(
      ingredientsReducer(
        {
          ingredients: [],
          ingredientsRequest: false,
          ingredientsFailed: false,
        },
        {
          type: LOAD_ITEMS_FAILED,
        }
      )
    ).toEqual({
      ingredients: [],
      ingredientsRequest: false,
      ingredientsFailed: true,
    });
  });
  it("should handle LOAD_ITEMS_SUCCESS", () => {
    expect(
      ingredientsReducer(
        {
          ingredients: [],
          ingredientsRequest: false,
          ingredientsFailed: false,
        },
        {
          type: LOAD_ITEMS_SUCCESS,
          data: [sampleIngredient, sampleIngredient],
        }
      )
    ).toEqual({
      ingredients: [sampleIngredient, sampleIngredient],
      ingredientsRequest: false,
      ingredientsFailed: false,
    });
  });
});
