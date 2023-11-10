import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
// import axios from "axios";
import Card from "../components/Card";
// import authHeader from "../services/auth-header";
import api from "../services/api"
import Loading from "../components/Loading";
import * as loadingData from "../loading/Search.json"
import Swal from 'sweetalert2'

// const URL = import.meta.env.VITE_BASE_URL;
// const USERNAME = import.meta.env.VITE_BASE_USERNAME;
// const PASSWORD = import.meta.env.VITE_BASE_PASSWORD;
// const config = {
//   auth: {
//     username: USERNAME,
//     password: PASSWORD,
//   },
//   headers: authHeader(),
// };

const Search = () => {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState();

  const fetchData = async () => {
    setLoading(true);  // Set loading to true before fetching data
    try {
      const res = await api.get(`/restaurants`);
      setData(res.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
    setLoading(false);  // Set loading to false after fetching data
  };

  useEffect(() => {
    fetchData();
  }, []);

  
// const handleDelete = async (id) => {
//   try {
//     await api.delete(`/restaurants/${id}`);
//     fetchData();
//   } catch (error) {
//     console.error("Error deleting restaurant:", error);
//   }
// };


const handleDelete = async (id) => {
  Swal.fire({
    title: 'Are you sure?',
    text: "You won't be able to revert this!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, delete it!'
  }).then( async (result) => {
    if (result.isConfirmed) {
      try {
        await api.delete(`/restaurants/${id}`);
        await Swal.fire(
          'Deleted!',
          'Your file has been deleted.',
          'success'
        )
        window.location.reload();
      } catch (error) {
        console.error(error);
      }
    }
  })
  // try {
  //   await api.delete(`/restaurants/${id}`);
  //   window.location.reload();
  // } catch (error) {
  //   console.error(error);
  // }
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

    {
      !loading ? (
        data.filter((restaurant) =>
          restaurant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          restaurant.type.toLowerCase().includes(searchTerm.toLowerCase())
        )
        .map((filteredRestaurant, index) => (
          <Card key={index} restaurant={filteredRestaurant} handleDelete={handleDelete} />
        ))
      ) : (
        <Loading animation={{ ...loadingData }} />
      )
    }
  </div>
);
}

export default Search;