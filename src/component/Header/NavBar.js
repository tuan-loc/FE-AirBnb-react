import React, { useState } from "react";
import { TbWorld } from "react-icons/tb";
import { FiSearch } from "react-icons/fi";
import styles from "./NavBar.module.css";
import clsx from "clsx";
import logo from "../../assets/logo/long-logo.png";
import ProfileMenu from "./ProfileMenu";
import SimpleBottomNavigation from "./BottomNav";
import MobileSearchBar from "component/MobileSearchBar/MobileSearchBar";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAlllocationAction } from "redux/actions/LocationAction";
import _, { uniqueId } from "lodash";
import { Link } from "react-router-dom";

export default function NavBar() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAlllocationAction());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const allLocation = useSelector(
    (state) => state.LocationReducer.getAllLocation
  );

  const [toggle, setToggle] = useState(false);
  const [locationID, setLocationID] = useState(1);

  let uniqueArray = _.uniqBy(allLocation, "tenViTri");

  return (
    <header>
      <nav className="">
        <a className="cursor-pointer" href="/">
          <img src={logo} className={clsx(styles.navbar_logo)} alt="" />
        </a>
        <div
          className={clsx(styles.search_bar)}
          onClick={() => {
            setToggle(!toggle);
          }}
        >
          <div className={clsx(styles.search_bar_text)}> Địa điểm bất kì</div>
          <div className={clsx(styles.search_bar_text)}> Tuần bất kì</div>
          <div className={clsx(styles.search_bar_text2)}> Thêm Khách</div>
          <div
            className="flex items-center justify-center bg-[#ff385c] text-white"
            style={{ borderRadius: "50%", padding: "0.3rem" }}
          >
            <FiSearch />
          </div>
        </div>
        <div className={clsx(styles.profile_container)}>
          <div
            className={clsx(
              styles.airbnb_your_home,
              "hidden md:flex items-center"
            )}
          >
            Cho thuê chỗ ở qua AirBnB <TbWorld className="world mx-3" />
          </div>
          <div>
            <ProfileMenu />
          </div>
        </div>
        <div
          className={clsx(
            toggle ? styles.location_active : "",
            styles.location,
            "bg-white transition-all duration-300"
          )}
        >
          <form
            className="  hidden md:justify-around  lg:flex items-start justify-center mt-4 gap-1  w-1/3 mx-auto  "
            style={{
              fontSize: "0.8rem",
              padding: " 0.35rem 1rem",
              border: "1px solid var(--grey)",
              borderRadius: " 40px",
              boxShadow:
                "0 1px 2px rgb(0 0 0 / 8%), 0 4px 12px rgb(0 0 0 / 5%)",
            }}
          >
            <div style={{ borderRight: " 0.5px solid  var(--grey)" }}>
              <label className="block sm mb-1" htmlFor="diaDiem">
                <strong> Địa Điểm:</strong>
              </label>
              {allLocation[0]?.id && (
                <select
                  name="diaDiem"
                  id="diaDiem"
                  onChange={(e) => {
                    setLocationID(e.target.value);
                  }}
                  style={{ border: "none" }}
                  defaultValue={1}
                >
                  {uniqueArray.map((item) => {
                    return (
                      <option key={item?.id} value={item?.id}>
                        {item.tenViTri}
                      </option>
                    );
                  })}
                </select>
              )}
            </div>
            <div
              className="hidden xl:block"
              style={{ borderRight: " 0.5px solid var(--grey)" }}
            >
              <label htmlFor="ngayDi" className=" block  mb-1">
                <strong> Ngày Đi:</strong>
              </label>
              <input
                style={{ border: "none" }}
                type="date"
                id="ngayDi"
                name="ngayDi"
                placeholder="Nhập vào ngày đi"
              />
            </div>
            <div
              className="hidden xl:block"
              style={{ borderRight: " 0.5px solid var(--grey)" }}
            >
              <label htmlFor="ngayDen" className="  mb-1 block">
                <strong>Ngày Đến:</strong>
              </label>
              <input
                style={{ border: "none" }}
                type="date"
                id="ngayDen"
                name="ngayDen"
                placeholder="Nhập vào ngày đi"
              />
            </div>

            <div
              className="hidden 2xl:block"
              style={{ borderRight: " 0.5px solid var(--grey)" }}
            >
              <label htmlFor="number" className=" mb-1  block">
                <strong> Số người:</strong>
              </label>
              <input
                type="number"
                style={{ border: "none", width: "100px" }}
                name=""
                id="number"
                min={1}
              />
            </div>

            <Link to={`/locationClient/${locationID}`}>
              <button
                className={clsx(
                  styles.button_find,
                  "mt-1 bg-[#ff385c] text-white"
                )}
                style={{
                  borderRadius: "40px",
                  padding: "0.5rem",
                  border: "1px solid var(--grey)",
                }}
              >
                <FiSearch /> <span className="hidden 2xl:inline">Tìm</span>
              </button>
            </Link>
          </form>
        </div>
      </nav>
      <MobileSearchBar />
      <SimpleBottomNavigation />
    </header>
  );
}
