import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import "./CategoryStyle.scss";

export default function CategorySection(props) {
  const navigate = useNavigate();

  const redirectToProducts = (id) => {
    navigate("/products", { state: { id: id, page: "home" } });
  };

  return (
    <div className="catergory-container">
      {props.categoryList &&
        props.categoryList.length &&
        props.categoryList.map((item, i) => {
          return (
            <div key={item.id} className="catergory-content">
              <div className="cat-img-style">
                <img src={item.imageUrl} alt="logo" height={200} width={300} />
              </div>
              <div className="cat-desc-style">
                <h1>{item.name}</h1>
                <p className="fontStyle">{item.description}</p>
                <Button
                  variant="contained"
                  className="cat-btn-style"
                  onClick={() => redirectToProducts(item.id)}
                >
                  Explore {item.key}
                </Button>
              </div>
            </div>
          );
        })}
    </div>
  );
}
