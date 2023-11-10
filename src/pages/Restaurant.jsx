import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
// import axios from "axios";
import Card from "../components/Card";
// import authHeader from "../services/auth-header";
import api from "../services/api"
import Loading from "../components/Loading";
import * as loadingData from "../loading/restaurant.json"
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

const Restaurant = () => {
  const [restarants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState();
  useEffect(() => {
    const fetchAllRestaurants = async () => {
      try {
        const res = await api.get(`/restaurants`);
        setRestaurants(res.data);
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    };
    setLoading(true);
    fetchAllRestaurants();
  }, []);

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
          setLoading(true);  // ตั้งค่า loading เป็น true ก่อนทำ API call
          await api.delete(`/restaurants/${id}`);
          await Swal.fire(
            'Deleted!',
            'Your file has been deleted.',
            'success'
          )
          window.location.reload();
        } catch (error) {
          console.error(error);
        } finally {
          setLoading(false);  // ตั้งค่า loading เป็น false เมื่อ API call จบ
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
    <div>
      <h1>Restaurant</h1>
      {/* <Loading animation={{ ...loadingData }} /> */}
      <div className="row">
        {
          !loading ? (
            <div className="restaurants">
              {restarants.map((restaurant) => (
                <Card
                  restaurant={restaurant}
                  handleDelete={handleDelete}
                  key={restaurant.id}
                />
              ))}
            </div>
          ) : (
            // <Loading animation={loadingData}/>
            <Loading animation={{ ...loadingData }} />
          )
        }
      </div>
    </div>
)};


export default Restaurant;
