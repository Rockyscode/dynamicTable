import { de, faker } from "@faker-js/faker";

const generateData = (max) => {
  const products = [];
  const savedData = localStorage.getItem("savedData");
  if (!savedData) {
    for (let i = 0; i < max; i++) {
      // Generate a random product object
      const product = {
        id: faker.string.uuid(),
        title: faker.commerce.productName(),
        price: faker.commerce.price(),
        description: faker.commerce.productDescription(),
        category: faker.commerce.department(),
        image: faker.image.url(),
        discount: `${faker.number.int({ min: 10, max: 50 })}%`,
        rating: faker.number.int({ min: 1, max: 5 }),
      };

      products.push(product);
    }
    localStorage.setItem("savedData", JSON.stringify(products));
    console.log("Saved data:", localStorage.getItem("savedData"));
  }

  return products;
};

export default generateData;
