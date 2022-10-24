import React from "react";
import { Page, Toast, Toolbar } from "../../../tmd";
import Carousel, { CarouselItem } from "../../../tmd/components/Carousel/Carousel";
import CarouselFullWidth from "../../../tmd/components/Carousel/CarouselFullWidth";

export default function CarouselScreen() {
  const _mockData: CarouselItem[] = [
    {
      id: 1,
      image_url: "https://picsum.photos/500/310",
    },
    {
      id: 2,
      image_url: "https://images.unsplash.com/photo-1558637845-c8b7ead71a3e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8MTYlM0E5fGVufDB8fDB8fA%3D%3D&w=1000&q=80",
    },
    {
      id: 3,
      image_url: "https://wallpaperaccess.com/full/1406840.jpg",
    },
    {
      id: 4,
      image_url: "https://images.unsplash.com/photo-1518418248320-a4de2fbc87c2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1yZWxhdGVkfDE0fHx8ZW58MHx8fHw%3D&w=1000&q=80",
    },
    {
      id: 5,
      image_url: "https://cdn.wallpapersafari.com/15/4/b7xQKh.jpg",
    },

  ];

  return <Page>
    <Toolbar title={"CarouselScreen"} />
    <CarouselFullWidth data={_mockData} autoPlay loop={true} autoPlayInterval={5000} />
    <Carousel
      data={_mockData}
      onPressItem={(item) => {
        Toast.show("onPressItem: " + item.id);
      }} />
  </Page>;
}
