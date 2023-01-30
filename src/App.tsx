import { useState } from "react";
import { useQuery, gql } from "@apollo/client";
import Header from "./components/Header";
import ResultsTable from "./components/ResultsTable";
import Filter from "./components/Filter/index";

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

const Layout = ({ children }) => (
  <>
    <Header title="Top 100 React repositories on Github" />
    <div className="container my-5 px-5 py-5">{children}</div>
  </>
);

function App() {
  const [search, setSearch] = useState("react");
  const { loading, error, data, refetch } = useQuery(GET_REPOSITORIES, {
    variables: {
      search: `${search} language:javascript stars:>10000 sort:stars`,
    },
  });

  // Clear search filters and return to initial locations state
  function clearSearchFilters() {
    setSearch("react");
  }
  // Error state
  if (error)
    return (
      <Layout>
        {" "}
        <p>Error : {error.message}</p>
      </Layout>
    );

  console.log(data);

  return (
    <Layout>
      <Filter
        search={search}
        setSearch={setSearch}
        refetch={refetch}
        clearSearchFilters={clearSearchFilters}
      />
      {loading ? <p>Loading...</p> : <ResultsTable data={data.search.edges} />}
    </Layout>
  );
}

export default App;
