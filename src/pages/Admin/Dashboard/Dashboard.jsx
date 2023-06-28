import React from "react";
import { Button, Table, Input } from "antd";
import { Link, NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {
  deleteAdminUserAction,
  getAdminUserByNameUserAction,
  getAllAdminUserAction,
} from "redux/actions/AdminUserAction";

import { DeleteOutlined, EditOutlined, EyeOutlined } from "@ant-design/icons";

const { Search } = Input;

function Dashboard() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllAdminUserAction());
    dispatch({ type: "DELETE" });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const users = useSelector((state) => state.AdminUserReducers.getAllUser);

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      width: "10%",
      sorter: (a, b) => a.id - b.id,
      //   sortOrder: "descend",
    },
    {
      title: "Full Name",
      dataIndex: "name",
      width: "15%",
    },
    {
      title: "Date of birth",
      dataIndex: "birthday",
      width: "15%",
    },
    {
      title: "Email",
      dataIndex: "email",
      width: "20%",
    },
    {
      title: "Type",
      dataIndex: "role",
      width: "10%",
      filters: [
        {
          text: "ADMIN",
          value: "ADMIN",
        },
        {
          text: "USER",
          value: "USER",
        },
      ],
      filterMode: "menu",
      filterMultiple: false,
      onFilter: (value, record) => {
        return record.role.includes(value);
      },
    },
    {
      title: "Action",

      fixed: "right",
      width: "30%",
      render: (text, user) => {
        return (
          <>
            <NavLink
              key="11"
              className=" mr-2  text-2xl"
              to={`/admin/GetUser/${user.id}`}
            >
              <EyeOutlined />
            </NavLink>
            <NavLink
              key="10"
              className=" mr-1 text-2xl"
              to={`/admin/updateUser/${user.id}`}
            >
              <EditOutlined style={{ color: "blue" }} />{" "}
            </NavLink>
            <span style={{ cursor: "pointer" }} key="9" className="text-2xl">
              <DeleteOutlined
                style={{ color: "red" }}
                onClick={() => {
                  if (
                    window.confirm(
                      "Are you sure you want to delete" + user.name + "?"
                    )
                  ) {
                    dispatch(deleteAdminUserAction(user.id));
                    dispatch(getAllAdminUserAction());
                  }
                }}
              />{" "}
            </span>
          </>
        );
      },
    },
  ];
  const data = Array.isArray(users) ? users : [users];
  const onChange = (pagination, filters, sorter, extra) => {
    console.log("params", pagination, filters, sorter, extra);
  };
  const onsearch = async (e) => {
    await dispatch(getAdminUserByNameUserAction(e.target.value));
  };
  return (
    <div>
      <h1 className="text-3xl mb-5">User Management</h1>
      <Link to="/admin/addUser">
        <Button className="mb-5">Add User</Button>
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
      />
    </div>
  );
}

export default Dashboard;
