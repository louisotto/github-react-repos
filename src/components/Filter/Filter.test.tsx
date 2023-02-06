import { describe, expect, test } from "vitest";
import { render, screen } from "@testing-library/react";

import Filter from "./";

const demoFunction = () => null;

describe("Filter tests", () => {
  test("The Filter should render", () => {
    render(
      <Filter
        search=""
        setSearch={demoFunction}
        clearSearchFilters={demoFunction}
        refetch={demoFunction}
      />
    );

    expect(screen.getByText(/Filter/i)).toBeDefined();
  });

  test("The clear button should render", () => {
    render(
      <Filter
        search=""
        setSearch={demoFunction}
        clearSearchFilters={demoFunction}
        refetch={demoFunction}
      />
    );

    expect(screen.getByText(/Clear/i)).toBeDefined();
  });
});
