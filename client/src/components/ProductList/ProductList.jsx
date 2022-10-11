import React, { useEffect, useState } from "react";
import "./ProductListStyle.scss";
import Button from "@mui/material/Button";

export default function ProductList(props) {
  return (
    <div className="prod-container">
      {props.productsList &&
        props.productsList.length &&
        props.productsList.map((item, i) => {
          return (
            <div key={item.id} className="item-card-container">
              <div className="card-title">
                <p>{item.name}</p>
              </div>

              <div className="card-img-desc-container">
                <div className="card-img">
                  <img src={item.imageURL} />
                </div>

                <div className="card-desc-container">
                  <div className="card-desc">
                    <p>{item.description}</p>
                  </div>
                  <div className="card-footer">
                    <p>MRP Rs.{item.price}</p>
                    <Button
                      variant="contained"
                      className="prod-btn-style"
                      onClick={() => props.addItemsToCart(item)}
                    >
                      Buy Now
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
    </div>
  );
}
