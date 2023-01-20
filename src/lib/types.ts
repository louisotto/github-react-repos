type ResultNode = {
  node: {
    name: string;
    url: string;
    forks: {
      totalCount: number;
      __typename: string;
    };
    stargazers: {
      totalCount: number;
      __typename: string;
    };
  };
};

export type ApolloResponse = {
  search: {
    edges: ResultNode[];
  };
};
