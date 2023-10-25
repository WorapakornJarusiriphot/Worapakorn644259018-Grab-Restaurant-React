import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom"
// import axios from "axios"
import api from "../services/api"
// import authHeader from "../services/auth-header";

// const URL = import.meta.env.VITE_BASE_URL;
// const USERNAME = import.meta.env.VITE_BASE_USERNAME;
// const PASSWORD = import.meta.env.VITE_BASE_PASSWORD;
// const config = {
//   auth: {
//     username: USERNAME,
//     password: PASSWORD,
//     headers: authHeader(),
//   },
// };

const Add = () => {

  const [restaurant, setRestaurant] = useState({
    name: "",
    type: "",
    imageURL: ""
  })
  const navigate = useNavigate();
  const [error, setError] = useState(false);

  const handleChange = (e) => {
    setRestaurant((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      await api.post(`/restaurants`, restaurant);
      navigate("/")
    } catch (error) {
      console.error(error);
      setError(true);
    }
  }
  const handleClear = (e) => {
    setRestaurant({
      name: "",
      type: "",
      imageURL: "",
    });
    setError(false);
  };
  return (
    <div className="container">
      <h1>Grab Restaurant</h1>
      <div className="row form">
        <div className="col-6 card justify-content-center">
          <h5 className="card-header">Add new restaurant</h5>
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
                Add
              </Link>{" "}
              <Link to="/" className="btn btn-danger" onClick={handleClear}>
                Cancle
              </Link>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Add;
