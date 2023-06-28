import React, { useState } from "react";
import { Button, Table, Input } from "antd";
import { Link, NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { DeleteOutlined, EditOutlined, EyeOutlined } from "@ant-design/icons";
import { useEffect } from "react";
import {
  deletelocationAction,
  GetPaginationSearchLocationAction,
} from "redux/actions/LocationAction";
import { Fragment } from "react";
const { Search } = Input;
function Location() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(GetPaginationSearchLocationAction(1, 10));
    dispatch({ type: "DELETE_LOCATION" });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const AllLocation = useSelector(
    (state) => state.LocationReducer.getAllLocation
  );
  const location = AllLocation?.data;

  const [current, setCurrent] = useState(1);
  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      width: "10%",
      sorter: (a, b) => a.id - b.id,
      //   sortOrder: "descend",
    },
    {
      title: "Location Name",
      dataIndex: "tenViTri",

      width: "20%",
    },
    {
      title: "Image",
      dataIndex: "hinhAnh",
      render: (text, img) => {
        return (
          <Fragment>
            <img
              src={text}
              alt={text}
              width={60}
              height={60}
              onError={(e) => {
                e.target.onError = null;
                e.target.src = `https://picsum.photos/60/60`;
              }}
            />
          </Fragment>
        );
      },
    },
    {
      title: "City",
      dataIndex: "tinhThanh",
      width: "20%",
    },
    {
      title: "Country",
      dataIndex: "quocGia",
      width: "20%",
    },

    {
      title: "Action",

      fixed: "right",
      width: "30%",
      render: (text, locations) => {
        return (
          <>
            <NavLink
              key="11"
              className=" mr-2  text-2xl"
              to={`/admin/location/getbyid/${locations.id}`}
            >
              <EyeOutlined />
            </NavLink>
            <NavLink
              key="10"
              className=" mr-1 text-2xl"
              to={`/admin/location/update/${locations.id}`}
            >
              <EditOutlined style={{ color: "blue" }} />{" "}
            </NavLink>
            <span style={{ cursor: "pointer" }} key="9" className="text-2xl">
              <DeleteOutlined
                style={{ color: "red" }}
                onClick={async () => {
                  if (
                    window.confirm(
                      "Are you sure you want to delete " +
                        locations.tenViTri +
                        "?"
                    )
                  ) {
                    try {
                      await dispatch(deletelocationAction(locations.id));
                      dispatch(GetPaginationSearchLocationAction(current, 10));
                    } catch (error) {}
                  }
                }}
              />
            </span>
          </>
        );
      },
    },
  ];

  const data = Array.isArray(location) ? location : [location];
  const onChange = (pagination) => {
    dispatch(
      GetPaginationSearchLocationAction(pagination.current, pagination.pageSize)
    );
    setCurrent(pagination.current);
  };

  const onsearch = async (e) => {
    dispatch(GetPaginationSearchLocationAction(current, 10, e.target.value));
    console.log(e.target.value);
  };
  return (
    location && (
      <div>
        <h1 className="text-3xl mb-5">Location Management</h1>
        <Link to="/admin/location/addlocation">
          <Button className="mb-5">Add Location</Button>
        </Link>
        <Search
          placeholder="
      User Search By Name"
          enterButton="Search"
          size="large"
          name="search"
          onChange={onsearch}
        />
        <Table
          columns={columns}
          dataSource={data}
          onChange={onChange}
          rowKey={"id"}
          pagination={{
            total: AllLocation?.totalRow,
          }}
        />
      </div>
    )
  );
}

export default Location;
