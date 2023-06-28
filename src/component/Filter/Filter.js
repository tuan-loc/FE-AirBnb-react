import { style } from "@mui/system";
import clsx from "clsx";
import React, { useState } from "react";
import styles from "./Filter.module.css";

export default function Filter() {
  const [selectedFilter, setSelectedFilter] = useState(null);

  const iconList = [
    {
      title: "Nhiệt Đới",
      icon: (
        <img
          src="https://a0.muscache.com/pictures/677a041d-7264-4c45-bb72-52bff21eb6e8.jpg"
          width={24}
          height={24}
          alt={"abc"}
        />
      ),
    },
    {
      title: "Lâu Đài",
      icon: (
        <img
          className="i1wps9q8 dir dir-ltr"
          src="https://a0.muscache.com/pictures/1b6a8b70-a3b6-48b5-88e1-2243d9172c06.jpg"
          alt={"abc"}
          width={24}
          height={24}
        />
      ),
    },
    {
      title: "Nông trại",
      icon: (
        <img
          className="i1wps9q8 dir dir-ltr"
          src="https://a0.muscache.com/pictures/aaa02c2d-9f0d-4c41-878a-68c12ec6c6bd.jpg"
          alt={"abc"}
          width={24}
          height={24}
        />
      ),
    },
    {
      title: "Nhà dưới lòng đất",
      icon: (
        <img
          className="i1wps9q8 dir dir-ltr"
          src=" https://a0.muscache.com/pictures/d7445031-62c4-46d0-91c3-4f29f9790f7a.jpg"
          alt={"abc"}
          width={24}
          height={24}
        />
      ),
    },
    {
      title: "Mới",
      icon: (
        <img
          className="i1wps9q8 dir dir-ltr"
          src=" https://a0.muscache.com/pictures/c0fa9598-4e37-40f3-b734-4bd0e2377add.jpg"
          alt={"abc"}
          width={24}
          height={24}
        />
      ),
    },
    {
      title: "Phòng riêng",
      icon: (
        <img
          className="i1wps9q8 dir dir-ltr"
          src="https://a0.muscache.com/pictures/1b6a8b70-a3b6-48b5-88e1-2243d9172c06.jpg"
          alt={"abc"}
          width={24}
          height={24}
        />
      ),
    },
    {
      title: "Khung cảnh tuyệt vời ",
      icon: (
        <img
          className="i1wps9q8 dir dir-ltr"
          src="https://a0.muscache.com/pictures/eb7ba4c0-ea38-4cbb-9db6-bdcc8baad585.jpg"
          alt={"abc"}
          width={24}
          height={24}
        />
      ),
    },
    {
      title: "Nhà nhỏ",
      icon: (
        <img
          className="i1wps9q8 dir dir-ltr"
          src=" https://a0.muscache.com/pictures/35919456-df89-4024-ad50-5fcb7a472df9.jpg"
          alt={"abc"}
          width={24}
          height={24}
        />
      ),
    },
    {
      title: "Thật ấn tượng",
      icon: (
        <img
          className="i1wps9q8 dir dir-ltr"
          src=" https://a0.muscache.com/pictures/c5a4f6fc-c92c-4ae8-87dd-57f1ff1b89a6.jpg"
          alt={"abc"}
          width={24}
          height={24}
        />
      ),
    },
    {
      title: "Nhà mái vòm",
      icon: (
        <img
          className="i1wps9q8 dir dir-ltr"
          src=" https://a0.muscache.com/pictures/89faf9ae-bbbc-4bc4-aecd-cc15bf36cbca.jpg"
          alt={"abc"}
          width={24}
          height={24}
        />
      ),
    },
    {
      title: "Đường trượt tuyết thẳng tới chỗ ở",
      icon: (
        <img
          className="i1wps9q8 dir dir-ltr"
          src="  https://a0.muscache.com/pictures/757deeaa-c78f-488f-992b-d3b1ecc06fc9.jpg"
          alt={"abc"}
          width={24}
          height={24}
        />
      ),
    },
    {
      title: "Cabin",
      icon: (
        <img
          className="i1wps9q8 dir dir-ltr"
          src="https://a0.muscache.com/pictures/732edad8-3ae0-49a8-a451-29a8010dcc0c.jpg"
          alt={"abc"}
          width={24}
          height={24}
        />
      ),
    },
    {
      title: "Vườn nho",
      icon: (
        <img
          className="i1wps9q8 dir dir-ltr"
          src="https://a0.muscache.com/pictures/60ff02ae-d4a2-4d18-a120-0dd274a95925.jpg"
          alt={"abc"}
          width={24}
          height={24}
        />
      ),
    },
    {
      title: "Nhà thuyền",
      icon: (
        <img
          className="i1wps9q8 dir dir-ltr"
          src="https://a0.muscache.com/pictures/c027ff1a-b89c-4331-ae04-f8dee1cdc287.jpg"
          alt={"abc"}
          width={24}
          height={24}
        />
      ),
    },
    {
      title: "Đảo",
      icon: (
        <img
          className="i1wps9q8 dir dir-ltr"
          src="https://a0.muscache.com/pictures/8e507f16-4943-4be9-b707-59bd38d56309.jpg"
          alt={"abc"}
          width={24}
          height={24}
        />
      ),
    },
    {
      title: "Nhà nhỏ",
      icon: (
        <img
          className="i1wps9q8 dir dir-ltr"
          src=" https://a0.muscache.com/pictures/50861fca-582c-4bcc-89d3-857fb7ca6528.jpg"
          alt={"abc"}
          width={24}
          height={24}
        />
      ),
    },
    // {
    //   title: "Không gian sáng tạo",
    //   icon: (
    //     <img
    //       className="i1wps9q8 dir dir-ltr"
    //       src="https://a0.muscache.com/pictures/8a43b8c6-7eb4-421c-b3a9-1bd9fcb26622.jpg"
    //       alt={"abc"}
    //       width={24}
    //       height={24}
    //     />
    //   ),
    // },
    // {
    //   title: "Hồ bơi tuyệt vời",
    //   icon: (
    //     <img
    //       className="i1wps9q8 dir dir-ltr"
    //       src="https://a0.muscache.com/pictures/3fb523a0-b622-4368-8142-b5e03df7549b.jpg"
    //       alt={"abc"}
    //       width={24}
    //       height={24}
    //     />
    //   ),
    // },
  ];

  return (
    <div className={clsx(styles.filter_div)}>
      {iconList.map((item, index) => {
        return (
          <div
            key={index}
            className={clsx(styles.link_box, {
              // Lưu ý chỗ này
              [styles.selected_box]: index === selectedFilter,
            })}
            onClick={() => {
              setSelectedFilter(index);
            }}
          >
            <div className={clsx(styles.link_img)}> {item.icon}</div>
            <p
              className={clsx(styles.link_title, {
                [styles.selected_title]: index === selectedFilter,
              })}
            >
              {item.title}
            </p>
          </div>
        );
      })}
    </div>
  );
}
