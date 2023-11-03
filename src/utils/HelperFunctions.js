export const compareByPrice = (a, b) => {
  return a.price - b.price;
};

export const compareByRatings = (a, b) => {
  return a.rating - b.rating;
};

export const compareByTitle = (a, b) => {
  return a.title.localeCompare(b.title);
};

export const compareByDiscount = (a, b) => {
  return a.discount.localeCompare(b.discount);
};

export const getComparator = (sortBy, sortOrder) => {
  switch (sortBy) {
    case "price":
      if (sortOrder === "asc") {
        return compareByPrice;
      } else {
        return (a, b) => compareByPrice(b, a);
      }

    case "rating":
      if (sortOrder === "asc") {
        return compareByRatings;
      } else {
        return (a, b) => compareByRatings(b, a);
      }

    case "title":
      if (sortOrder === "asc") {
        return compareByTitle;
      } else {
        return (a, b) => b.title.localeCompare(a.title);
      }

    default:
      if (sortOrder === "asc") {
        return compareByDiscount;
      } else {
        return (a, b) => b.discount.localeCompare(a.discount);
      }
  }
};
