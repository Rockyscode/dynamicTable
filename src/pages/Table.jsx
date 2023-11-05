import React, { useEffect } from "react";
import { useState } from "react";
import generateData from "../FakeData";

import { getComparator } from "../utils/HelperFunctions";
import { useSort } from "../customHooks/useSort";
import Search from "../components/Search";
import SearchBar from "../components/Search";
import { Link, useNavigate } from "react-router-dom";

const Table = () => {
  const [data, setData] = useState([]);
  const { sortBy, sortOrder, handleSort } = useSort("title", "asc");
  const [filteredData, setFilteredData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    console.log("In the useEffect of table");
    const savedData = localStorage.getItem("savedData");
    if (savedData) {
      console.log(savedData);
      const parsedData = JSON.parse(savedData);
      console.log(parsedData);
      setData(parsedData);
    } else {
      const newData = generateData(10);
      setData(newData);
      localStorage.setItem("savedData", JSON.stringify(newData));
    }
    console.log(data.discount);
  }, []);

  const sendDataToSingleProduct = (id) => {
    const singleData = data.find((item) => item.id === id);
    console.log("in table SendData", singleData);
    navigate(`/${id}`, { state: { singleData } });
  };

  const handleSearch = (searchInput) => {
    if (searchInput) {
      const lowerCaseSearchInput = searchInput.toLowerCase();
      const newData = data.filter((item) => {
        return (
          item.title.toLowerCase().includes(lowerCaseSearchInput) ||
          item.description.toLowerCase().includes(searchInput)
        );
      });
      setFilteredData(newData);
    } else {
      setFilteredData(data);
    }
  };

  return (
    <>
      {/* <pre>{JSON.stringify(filteredData)}</pre> */}
      <div className="my-4">
        <SearchBar onSearch={handleSearch} />
      </div>
      <div className="mt-4 transition-all duration-300">
        <h4 className="mb-4 capitalize">total orders: {filteredData.length}</h4>
        {filteredData.length > 0 ? (
          <div className="overflow-x-auto rounded-lg border-2 border-slate-300">
            <table className="table table-zebra rounded-lg ">
              {/* HEAD */}
              <thead className="bg-slate-300 text-black text-lg text-center uppercase">
                <tr>
                  <th>Select</th>
                  <th>Image</th>
                  <th
                    onClick={() => handleSort("title")}
                    className="cursor-pointer"
                  >
                    Title
                  </th>
                  <th
                    onClick={() => handleSort("price")}
                    className="cursor-pointer"
                  >
                    Price
                  </th>
                  <th>Description</th>
                  <th>Category</th>

                  <th
                    onClick={() => handleSort("discount")}
                    className="cursor-pointer"
                  >
                    Discount
                  </th>
                  <th
                    onClick={() => handleSort("rating")}
                    className="cursor-pointer"
                  >
                    Rating
                  </th>
                </tr>
              </thead>
              {/* Body */}
              <tbody className="font-md">
                {/* Map over the products array and render each row */}
                {filteredData
                  .sort(getComparator(sortBy, sortOrder))
                  .map((data, index) => (
                    <tr key={index}>
                      {/* Render each cell with the product data */}
                      <td>
                        <input
                          type="checkbox"
                          className="checkbox checkbox-md bg-slate-300 text-black"
                        />
                      </td>
                      <td className="cursor-pointer">
                        <img
                          src={data.image}
                          alt={data.title}
                          onClick={() => {
                            sendDataToSingleProduct(data.id);
                          }}
                        />
                        {/* <Link
                          to={`/${data.id}`}
                          onClick={() => {
                            sendDataToSingleProduct(data.id);
                          }}
                        >
                          <img src={data.image} alt={data.title} />
                        </Link> */}
                      </td>
                      <td>{data.title}</td>
                      <td>{data.price}</td>
                      <td>{data.description}</td>
                      <td>{data.category}</td>
                      <td>{data.discount}</td>
                      <td>{data.rating}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        ) : (
          <h1 className="text-center text-3xl capitalize">
            Sorry no such product found
          </h1>
        )}
      </div>
    </>
  );
};

export default Table;
