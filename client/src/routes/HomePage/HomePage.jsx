import React, { useEffect, useState } from "react";
import SimpleSlider from "../../components/Carousel/SimpleSlider";
import { useSelector, useDispatch } from "react-redux";
import { fetchCategories } from "../../redux/Category/categoryActions";
import { fetchBanners } from "../../redux/Banner/bannerActions";

import "./HomePageStyle.scss";
import CategorySection from "../../components/Category/CategorySection";

export default function HomePage() {
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.categories.data);
  const enabledCategories =
    categories &&
    categories.length &&
    categories.filter((item) => item.enabled == true);
  const loading = useSelector((state) => state.categories.loading);
  const error = useSelector((state) => state.categories.error);
  const banners = useSelector((state) => state.banners.data);

  useEffect(() => {
    dispatch(fetchBanners());
    dispatch(fetchCategories());
  }, []);

  return (
    <div className="home-page-container">
      <div className="home-carousal-container">
        <SimpleSlider SliderListData={banners} />
      </div>
      <div className="home-category-container">
        <CategorySection categoryList={enabledCategories} />
      </div>
    </div>
  );
}
