import React from "react";
import { PieChartOutlined, UserOutlined } from "@ant-design/icons";
import { Layout, Menu, theme } from "antd";
import { useState } from "react";
import {
  Link,
  NavLink,
  Outlet,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getAlllocationAction } from "redux/actions/LocationAction";
const { Content, Footer, Sider } = Layout;
function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}

const items = [
  getItem(<Link to="/admin"> User Management</Link>, "1", <UserOutlined />),

  getItem(
    <Link to="/admin/location">Location Management</Link>,
    "2",
    <PieChartOutlined />
  ),
  getItem(
    <Link to="/admin/rooms"> Room Management</Link>,
    "3",
    <PieChartOutlined />
  ),
  getItem(
    <Link to="/admin/bookrooms"> Book Room Management</Link>,
    "4",
    <PieChartOutlined />
  ),
];

export default function AdminTemplate() {
  const location = useLocation();
  const navigate = useNavigate();

  const dispatch = useDispatch();
  useEffect(() => {
    // if (location.pathname !== "/admin") {
    //   navigate("/admin");
    // }
  }, []);
  const [collapsed, setCollapsed] = useState(false);

  const {
    token: { colorBgContainer },
  } = theme.useToken();
  useEffect(() => {
    dispatch(getAlllocationAction());
  }, []);

  return (
    <Layout
      style={{
        minHeight: "100vh",
      }}
    >
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
      >
        <NavLink to={"/"}>
          {" "}
          <img
            src="https://cyberlearn.vn/wp-content/uploads/2020/03/cyberlearn-min-new-opt2.png"
            alt="haha"
          />
        </NavLink>
        <Menu
          theme="dark"
          defaultSelectedKeys={["1"]}
          mode="inline"
          items={items}
        />
      </Sider>
      <Layout className="site-layout">
        <Content
          style={{
            margin: "0 16px",
          }}
        >
          <div
            style={{
              padding: 24,
              minHeight: 360,
              background: colorBgContainer,
            }}
          >
            <Outlet />
          </div>
        </Content>
        <Footer
          style={{
            textAlign: "center",
          }}
        >
          Ant Design ©2023 Created by Ant UED
        </Footer>
      </Layout>
    </Layout>
  );
}
