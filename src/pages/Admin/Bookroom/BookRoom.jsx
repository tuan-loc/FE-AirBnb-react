import React, { Fragment } from "react";
import { Button, Table, Input, Space } from "antd";
import { Link, NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import dayjs from "dayjs";
import _ from "lodash";

import {
  DeleteOutlined,
  EditOutlined,
  EyeOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import {
  deleteRooomAction,
  getAllRoomAction,
} from "redux/actions/BookRoomAction";
import { getAllRentalRoomAction } from "redux/actions/RetalRoomAction";

import { getAlllocationAction } from "redux/actions/LocationAction";
import Highlighter from "react-highlight-words";
import { useRef } from "react";
import { useState } from "react";

function BookRoom() {
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef(null);
  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };
  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText("");
  };
  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
      close,
    }) => (
      <div
        style={{
          padding: 8,
        }}
        onKeyDown={(e) => e.stopPropagation()}
      >
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: "block",
          }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 90,
            }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{
              width: 90,
            }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({
                closeDropdown: false,
              });
              setSearchText(selectedKeys[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? "#1890ff" : undefined,
        }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{
            backgroundColor: "#ffc069",
            padding: 0,
          }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllRoomAction());
    dispatch(getAllRentalRoomAction());
    dispatch(getAlllocationAction());
    dispatch({ type: "DELETE_BOOK_ROOM" });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const BookRoom = useSelector((state) => state.BookRoomReducer.getAllRoom);

  const room = useSelector((state) => state.RoomReducers.getAllRenderRoom);

  const AllLocation = useSelector(
    (state) => state.LocationReducer.getAllLocation
  );

  //   let uniqueArray = _.uniqBy(BookRoom, "maPhong");

  //  const AllLocation = AllLocations?.map(({ hinhAnh, ...rest }) => rest);

  let combinedArrays = BookRoom?.map((room1) => {
    let match = room?.find((item) => room1.maPhong === item.id);
    return { ...match, ...room1 };
  });

  //   let combinedArray = combinedArrays.filter((obj) => obj.maPhong !== 0);

  let combinedArray2 = _.map(combinedArrays, (roomss) => {
    let location = _.find(AllLocation, { id: roomss.maViTri });
    return _.assign({}, location, roomss);
  });

  const columns = [
    {
      title: "Room ID",
      dataIndex: "maPhong",
      width: "5%",
      sorter: (a, b) => {
        return a.maPhong - b.maPhong;
      },
      sortOrder: "ascend",
    },
    {
      title: "Name",
      dataIndex: "tenPhong",
      width: "20%",
      render: (text) => {
        return (
          <Fragment>
            {text?.length > 20 ? text.substr(0, 20) + " ..." : text}
          </Fragment>
        );
      },
      ...getColumnSearchProps("tenPhong"),
    },
    {
      title: "Image",
      dataIndex: "hinhAnh",
      width: "10%",
      render: (text) => {
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
      title: "Location",
      dataIndex: "tenViTri",
      width: "15%",
      ...getColumnSearchProps("tenViTri"),
    },
    {
      title: "Guest Max",
      dataIndex: "soLuongKhach",
      width: "5%",
    },
    {
      title: "Start Date -End Date",
      dataIndex: "ngayDen",
      width: "12%",
      render: (text) => {
        return <Fragment>{dayjs(text).format("DD/MM/YYYY")}</Fragment>;
      },
    },
    {
      title: "End Date",
      dataIndex: "ngayDi",
      width: "12%",
      render: (text) => {
        return <Fragment>{dayjs(text).format("DD/MM/YYYY")}</Fragment>;
      },
    },
    {
      title: "Action",
      fixed: "right",
      width: "30%",
      render: (text, item) => {
        return (
          <>
            <NavLink
              key="11"
              className=" mr-2  text-2xl"
              to={`/admin/bookrooms/getbyid/${item.id}/${item.maNguoiDung}/${item.maViTri}`}
            >
              <EyeOutlined />
            </NavLink>
            <NavLink
              key="10"
              className=" mr-1 text-2xl"
              to={`/admin/bookrooms/update/${item.id}/${item.maNguoiDung}/${item.maViTri}`}
            >
              <EditOutlined style={{ color: "blue" }} />{" "}
            </NavLink>
            <span style={{ cursor: "pointer" }} key="9" className="text-2xl">
              <DeleteOutlined
                style={{ color: "red" }}
                onClick={() => {
                  if (
                    window.confirm(
                      "Are you sure you want to delete" + item.id + "?"
                    )
                  ) {
                    dispatch(deleteRooomAction(item.id));
                    dispatch(getAllRoomAction());
                    dispatch(getAllRentalRoomAction());

                    alert("DELETE Success");
                  }
                }}
              />{" "}
            </span>
          </>
        );
      },
    },
  ];
  const data = combinedArray2 ? combinedArray2 : null;
  const onChange = (pagination, filters, sorter, extra) => {
    console.log("params", pagination, filters, sorter, extra);
  };

  return (
    AllLocation &&
    combinedArray2[0]?.tenViTri && (
      <div>
        <h1 className="text-3xl mb-5">User Management</h1>
        <Link to="/admin/bookrooms/addroom">
          <Button className="mb-5">Add Book Room</Button>
        </Link>

        <Table
          columns={columns}
          dataSource={data}
          onChange={onChange}
          rowKey={"id"}
        />
      </div>
    )
  );
}

export default BookRoom;
