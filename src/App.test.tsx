import "@testing-library/jest-dom";
import { describe, expect, test } from "vitest";
import { render, screen } from "@testing-library/react";
import { MockedProvider } from "@apollo/client/testing";

import App from "./App";
import { InMemoryCache, gql } from "@apollo/client";

const cache = new InMemoryCache({});

// Sorry to repeat the code here but for some reason importing it from './App' doesn't work (even though it should)
const GET_REPOSITORIES = gql`
  query getRepositories($search: String!) {
    search(
      # query: $search + " language:javascript stars:>10000 sort:stars"
      query: $search
      type: REPOSITORY
      first: 100
    ) {
      edges {
        node {
          ... on Repository {
            name
            url
            forks {
              totalCount
            }
            stargazers {
              totalCount
            }
          }
        }
      }
    }
  }
`;

const mocks = [
  {
    request: {
      query: GET_REPOSITORIES,
      variables: {
        search: "react language:javascript stars:>10000 sort:stars",
      },
    },
    result: {
      data: {
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
                  totalCount: 40335,
                },
                stargazers: {
                  __typename: "StargazerConnection",
                  totalCount: 201207,
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
                  totalCount: 21843,
                },
                stargazers: {
                  __typename: "StargazerConnection",
                  totalCount: 107343,
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
                  totalCount: 21622,
                },
                stargazers: {
                  __typename: "StargazerConnection",
                  totalCount: 99930,
                },
              },
            },
          ],
        },
      },
    },
  },
];

describe("App tests", () => {
  test("The App should render", async () => {
    render(
      <MockedProvider mocks={mocks} addTypename={false} cache={cache}>
        <App />
      </MockedProvider>
    );

    expect(await screen.getByText(/Loading/i)).toBeDefined();
  });

  test("The App should render the react-native repository", async () => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <App />
      </MockedProvider>
    );

    // expect(await screen.findByText(/Loading/i)).toBeInTheDocument();
    expect(await screen.findByText("next")).toBeInTheDocument();
  });
});
