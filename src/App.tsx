import React, { useState } from "react";
import { useQuery, gql } from "@apollo/client";
import Header from "./components/Header";
import ResultsTable from "./components/ResultsTable";

const GET_REPOSITORIES = gql`
  query getRepositories {
    search(
      query: "react language:javascript stars:>10000 sort:stars"
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

const Layout = ({ children }) => (
  <>
    <Header title="Top 100 React repositories on Github" />
    <div className="container my-5 px-5 py-5">{children}</div>
  </>
);

function App() {
  const { loading, error, data } = useQuery(GET_REPOSITORIES);
  if (loading) return <Layout>Loading...</Layout>;
  if (error)
    return (
      <Layout>
        {" "}
        <p>Error : {error.message}</p>
      </Layout>
    );
  return (
    <Layout>
      <ResultsTable data={data} />
    </Layout>
  );
}

export default App;
