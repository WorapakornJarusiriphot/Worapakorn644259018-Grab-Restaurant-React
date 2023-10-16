import { Link } from "react-router-dom";
import React from "react";
import { useAuthContext } from "../context/AuthContext";

const Card = ({ restaurant, handleDelete }) => {
  const { user } = useAuthContext();
  return (
    <div className="card" style={{ width: "18rem" }} key={restaurant.id}>
      <img src={restaurant.imageURL} alt="" className="card-img-top" />
      <div className="card-body">
        <h5 className="title">{restaurant.name}</h5>
        <p className="card-text">{restaurant.type}</p>
        {user && user.roles.includes("ROLES_ADMIN") && (
          <>
        <Link
          to=""
          className="btn btn-danger px-2 mx-1"
          onClick={() => {
            if (window.confirm(`คุณจะลบร้านค้า ${restaurant.name} จริงๆหรอ`)) {
                handleDelete(restaurant.id);
            }
          }}
        >
          Delete
        </Link>
            <Link
              to={`/update/${restaurant.id}`}
              className="btn btn-warning px-2 mx-1"
            >
              Edit
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Card;
