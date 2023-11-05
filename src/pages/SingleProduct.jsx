// import React from "react";
// import { useLocation } from "react-router-dom";

// const SingleProduct = () => {
//   const location = useLocation();
//   console.log(location);
//   return <h1 className="text-4xl">SingleProduct</h1>;
// };

// export default SingleProduct;

// import { useLocation, useHistory } from "react-router-dom";

// function SingleProduct() {
//   const location = useLocation();
//   const history = useHistory();
//   const { singleData } = location.state || {};
//   if (!location.state) {
//     history.replace(location.pathname, { singleData });
//   }
//   return (
//     <>
//       <div> {singleData.title}</div>
//     </>
//   );
// }

// export default SingleProduct;

import { Link, useLocation } from "react-router-dom";

const SingleProduct = () => {
  const { state } = useLocation();
  const { image, title, price, description, category } = state.singleData;

  return (
    <section>
      <div className="text-md breadcrumbs">
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
        </ul>
      </div>
      <div className="mt-6 grid gap-y-8 md:grid-cols-2 md:gap-x-16">
        {/* image */}
        <img
          src={image}
          alt={title}
          className="w-96 h-96 object-cover rounded-lg md:w-full"
        />
        <div>
          <h2 className="text-xl text-neutral-content font-bold font">{`Category: ${category}`}</h2>
          <h4 className="capitalize text-3xl font-bold">{title}</h4>
          <p className="mt-3 text-xl">{`Price: ${price}`}</p>
          <p className="mt-6 leading-8">{description}</p>
        </div>
      </div>
    </section>
  );
};

export default SingleProduct;
