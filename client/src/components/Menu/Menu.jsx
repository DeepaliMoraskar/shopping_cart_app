import React from "react";
import { useNavigate } from "react-router-dom";

import "./MenuStyle.scss";

export default function Menu(props) {
  const navigate = useNavigate();

  const menuList = props.categoryList.filter((item) => item.enabled == true);

  const handleOnClick = (id, classStyle) => {
    if (classStyle && classStyle.includes('active')) {
      navigate("/products", { state: { id: "", page: "products" } });
    }else {
      navigate("/products", { state: { id: id, page: "products" } });
    }
  };

  return (
    <div className="menu-container">
      <div className="mobile-menu">
        <select
          value={props.productId ? props.productId : ""}
          onChange={(e) => handleOnClick(e.target.value)}
          className="category-dropdown"
        >
          <option value="" disabled>
            ---Select Category---
          </option>
          {menuList &&
            menuList.length &&
            menuList.map((_) => (
              <option value={_.id} key={_.id}>
                {_.name}
              </option>
            ))}
        </select>
      </div>

      <div className="desktop-menu">
        {menuList &&
          menuList.length &&
          menuList.map((item, i) => {
            return (
              <div
                key={item.id}
                className={
                  item.id === props.productId
                    ? "menu-items-style menu-items-style-active "
                    : "menu-items-style"
                }
                onClick={() => handleOnClick(item.id, item.id === props.productId
                  ? "menu-items-style menu-items-style-active "
                  : "menu-items-style")}
              >
                {item.name}
              </div>
            );
          })}
      </div>
    </div>
  );
}
