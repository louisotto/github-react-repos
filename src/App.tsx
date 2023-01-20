import React, { useState, useEffect } from "react";
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
  const [search, setSearch] = useState("");
  const [visibleResults, setVisibleResults] = useState([]);

  // Set initial visible results from Apollo response
  useEffect(() => {
    if (!loading) {
      setVisibleResults(data.search.edges);
    }
  }, [data]);

  // Update visible results on search input change
  useEffect(() => {
    let filteredResults = data?.search?.edges.filter((repo) =>
      repo.node.name.toLowerCase().includes(search)
    );
    setVisibleResults(filteredResults);
  }, [search]);

  // Clear search filters and return to initial locations state
  function clearSearchFilters() {
    setSearch("");
  }
  // Initial loading state
  if (loading) return <Layout>Loading...</Layout>;

  // Error state
  if (error)
    return (
      <Layout>
        {" "}
        <p>Error : {error.message}</p>
      </Layout>
    );

  return (
    <Layout>
      <div className="mb-5 mr-2">
        <label htmlFor="filter" className="mr-2 inline-block">
          Filter by repository name
        </label>
        <input
          type="text"
          name="filter"
          id="filter"
          className="rounded-md border-2 border-solid border-slate-300 p-1"
          placeholder="e.g React"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button
          onClick={() => clearSearchFilters()}
          className="ml-2 rounded-md border-2 border-solid border-slate-300 bg-slate-300 px-3 py-1"
        >
          Clear
        </button>
      </div>
      <ResultsTable data={visibleResults} />
    </Layout>
  );
}

export default App;
