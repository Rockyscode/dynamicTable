import { useState } from "react";

export const useSort = (initialSortBy, initialSortOrder) => {
  const [sortBy, setSortBy] = useState(initialSortBy);
  const [sortOrder, setSortOrder] = useState(initialSortOrder);

  const handleSort = (property) => {
    if (sortBy === property) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(property);
      setSortOrder("asc");
    }
  };

  return { sortBy, sortOrder, handleSort };
};
