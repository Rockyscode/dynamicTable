const [data, setData] = useState([]);
const [currentPage, setCurrentPage] = useState(1);
const [itemsPerPage, setItemsPerPage] = useState(5);


useEffect(() => {
    const savedData = localStorage.getItem("savedData");
    if (savedData) {
      const parsedData = JSON.parse(savedData);
      setData(parsedData);
    } else {
      const newData = generateData(10);
      setData(newData);
      localStorage.setItem("savedData", JSON.stringify(newData));
    }
  }, []);

  
  const startIndex = (currentPage - 1) * itemsPerPage;
const endIndex = startIndex + itemsPerPage;

const currentItems = data.slice(startIndex, endIndex);

<table className="table table-zebra rounded-lg ">
  {/* HEAD */}
  <thead className="bg-slate-300 text-black text-lg text-center uppercase">
    <tr>
      <th>Select</th>
      <th>Image</th>
      <th onClick={() => handleSort("title")} className="cursor-pointer">
        Title
      </th>
      <th onCanPlay={() => handleSort("price")} className="cursor-pointer">
        Price
      </th>
      <th>Description</th>
      <th>Category</th>

      <th>Discount</th>
      <th onClick={() => handleSort("rating")} className="cursor-pointer">
        Rating
      </th>
    </tr>
  </thead>
  {/* Body */}
  <tbody className="font-md">
    {/* Map over the currentItems array and render each row */}
    {currentItems.map((data, index) => (
      <tr key={index}>
        {/* Render each cell with the product data */}
        <td>
          <input
            type="checkbox"
            className="checkbox checkbox-md bg-slate-300 text-black"
          />
        </td>
        <td>
          <img src={data.image} alt={data.title} />
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
</table>;


<button onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1}>
  Previous
</button>
<button onClick={() => setCurrentPage(currentPage + 1)} disabled={currentPage === Math.ceil(data.length / itemsPerPage)}>
  Next
</button>;


const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };
  
  const handleNext = () => {
    if (currentPage < Math.ceil(data.length / itemsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };
  