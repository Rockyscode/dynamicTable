import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

import useDebounce from "../customHooks/useDebounce";

const SearchBar = ({ searchInput, setSearchInput, filteredData }) => {
  return (
    <div className="search-bar ">
      <div className="form-control cursor-pointer ">
        <label className="label">
          <span className="label-text">Search for any product</span>
        </label>
        <label className="input-group ">
          <span>Products</span>
          <input
            type="text"
            placeholder="Search..."
            className="input input-bordered"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          />
        </label>
      </div>
      {searchInput && filteredData.length > 0 && (
        <ul className="search-results transition-all duration-500 absolute z-10 bg-slate-400 text-black px-8 py-4 rounded bg-opacity-80 w-full backdrop-blur-sm">
          {filteredData.map((item) => (
            <>
              <li key={item.id}>
                <p>
                  <Link to={`/${item.id}`} key={uuidv4()}>
                    {item.title} - {`${item.description.substring(0, 12)}...`}
                  </Link>
                </p>
              </li>
              <hr className="mb-2 text-slate-800 bg-slate-800" />
            </>
          ))}
        </ul>
      )}
    </div>
  );
};

const Search = ({ data }) => {
  // State variables for search input and filtered data
  const [searchInput, setSearchInput] = useState("");
  const [filteredData, setFilteredData] = useState([]);

  const debouncedSearchTerm = useDebounce(searchInput, 500);

  useEffect(
    () => {
      if (debouncedSearchTerm) {
        setFilteredData(filterData(debouncedSearchTerm));
      } else {
        setFilteredData([]);
      }
    },
    [debouncedSearchTerm] // Only call effect if debounced search term changes
  );

  const filterData = (input) => {
    if (!input) {
      return [];
    }

    input = input.toLowerCase();

    return data.filter(
      (item) =>
        item.title.toLowerCase().includes(input) ||
        item.description.toLowerCase().includes(input)
    );
  };

  // useEffect(() => {
  //   setFilteredData(filterData(searchInput));
  // }, [searchInput]);

  return (
    <SearchBar
      searchInput={searchInput}
      setSearchInput={setSearchInput}
      filteredData={filteredData}
    />
  );
};

export default Search;
