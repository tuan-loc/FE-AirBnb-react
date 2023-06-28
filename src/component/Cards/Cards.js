import React from "react";
import "./Cards.css";
import GradeIcon from "@mui/icons-material/Grade";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { Link } from "react-router-dom";

export const Cards = ({ room }) => {
  const list = [
    {
      rating: "4",
      desc: "Beach and Sunset Views",
      imgSrc: [
        "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/lpibo-ew-1656015868.jpg",
        "https://www.travelandleisure.com/thmb/BJupPeakYV7RY_vQQnmvrKAl7LU=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/soneva-jani-sunset-view-maldives-SONEVA0421-74b37591d80441ce87831a41da518e49.jpg",
        "https://i0.wp.com/theluxuryeditor.com/wp-content/uploads/2019/02/178793622.jpg?resize=1024%2C683",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTqg5siFywtSULLeH0eaN3k6cBQy_HSnJpJGQ&usqp=CAU",
      ],
      price: "20000",
      date: "15-20 May",
      title: "Hotel 1",
    },
    {
      rating: "4",
      desc: "Beach and Sunset Views",
      imgSrc: [
        "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/lpibo-ew-1656015868.jpg",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTqg5siFywtSULLeH0eaN3k6cBQy_HSnJpJGQ&usqp=CAU",
      ],
      price: "30000",
      date: "25-20 May",
      title: "Hotel 3",
    },
    {
      rating: "4",
      desc: "Beach and Sunset Views",
      imgSrc: [
        "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/lpibo-ew-1656015868.jpg",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTqg5siFywtSULLeH0eaN3k6cBQy_HSnJpJGQ&usqp=CAU",
      ],
      price: "45000",
      date: "10-20 Oct",
      title: "Hotel 3",
    },
    {
      rating: "4",
      desc: "Beach and Sunset Views",
      imgSrc: [
        "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/lpibo-ew-1656015868.jpg",
        "https://www.travelandleisure.com/thmb/BJupPeakYV7RY_vQQnmvrKAl7LU=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/soneva-jani-sunset-view-maldives-SONEVA0421-74b37591d80441ce87831a41da518e49.jpg",
        "https://i0.wp.com/theluxuryeditor.com/wp-content/uploads/2019/02/178793622.jpg?resize=1024%2C683",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTqg5siFywtSULLeH0eaN3k6cBQy_HSnJpJGQ&usqp=CAU",
      ],
      price: "20000",
      date: "15-20 May",
      title: "Hotel 1",
    },
    {
      rating: "4",
      desc: "Beach and Sunset Views",
      imgSrc: [
        "https://i0.wp.com/theluxuryeditor.com/wp-content/uploads/2019/02/178793622.jpg?resize=1024%2C683",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTqg5siFywtSULLeH0eaN3k6cBQy_HSnJpJGQ&usqp=CAU",
      ],
      price: "20000",
      date: "15-20 May",
      title: "Hotel 1",
    },
    {
      rating: "4",
      desc: "Beach and Sunset Views",
      imgSrc: [
        "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/lpibo-ew-1656015868.jpg",
        "https://www.travelandleisure.com/thmb/BJupPeakYV7RY_vQQnmvrKAl7LU=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/soneva-jani-sunset-view-maldives-SONEVA0421-74b37591d80441ce87831a41da518e49.jpg",
        "https://i0.wp.com/theluxuryeditor.com/wp-content/uploads/2019/02/178793622.jpg?resize=1024%2C683",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTqg5siFywtSULLeH0eaN3k6cBQy_HSnJpJGQ&usqp=CAU",
      ],
      price: "20000",
      date: "15-20 May",
      title: "Hotel 1",
    },
    {
      rating: "4",
      desc: "Beach and Sunset Views",
      imgSrc: [
        "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/lpibo-ew-1656015868.jpg",
        "https://www.travelandleisure.com/thmb/BJupPeakYV7RY_vQQnmvrKAl7LU=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/soneva-jani-sunset-view-maldives-SONEVA0421-74b37591d80441ce87831a41da518e49.jpg",
        "https://i0.wp.com/theluxuryeditor.com/wp-content/uploads/2019/02/178793622.jpg?resize=1024%2C683",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTqg5siFywtSULLeH0eaN3k6cBQy_HSnJpJGQ&usqp=CAU",
      ],
      price: "20000",
      date: "15-20 May",
      title: "Hotel 1",
    },
    {
      rating: "4",
      desc: "Beach and Sunset Views",
      imgSrc: [
        "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/lpibo-ew-1656015868.jpg",
        "https://www.travelandleisure.com/thmb/BJupPeakYV7RY_vQQnmvrKAl7LU=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/soneva-jani-sunset-view-maldives-SONEVA0421-74b37591d80441ce87831a41da518e49.jpg",
        "https://i0.wp.com/theluxuryeditor.com/wp-content/uploads/2019/02/178793622.jpg?resize=1024%2C683",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTqg5siFywtSULLeH0eaN3k6cBQy_HSnJpJGQ&usqp=CAU",
      ],
      price: "20000",
      date: "15-20 May",
      title: "Hotel 1",
    },
    {
      rating: "4",
      desc: "Beach and Sunset Views",
      imgSrc: [
        "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/lpibo-ew-1656015868.jpg",
        "https://www.travelandleisure.com/thmb/BJupPeakYV7RY_vQQnmvrKAl7LU=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/soneva-jani-sunset-view-maldives-SONEVA0421-74b37591d80441ce87831a41da518e49.jpg",
        "https://i0.wp.com/theluxuryeditor.com/wp-content/uploads/2019/02/178793622.jpg?resize=1024%2C683",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTqg5siFywtSULLeH0eaN3k6cBQy_HSnJpJGQ&usqp=CAU",
      ],
      price: "20000",
      date: "15-20 May",
      title: "Hotel 1",
    },
    {
      rating: "4",
      desc: "Beach and Sunset Views",
      imgSrc: [
        "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/lpibo-ew-1656015868.jpg",
        "https://www.travelandleisure.com/thmb/BJupPeakYV7RY_vQQnmvrKAl7LU=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/soneva-jani-sunset-view-maldives-SONEVA0421-74b37591d80441ce87831a41da518e49.jpg",
        "https://i0.wp.com/theluxuryeditor.com/wp-content/uploads/2019/02/178793622.jpg?resize=1024%2C683",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTqg5siFywtSULLeH0eaN3k6cBQy_HSnJpJGQ&usqp=CAU",
      ],
      price: "20000",
      date: "15-20 May",
      title: "Hotel 1",
    },
    {
      rating: "4",
      desc: "Beach and Sunset Views",
      imgSrc: [
        "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/lpibo-ew-1656015868.jpg",
        "https://www.travelandleisure.com/thmb/BJupPeakYV7RY_vQQnmvrKAl7LU=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/soneva-jani-sunset-view-maldives-SONEVA0421-74b37591d80441ce87831a41da518e49.jpg",
        "https://i0.wp.com/theluxuryeditor.com/wp-content/uploads/2019/02/178793622.jpg?resize=1024%2C683",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTqg5siFywtSULLeH0eaN3k6cBQy_HSnJpJGQ&usqp=CAU",
      ],
      price: "20000",
      date: "15-20 May",
      title: "Hotel 1",
    },
    {
      rating: "4",
      desc: "Beach and Sunset Views",
      imgSrc: [
        "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/lpibo-ew-1656015868.jpg",
        "https://www.travelandleisure.com/thmb/BJupPeakYV7RY_vQQnmvrKAl7LU=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/soneva-jani-sunset-view-maldives-SONEVA0421-74b37591d80441ce87831a41da518e49.jpg",
        "https://i0.wp.com/theluxuryeditor.com/wp-content/uploads/2019/02/178793622.jpg?resize=1024%2C683",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTqg5siFywtSULLeH0eaN3k6cBQy_HSnJpJGQ&usqp=CAU",
      ],
      price: "20000",
      date: "15-20 May",
      title: "Hotel 1",
    },
    {
      rating: "4",
      desc: "Beach and Sunset Views",
      imgSrc: [
        "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/lpibo-ew-1656015868.jpg",
        "https://www.travelandleisure.com/thmb/BJupPeakYV7RY_vQQnmvrKAl7LU=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/soneva-jani-sunset-view-maldives-SONEVA0421-74b37591d80441ce87831a41da518e49.jpg",
        "https://i0.wp.com/theluxuryeditor.com/wp-content/uploads/2019/02/178793622.jpg?resize=1024%2C683",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTqg5siFywtSULLeH0eaN3k6cBQy_HSnJpJGQ&usqp=CAU",
      ],
      price: "20000",
      date: "15-20 May",
      title: "Hotel 1",
    },
  ];

  return (
    <div className={"  "}>
      <div key={room.id} className={"card_box"}>
        <Swiper
          modules={[Navigation, Pagination]}
          spaceBetween={50}
          slidesPerView={1}
          mousewheel={true}
          pagination={{ clickable: true }}
          scrollbar={{ draggable: true }}
          style={{ height: "380px", width: "100% " }}
        >
          {list[0].imgSrc.map((item, index) => {
            return (
              <SwiperSlide key={index}>
                <img className={"card_img"} src={room.hinhAnh} alt="" />;
              </SwiperSlide>
            );
          })}
        </Swiper>
        <div className={"card_info_flex"}>
          <Link
            to={`/detail/${room.id}`}
            className={"card_title no-underline text-black font-bold text-base pb-0"}
          >
            {room.tenPhong.length > 30
              ? room.tenPhong.substr(0, 30) + "..."
              : room.tenPhong}
          </Link>
          <div className={"card_rating"}>
            <p>
              <GradeIcon />
            </p>
            <p>4.88</p>
          </div>
        </div>
        <p className="text-sm" style={{ color: "var(--font-grey)", margin: "0 7px" }}>
          Mô tả:
          {room.moTa.length > 50 ? room.moTa.substr(0, 50) + "..." : room.moTa}
        </p>

        <p
          style={{
            color: "var(--black)",
            margin: "0.5rem 7px 5px",
            fontSize: "0.8rem",
          }}
        >
          <strong>${room.giaTien}</strong>/đêm
        </p>
      </div>
    </div>
  );
};
