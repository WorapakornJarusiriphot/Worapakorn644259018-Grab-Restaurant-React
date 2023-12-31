import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Card from "../components/Card";


const URL = import.meta.env.VITE_BASE_URL;
const USERNAME = import.meta.env.VITE_BASE_USERNAME;
const PASSWORD = import.meta.env.VITE_BASE_PASSWORD;
const config = {
  auth: {
    username: USERNAME,
    password: PASSWORD,
  },
};

const Search = () => {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");


  const fetchData = async () => {
    try {
      const res = await axios.get(`${URL}/restaurants`, config);
      setData(res.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  
const handleDelete = async (id) => {
  try {
    await axios.delete(`${URL}/restaurants/${id}`, config);
    fetchData();
  } catch (error) {
    console.error("Error deleting restaurant:", error);
  }
};


return (
    <div className="search-container">
      <h1>Restaurant</h1>
      <input className="search-input"
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {data
        .filter((restaurant) =>
          restaurant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          restaurant.type.toLowerCase().includes(searchTerm.toLowerCase())
        )

        .map((filteredRestaurant, index) => (
          <Card key={index} restaurant={filteredRestaurant} handleDelete={handleDelete} />
        ))}
    </div>
  );
}

export default Search;