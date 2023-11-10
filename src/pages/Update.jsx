import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import api from "../services/api"
import Loading from "../components/Loading";
import * as loadingData from "../loading/Update.json"
import Swal from 'sweetalert2'

// import authHeader from "../services/auth-header";
// import axios from "axios";
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

const Update = () => {
  const [restaurant, setRestaurant] = useState({
    name: "",
    type: "",
    imageURL: "",
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [error, setError] = useState(false);
  const { restaurantId } = useParams();
  const handleChange = (e) => {
    setRestaurant((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  useEffect(() => {
    setLoading(true);  // Start loading before the try-catch block
    const fetchAllRestaurant = async () => {
      try {
        const res = await api.get(`/restaurants/${restaurantId}`);
        setRestaurant(res.data);
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
      setLoading(false); // Stop loading after the try-catch block is done
    };
    fetchAllRestaurant();
  }, [restaurantId]);

  const handleClick = async (e) => {
    e.preventDefault();
    setLoading(true);  // Start loading before the try-catch block
    try {
      await api.put(`/restaurants/${restaurantId}`, restaurant);
      navigate("/");
      setLoading(false);
    } catch (error) {
      console.error(error);
      setError(true);
    }
    setLoading(false); // Stop loading after the try-catch block is done
  };

  return (
    <div className="container">
      <h1>Grab Restaurant</h1>

      {
                !loading ? (
      <div className="row form">
        <div className="col-6 card justify-content-center">
          <h5 className="card-header">Update restaurant</h5>
          <div className="error">{error && "Somthing went wrong !!"}</div>
          <div className="card-body">
            <form>
              <div className="form-group">
                <label htmlFor="name">Restaurant name</label>
                <input
                  type="text"
                  className="form-control"
                  name="name"
                  placeholder="Restaurant name"
                  onChange={handleChange}
                  value={restaurant.name}
                />
              </div>
              <div className="form-group">
                <label htmlFor="name">Restaurant type</label>
                <input
                  type="text"
                  className="form-control"
                  name="type"
                  placeholder="Restaurant type"
                  onChange={handleChange}
                  value={restaurant.type}
                />
              </div>
              <div className="form-group">
                <label htmlFor="name">Restaurant image url</label>
                <input
                  type="text"
                  className="form-control"
                  name="imageURL"
                  placeholder="Restaurant image url"
                  onChange={handleChange}
                  value={restaurant.imageURL}
                />
              </div>
              <Link to="" className="btn btn-success" onClick={handleClick}>
                Update
              </Link>{" "}
              <Link to="/" className="btn btn-danger">
                Cancel
              </Link>
            </form>
          </div>
        </div>
      </div>
                      ) : (
                        // <Loading animation={loadingData}/>
                        <Loading animation={{ ...loadingData }} />
                      )
                    }
    </div>
  );
};

export default Update;
