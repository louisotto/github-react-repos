import React from "react";
import { ResultNode } from "../../lib/types";

type ResultsDataProps = {
  data: ResultNode[];
};
/**
 * Presentational component outputting React Repository information
 * @param {Array} data The returned response from the Apollo query
 */
const ResultsData = ({ data }: ResultsDataProps) => {
  if (!data) return null;
  return (
    <table>
      <thead>
        <tr>
          <th className="border border-slate-300">Name</th>
          <th className="border border-slate-300">🌟 Stars</th>
          <th className="border border-slate-300">Forks</th>
        </tr>
      </thead>
      <tbody>
        {data.map(({ node }, key) => (
          <tr key={key}>
            <td className="border border-slate-300 p-2">
              <a href={node.url} target="_blank" rel="noopener noreferrer">
                {node.name}
              </a>
            </td>
            <td className="border border-slate-300 p-2">
              {node.stargazers.totalCount.toLocaleString()}
            </td>
            <td className="border border-slate-300 p-2">
              {node.forks.totalCount.toLocaleString()}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ResultsData;
