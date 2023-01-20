import React from "react";
import { describe, expect, test } from "vitest";
import { render, screen } from "@testing-library/react";

import Header from "./";

describe("Header tests", () => {
  test("The header should render", () => {
    render(<Header title="Testing" />);

    expect(screen.getByText(/Testing/i)).toBeDefined();
  });

  test("The correct prop should render", () => {
    render(<Header title="Test Header" />);

    expect(screen.getByText("Test Header")).toBeDefined();
  });
});
