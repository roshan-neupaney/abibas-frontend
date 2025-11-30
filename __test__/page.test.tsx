import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import MainPage from "@/app/(main)/page";
import React from "react";

jest.mock("next/headers", () => ({
  cookies: () => ({
    get: jest.fn().mockReturnValue({ value: "test-token" }),
  }),
}));

// jest.mock("@/utilities/apiCalls", () => {
//   const actual = jest.requireActual("@/utilities/apiCalls");
//   return {
//     ...actual,
//     ServerSideGet: jest.fn().mockResolvedValue({ data: [], status: true }),
//     ServerSideGetWithParam: jest
//       .fn()
//       .mockResolvedValue({ data: [], status: true }),
//   };
// });

jest.mock('@/utilities/apiCalls', () => ({
    __esModule: true,
    ServerSideGet: jest.fn().mockResolvedValue({ data: [] }),
    ServerSideGetWithParams: jest.fn().mockResolvedValue({ data: [] }),
    // authorization: jest.fn(),
  }));

jest.mock("../hoc/auth", () => ({
  authorization: jest.fn().mockResolvedValue(true),
}));

describe("MainPage", () => {
  it("Should render the MainPage", async () => {
    await React.act(async () => {
      render(await MainPage());
    });
    expect(screen.getByText("up to 50% off")).toBeInTheDocument();

  });
});
