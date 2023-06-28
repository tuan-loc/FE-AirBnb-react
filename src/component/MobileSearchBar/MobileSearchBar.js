import Search from "antd/es/transfer/search";
import clsx from "clsx";
import React from "react";
import styles from "./MobileSearchBar.module.css";

export default function MobileSearchBar() {
  const onSearch = (value) => console.log(value);
  return (
    <div className={clsx(styles.mobile_search_bar, "p-5")}>
      <Search
        placeholder="input search text"
        onSearch={onSearch}
        style={{ width: "full" }}
      />
    </div>
  );
}
