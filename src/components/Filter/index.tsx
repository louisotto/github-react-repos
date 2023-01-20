import React from "react";

type FilterProps = {
  search: string;
  setSearch: Function;
  clearSearchFilters: Function;
};
/**
 * Filter component. Filters visible results in the ResultsTable component.
 * @param {string} search Search needle
 * @param {Function} setSearch setSearch react hook passing input value
 * @param {Function} clearSearchFilters clears 'search' state object
 * @returns
 */
const Filter = ({ search, setSearch, clearSearchFilters }: FilterProps) => {
  return (
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
  );
};

export default Filter;
