import React from "react";
import { describe, expect, test } from "vitest";
import { render, screen } from "@testing-library/react";

import ResultsTable from "./";

const testData = {
  search: {
    __typename: "SearchResultItemConnection",
    edges: [
      {
        __typename: "SearchResultItemEdge",
        node: {
          __typename: "Repository",
          name: "react",
          url: "https://github.com/facebook/react",
          forks: {
            __typename: "RepositoryConnection",
            totalCount: 40227,
          },
          stargazers: {
            __typename: "StargazerConnection",
            totalCount: 200805,
          },
        },
      },
      {
        __typename: "SearchResultItemEdge",
        node: {
          __typename: "Repository",
          name: "react-native",
          url: "https://github.com/facebook/react-native",
          forks: {
            __typename: "RepositoryConnection",
            totalCount: 21796,
          },
          stargazers: {
            __typename: "StargazerConnection",
            totalCount: 107149,
          },
        },
      },
      {
        __typename: "SearchResultItemEdge",
        node: {
          __typename: "Repository",
          name: "next.js",
          url: "https://github.com/vercel/next.js",
          forks: {
            __typename: "RepositoryConnection",
            totalCount: 21498,
          },
          stargazers: {
            __typename: "StargazerConnection",
            totalCount: 99447,
          },
        },
      },
      {
        __typename: "SearchResultItemEdge",
        node: {
          __typename: "Repository",
          name: "create-react-app",
          url: "https://github.com/facebook/create-react-app",
          forks: {
            __typename: "RepositoryConnection",
            totalCount: 24720,
          },
          stargazers: {
            __typename: "StargazerConnection",
            totalCount: 98600,
          },
        },
      },
      {
        __typename: "SearchResultItemEdge",
        node: {
          __typename: "Repository",
          name: "material-ui",
          url: "https://github.com/mui/material-ui",
          forks: {
            __typename: "RepositoryConnection",
            totalCount: 28470,
          },
          stargazers: {
            __typename: "StargazerConnection",
            totalCount: 84062,
          },
        },
      },
    ],
  },
};

describe("ResultsTable tests", () => {
  test("The ResultsTable should render", () => {
    render(<ResultsTable data={testData} />);

    expect(screen.getByText(/🌟 Stars/i)).toBeDefined();
  });

  test("The correct data should render", () => {
    render(<ResultsTable data={testData} />);

    expect(screen.getByText("create-react-app")).toBeDefined();
  });
});
