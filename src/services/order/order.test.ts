import { orderReducer } from "./reducer";
import {
  CREATE_ORDER_REQUEST,
  CREATE_ORDER_SUCCESS,
  CREATE_ORDER_FAILED,
} from "./constants";

const sampleOrder = {
  name: "order_name",
  order: { number: 12345 },
  success: true,
};
describe("order reducer", () => {
  it("should handle CREATE_ORDER_REQUEST", () => {
    expect(
      orderReducer(
        {
          orderInfo: null,
          orderRequest: false,
          orderFailed: false,
        },
        {
          type: CREATE_ORDER_REQUEST,
        }
      )
    ).toEqual({
      orderInfo: null,
      orderRequest: true,
      orderFailed: false,
    });
  });
  it("should handle CREATE_ORDER_FAILED", () => {
    expect(
      orderReducer(
        {
          orderInfo: null,
          orderRequest: false,
          orderFailed: false,
        },
        {
          type: CREATE_ORDER_FAILED,
        }
      )
    ).toEqual({
      orderInfo: null,
      orderRequest: false,
      orderFailed: true,
    });
  });
  it("should handle CREATE_ORDER_SUCCESS", () => {
    expect(
      orderReducer(
        {
          orderInfo: null,
          orderRequest: false,
          orderFailed: false,
        },
        {
          type: CREATE_ORDER_SUCCESS,
          order: sampleOrder,
        }
      )
    ).toEqual({
      orderInfo: sampleOrder,
      orderRequest: false,
      orderFailed: false,
    });
  });
});
