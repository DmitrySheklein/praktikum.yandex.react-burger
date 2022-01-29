import { TMessages, wsReducer } from "./reducer";
import {
  WS_CONNECTION_START,
  WS_CONNECTION_SUCCESS,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_CLOSED,
  WS_GET_MESSAGE,
} from "./constants";

const sampleOrder = {
  success: true,
  orders: [
    {
      ingredients: ["1", "2", "3"],
      _id: "1",
      status: "done",
      number: 1000,
      createdAt: "2021-01-01 01:22:10",
      updatedAt: "2021-01-01 11:22:10",
      name: "order-name",
    },
  ],
  total: 100,
  totalToday: 10,
};

describe("ws reducer", () => {
  it("should handle WS_CONNECTION_START", () => {
    expect(
      wsReducer(
        {
          wsConnected: false,
          wsError: false,
          messages: null,
          wsStart: false,
        },
        {
          type: WS_CONNECTION_START,
        }
      )
    ).toEqual({
      wsConnected: false,
      wsError: false,
      messages: null,
      wsStart: true,
    });
  });
  it("should handle WS_CONNECTION_SUCCESS", () => {
    expect(
      wsReducer(
        {
          wsConnected: false,
          wsError: false,
          messages: null,
          wsStart: false,
        },
        {
          type: WS_CONNECTION_SUCCESS,
        }
      )
    ).toEqual({
      wsConnected: true,
      wsError: false,
      messages: null,
      wsStart: false,
    });
  });
  it("should handle WS_CONNECTION_ERROR", () => {
    expect(
      wsReducer(
        {
          wsConnected: false,
          wsError: false,
          messages: null,
          wsStart: false,
        },
        {
          type: WS_CONNECTION_ERROR,
          wsError: undefined,
        }
      )
    ).toEqual({
      wsConnected: false,
      wsError: undefined,
      messages: null,
      wsStart: false,
    });
  });
  it("should handle WS_CONNECTION_CLOSED", () => {
    expect(
      wsReducer(
        {
          wsConnected: false,
          wsError: false,
          messages: null,
          wsStart: false,
        },
        {
          type: WS_CONNECTION_CLOSED,
        }
      )
    ).toEqual({
      wsConnected: false,
      wsError: false,
      messages: null,
      wsStart: false,
    });
  });
  it("should handle WS_GET_MESSAGE", () => {
    expect(
      wsReducer(
        {
          wsConnected: false,
          wsError: false,
          messages: null,
          wsStart: false,
        },
        {
          type: WS_GET_MESSAGE,
          messages: sampleOrder as TMessages,
        }
      )
    ).toEqual({
      wsConnected: false,
      wsError: false,
      wsStart: false,
      messages: sampleOrder,
    });
  });
});
