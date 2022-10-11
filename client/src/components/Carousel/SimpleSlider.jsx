import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./SimpleSliderStyle.scss";

export default function SimpleSlider(props) {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  return (
    <div className="SliderContainer">
      <Slider {...settings}>
        {props.SliderListData.length &&
          props.SliderListData.map((item, i) => {
            var imageSrc = item.bannerImageUrl;
            return (
              <div key={item.id}>
                <img src={imageSrc} alt="logo" />
              </div>
            );
          })}
      </Slider>
    </div>
  );
}
